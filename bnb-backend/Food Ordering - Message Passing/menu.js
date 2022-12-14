/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.menu = async (req, res) => {
   const admin = require('firebase-admin');
   admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });
  res.set('Access-Control-Allow-Origin', "*")
  res.set('Access-Control-Allow-Methods', 'GET, POST');
   const db = admin.firestore();
   const menuDb = db.collection('menu');
   const availableItems = [];
   const menuResponse
   = await menuDb.where('quantity', '>', 2).get();
   if (menuResponse.empty) {
   console.log('No matching documents.');
   return;
   }  
   menuResponse.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    availableItems.push(doc.data());
   });
  res.status(200).json({
    "success":true,
    "message" :"menu items retrieved",
    "data" : availableItems
  });
};
