import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as _cors from 'cors';

const cors = _cors({
  origin: true
});

// Initializes Cloud Functions.
admin.initializeApp(functions.config().firebase);

// define db
const db = admin.database();

export const fetchData = functions.https.onRequest((request, response) => {
  cors(request, response, async() => {
    const queryData = Number(JSON.parse(request.body).data);

    const snapshot = await db.ref('/collections')
      .orderByChild('qrId').equalTo(queryData)
      .once('value');
    if (snapshot.val() === null) {
      response.status(400).send({
        success: false,
        message: 'Invalid query'
      });
    }
    const keys = Object.keys(snapshot.val());
    const collectionData = snapshot.val()[keys[0]];

    const uid = collectionData.userId;
    const userSnapshot = await db.ref('/users').orderByKey().equalTo(uid).once('value');
    let user = {}
    if (userSnapshot.val()) {
      user = userSnapshot.val()[uid];
    }

    let images = [];
    if (collectionData.imageUrls) {
      images = Object.keys(collectionData.imageUrls).map(key => {
        const item = {};
        item[key] = collectionData.imageUrls[key];
        return item;
      });
    }
    console.log('fetch data', keys[0], uid);

    if (collectionData.isCompleted) {
      response.status(200).send({
        key: keys[0],
        verified: true,
        user,
        data: {
          ...collectionData,
          imageUrls: images
        }
      });
    } else {
      response.status(200).send({
        key: keys[0],
        verified: false,
        user,
        data: null
      });
    }
  });
});

export const submitPhoneNumber = functions.https.onRequest(async(request, response) => {
  cors(request, response, async() => {
    const inputData = JSON.parse(request.body);
    const phone = inputData.data;
    const fbKey = inputData.key;
    const snapshot = await db.ref(`/collections/${fbKey}/phoneNumbers`).once('value');

    const phoneNumbers = {};
    let len = 0;
    if (snapshot.val()) {
      len = Object.keys(snapshot.val()).length;
      Object.keys(snapshot.val()).forEach((key, index) => {
        const item = {};
        item[`number${index+1}`] = snapshot.val()[key];
        Object.assign(phoneNumbers, item);
      });
    }
    const newPhone = {};
    newPhone[`number${len + 1}`] = phone;
    Object.assign(phoneNumbers, newPhone);

    console.log('submit: ', phoneNumbers)

    const ref = db.ref(`/collections/${fbKey}/phoneNumbers`);
    ref.set(phoneNumbers).then(() => {
      response.status(200).send({
        success: true,
        numbers: phoneNumbers
      });
    }).catch((err) => {
      response.status(400).send({
        success: false,
        numbers: phoneNumbers,
        error: err
      });  
    });
  });
});
