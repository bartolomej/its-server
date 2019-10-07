const winston = require('winston');
const mail = require('../email/service');
const db = require('./db/repository');
const User = require('./User');


let logger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [ new winston.transports.Console ]
});


async function register (username, birthDate, email) {
  let user = User.create(username, birthDate, email);
  let savedUser = await db.save(user);
  if (process.env.NODE_ENV === 'test') return savedUser;
  await mail.send(email, 'ITS', 'Dobrodosel!',
    `Pozdravljen ${username},\n\n
      Dobrodoles na izobrazevalni platformi ITSs
      Racunalniskega Drustva Nova Gorica. 
      Platforma je namenjena predvsem mladim tehnicarjem,
      ki imajo zeljo po novem znanju in izkusnjah.\n\n
      >Ekipa ITS`
  );
  return savedUser;
}

async function update (uid, username, birthDate, email, website, interests, avatar) {
  let user = await db.getByUid(uid);
  user.username = username;
  user.birthDate = birthDate;
  user.email = email;
  user.website = website;
  user.interests = interests instanceof Array ?
    interests.join(',') : interests;
  user.avatar = avatar;
  return await db.save(user);
}

async function deactivate (uid) {
  let user = await db.getByUid(uid);
  user.status = 'DEACTIVATED';
  user.deactivatedDate = new Date();
  await mail.send(user.email, 'ITS', '',
    `Pozdravljen ${user.username},\n\n
      Zal nam je da odhajas.
      Ce si pripravljen, nam lahko 
      podas povratne informacije o platformi.\n\n
      Ekipa ITS`
  );
  // TODO: call other modules
}

// TODO: follow feature


module.exports = {
  register: register,
  update,
  deactivate
};