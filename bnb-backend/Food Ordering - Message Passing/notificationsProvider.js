/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
exports.notifications
 = (req, res) => {
  cors(req, res, async () => {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
    const db = admin.firestore();
    const orderDb = db.collection("orders");
    const body = req.body;
    console.log(body);
    console.log(body['user_id']);
    const availableItems = [];
    const snapshot = await orderDb.where("user_id", "==", body['user_id']).get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      availableItems.push(doc.data());
    });
    res.status(200).json({
      success: true,
      message: "notifications retrieved",
      data: availableItems,
    });
  });
};
