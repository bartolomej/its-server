function validateEnvironmentVars () {
  const usedVars = [
    'NODE_ENV',
    'PORT',
    'DB_PORT',
    'DB_HOST',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME'
  ];
  let unsetVars = [];
  for (let variable of usedVars) {
    if (!(!!process.env[variable])) {
      unsetVars.push(variable);
    }
  }
  if (unsetVars.length > 0) {
    throw new Error(`Unset environment vars: ${JSON.stringify(unsetVars, null, 4)}`);
  }
}

module.exports = async function () {
  const path = require('path');
  // load environment variables from .env file
  require('dotenv').config({
    path: path.join(__dirname, '..', '..', '.env')
  });
  // validate environment variables in development
  if (process.env.NODE_ENV !== 'production') {
    validateEnvironmentVars();
  }
};