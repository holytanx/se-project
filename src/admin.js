// const functions = require('firebase-functions')
// const admin = require('firebase-admin')

// admin.initializeApp({
//   databaseURL: "https://seproject-eba6c.firebaseio.com"
// });
// exports.addAdminRole = functions.https.onCall((data,context) => {
//     try {
//         const user =  admin.auth().getUserByEmail(data.email);
//          admin.auth().setCustomUserClaims(user.uid, {

//             admin: true
//         });
//         return {
//             message: 'success' + data.email.toString() + ' has been made as admin'
//         };
//     }
//     catch (err) {
//         return err;
//     }
// })