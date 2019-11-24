const admin = require('firebase-admin');
const { AuthorizationError } = require('../../errors');

const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN'
};

/**
 * @description
 * Initialises firebase admin gateway.
 * In development provide file with firebase admin credentials.
 */
function getCert () {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    // parse .json object from env variable if available
    return JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  } else {
    // in development read .json file
    return require(`../../../${process.env.GOOGLE_APPLICATION_CREDENTIALS_FILE}`);
  }
}

admin.initializeApp({ credential: admin.credential.cert(getCert()) });

async function authenticate (accessToken, role) {
  const token = await admin.auth().verifyIdToken(accessToken);
  // validate if user has permissions
  // admin is for now allowed to access every url
  if (token.role === ROLES.USER && token.role !== role) {
    throw new AuthorizationError("Invalid role permissions");
  }
  return await admin.auth().getUser(token.uid);
}

async function createUser ({ uid, email, password }) {
  const created = await admin.auth().createUser({ uid, email, password });
  await admin.auth().setCustomUserClaims(created.uid, { role: ROLES.USER });
  return await getUser(created.uid);
}

async function createAdmin ({ uid, email, password }) {
  const created = await admin.auth().createUser({ uid, email, password });
  await admin.auth().setCustomUserClaims(created.uid, { role: ROLES.ADMIN });
  return await getUser(created.uid);
}

async function updateUser ({ uid, email, password }) {
  return await admin.auth().updateUser(uid, { email, password })
}

async function getUser (uid) {
  const userRecord = await admin.auth().getUser(uid);
  return userRecord.toJSON();
}

async function getUsers () {
  async function listAllUsers (nextPageToken) {
    let users = [];
    // List batch of users, 1000 at a time.
    let usersResult = await admin.auth().listUsers(1000, nextPageToken);
    usersResult.users.forEach(userRecord => {
      console.log('user', userRecord.toJSON());
      users.push(userRecord.toJSON());
    });
    if (usersResult.pageToken) {
      // List next batch of users.
      return [...users, ...await listAllUsers(usersResult.pageToken)];
    } else {
      return users;
    }
  }
  return await listAllUsers();
}

async function deleteUser (uid) {
  return await admin.auth().deleteUser(uid);
}

module.exports = {
  authenticate,
  createUser,
  createAdmin,
  updateUser,
  deleteUser,
  getUsers,
  getUser,
  ROLES
};