/**
 * This is main initialization script for the app.
 * Inits all required startup processes.
 */

async function initializeApp () {
  const app = require('express')();

  await require('./setup/enviroment')();
  await require('./modules/events')();
  await require('./setup/db')();
  await require('./setup/server')(app);
}

// start ITS app
initializeApp()
  .then(() => console.log('ITS started 🥳'))
  .catch(e => console.log(
    'ITS encountered an error 🤕',
    `\n${e.message}`,
    `\n${e.stack}`
  ));