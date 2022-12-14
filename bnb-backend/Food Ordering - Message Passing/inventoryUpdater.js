/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.inventory = (req, res) => {
  let message = req.query.message || req.body.message || 'Hello World!';
  const admin = require('firebase-admin');
  if (!admin.apps.length) {
    admin.initializeApp({
    credential: admin.credential.applicationDefault()
    });
  }else {
   admin.app(); // if already initialized, use that one
  }
  const db = admin.firestore();
  const menuDb = db.collection('menu');
  menuDb.get().then(function(result) {
    result.forEach(function(doc) {
        doc.ref.update({
            quantity: 100
        });
    });
  });
  res.status(200).send('Inventory Updated');
};
