const winston = require('winston');
const mail = require('../email/service');
const db = require('./repository');
const User = require('./User');


let logger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [ new winston.transports.Console ]
});

module.exports.register = async function (username, birthDate, email) {
  let user = User.create(username, birthDate, email);
  let savedUser = await db.save(user);
  if (process.env.NODE_ENV === 'test') return savedUser;
  await mail.send(email, 'ITS', 'Dobrodosel!',
    `Pozdravljen ${username}, <br>
      <br>
      <br>
      Dobrodoles na izobrazevalni platformi ITSs
      Racunalniskega Drustva Nova Gorica. 
      Platforma je namenjena predvsem mladim tehnicarjem,
      ki imajo zeljo po novem znanju in izkusnjah.
      <br>
      <br>Ekipa ITS`
  );
  return savedUser;
}