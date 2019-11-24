const { emitEvent } = require('../events/index');
const mail = require('../email/service');
const db = require('./db/repository');
const User = require('./User');
const auth = require('../../auth');
const firebase = require('../auth/firebase');
const winston = require('winston');

/**
 * @description
 * Create winston service-level logger.
 * @type {winston.Logger}
 */
const logger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: 'user' },
  transports: [
    new winston.transports.Console
  ]
});


async function register (password, username, birthDate, email) {
  let user;
  try {
    // check if user has previously deactivated his/her account
    const existingUser = await db.getByEmail(email);
    if (existingUser.isDeactivated()) {
      user = existingUser;
      user.username = username;
    }
  } catch (e) {}
  // if user hasn't previously registered account, create new account
  if (!user) {
    user = User.create(username, birthDate, email);
  }
  try {
    // don't create firebase user yet
    const firebaseUser = await firebase.createUser({ uid: user.uid, email, password });
    console.log('Firebase user created!', firebaseUser);
  } catch (e) {
    logger.log({
      level: 'error',
      message: `Firebase user creation failed`,
      description: e.message
    });
    throw e;
  }
  // emit registration event
  emitEvent({
    creatorId: user.uid,
    type: 'USER_REGISTERED',
    description: `User ${user.uid} registered to its.`,
  });
  await db.save(user);
  // send registration email with welcome message
  await mail.send(email, 'ITS', 'Dobrodosel!',
    `Pozdravljen ${username},\n\n
      Dobrodoles na izobrazevalni platformi ITS,
      Racunalniskega Drustva Nova Gorica. 
      Platforma je namenjena predvsem mladim tehnicarjem,
      ki imajo zeljo po novem znanju in izkusnjah.\n\n
      >Ekipa ITS`
  );
  return user;
}

async function registerAdmin (password, username, email) {
  let user;
  try {
    // check if user has previously deactivated his/her account
    const existingUser = await db.getByEmail(email);
    if (existingUser.isDeactivated()) {
      user = existingUser;
      user.username = username;
      user.role = 'ADMIN';
    }
  } catch (e) {}
  // if user hasn't previously registered account, create new account
  if (!user) {
    user = User.createAdmin(username, email);
  }
  try {
    // don't create firebase user yet
    const firebaseAdmin = await firebase.createAdmin({ uid: user.uid, email, password });
    console.log('Firebase admin created!', firebaseAdmin);
  } catch (e) {
    logger.log({
      level: 'error',
      message: `Firebase admin creation failed`,
      description: e.message
    });
    throw e;
  }
  const savedUser = await db.save(user);
  // emit registration event
  emitEvent({
    creatorId: user.uid,
    type: 'ADMIN_REGISTERED',
    description: `Admin ${user.uid} registered to its.`,
  });
  return savedUser;
}

async function update (uid, password, username, birthDate, email, website, interests, avatar) {
  let user = await db.getByUid(uid);
  user.username = username;
  user.birthDate = birthDate;
  user.email = email;
  user.website = website;
  user.interests = interests;
  user.avatar = avatar;
  // update firebase user account
  try {
    await firebase.updateUser({uid, email, password});
  } catch (e) {
    logger.log({
      level: 'error',
      message: `Firebase user creation failed`,
      description: e.message
    });
    throw e;
  }
  // update database
  let updatedUser = await db.save(user);
  // emit update event
  emitEvent({
    creatorId: user.uid,
    type: 'USER_UPDATED',
    description: `User ${user.uid} updated his/her profile.`,
  });
  return updatedUser;
}

async function deactivate (uid) {
  let user = await db.getByUid(uid);
  user.deactivate();
  // delete firebase user
  try {
    await firebase.deleteUser(uid);
  } catch (e) {
    logger.log({
      level: 'error',
      message: `Firebase user deletion failed`,
      description: e.message
    });
    throw e;
  }
  await db.save(user);
  // emit deactivation event
  emitEvent({
    uid,
    type: 'USER_DEACTIVATED',
    description: `User ${uid} deactivated his/her account.`,
  });
  // send deactivation email asking for feedback
  await mail.send(user.email, 'ITS', '',
    `Pozdravljen ${user.username},\n\n
      Zal nam je da odhajas.
      Ce si pripravljen, nam lahko 
      podas povratne informacije o platformi.\n\n
      Ekipa ITS`
  );
}


module.exports = {
  registerAdmin,
  register,
  update,
  deactivate
};