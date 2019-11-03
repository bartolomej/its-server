const { emitEvent } = require('../events/index');
const mail = require('../email/service');
const db = require('./db/repository');
const User = require('./User');


async function register (username, birthDate, email) {
  let user = await db.save(User.create(username, birthDate, email));
  // emit registration event
  emitEvent({
    creatorId: user.uid,
    type: 'USER_REGISTERED',
    description: `User ${user.uid} registered to its.`,
  });
  // send registration email with welcome message
  await mail.send(email, 'ITS', 'Dobrodosel!',
    `Pozdravljen ${username},\n\n
      Dobrodoles na izobrazevalni platformi ITSs
      Racunalniskega Drustva Nova Gorica. 
      Platforma je namenjena predvsem mladim tehnicarjem,
      ki imajo zeljo po novem znanju in izkusnjah.\n\n
      >Ekipa ITS`
  );
  return user;
}

async function update (uid, username, birthDate, email, website, interests, avatar) {
  let user = await db.getByUid(uid);
  user.username = username;
  user.birthDate = birthDate;
  user.email = email;
  user.website = website;
  user.interests = interests && interests instanceof Array ? interests.join(',') : interests;
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