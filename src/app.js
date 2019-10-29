async function initializeApp () {
  const app = require('express')();

  await require('./setup/enviroment')();
  await require('./setup/db')();
  await require('./setup/server')(app);
}

initializeApp()
  .then(() => console.log('ITS started 🥳'))
  .catch(e => console.log('ITS encountered an error 🤕', `\n${e}`));
