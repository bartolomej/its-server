const admin = require('firebase-admin');

/**
 * @description
 * Initialises firebase admin gateway.
 * In development provide file with firebase admin credentials.
 */
admin.initializeApp({
  credential: admin.credential.cert(
    process.env.NODE_ENV === 'production'
      // in production parse .json object from env variable
      ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
      // in development read .json file
      : require(`../${process.env.GOOGLE_APPLICATION_CREDENTIALS_FILE}`)
  )
});

module.exports.authenticate = function (accessToken) {
  return admin.auth().verifyIdToken(accessToken)
    .then(decodedToken => admin.auth().getUser(decodedToken.uid));
};

module.exports.createUser = async function ({ uid, email, password }) {
  return await admin.auth().createUser({ uid, email, password })
};

module.exports.updateUser = async function ({ uid, email, password }) {
  return await admin.auth().updateUser(uid,{ email, password })
};

module.exports.deleteUser = admin.auth().deleteUser;