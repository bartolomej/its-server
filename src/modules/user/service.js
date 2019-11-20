const { emitEvent } = require('../events/index');
const mail = require('../email/service');
const db = require('./db/repository');
const User = require('./User');
const auth = require('../../auth');
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

/**
 * @description
 * Creates new user account.
 * @param password
 * @param username
 * @param birthDate
 * @param email
 * @returns {Promise<User>}
 */
async function register (password, username, birthDate, email) {
  let user = User.create(username, birthDate, email);
  try {
    // don't create firebase user yet
    if (process.env.NODE_ENV !== 'production') {
      await auth.createUser({ uid: user.uid, email, password })
    }
  } catch (e) {
    logger.log({
      level: 'error',
      message: `Firebase user creation failed`,
    });
    // log the full error
    console.log(e);
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

/**
 * @description
 * Updates whole user object. Returns updated user.
 * @param uid {string}
 * @param password {string}
 * @param username {string}
 * @param birthDate {Date}
 * @param email {string}
 * @param website {string}
 * @param interests {Array}
 * @param avatar {string}
 * @returns {Promise<User>}
 */
async function update (uid, password, username, birthDate, email, website, interests, avatar) {
  // TODO: update firebase user account
  let user = await db.getByUid(uid);
  user.username = username;
  user.birthDate = birthDate;
  user.email = email;
  user.website = website;
  user.interests = interests;
  user.avatar = avatar;
  let updatedUser = await db.save(user);
  // emit update event
  emitEvent({
    creatorId: user.uid,
    type: 'USER_UPDATED',
    description: `User ${user.uid} updated his/her profile.`,
  });
  updatedUser.interests = updatedUser.interests && updatedUser.interests.split(',');
  return updatedUser;
}

/**
 * @description
 * Reactivates / removes user account.
 * @param uid {string}
 * @returns {Promise<void>}
 */
async function deactivate (uid) {
  let user = await db.getByUid(uid);
  user.status = 'DEACTIVATED';
  user.deactivatedDate = new Date();
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
  register,
  update,
  deactivate
};