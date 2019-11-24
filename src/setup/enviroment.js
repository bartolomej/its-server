function validateProductionVars () {
  const requiredVars = [
    'NODE_ENV',
    'PORT',
    'DB_PORT',
    'DB_HOST',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME',
    'EMAIL_USER',
    'EMAIL_PASSWORD'
  ];
  const unsetVars = getUnsetVars(requiredVars);
  if (unsetVars.length > 0) {
    throw new Error(`Unset environment vars: ${JSON.stringify(unsetVars, null, 4)}`);
  }
}

function validateDevelopmentVars () {
  const requiredVars = [
    'ENABLE_AUTH',
  ];
  let unsetVars = getUnsetVars(requiredVars);
  if (unsetVars.length > 0) {
    throw new Error(`Unset development environment vars: ${JSON.stringify(unsetVars, null, 4)}`);
  }
}

function getUnsetVars(requiredVars) {
  let unsetVars = [];
  for (let variable of requiredVars) {
    if (!(!!process.env[variable])) {
      unsetVars.push(variable);
    }
  }
  return unsetVars;
}

module.exports = async function () {
  const path = require('path');
  // load environment variables from .env file
  require('dotenv').config({
    path: path.join(__dirname, '..', '..', '.env')
  });
  // validate environment variables
  validateProductionVars();
  if (process.env.NODE_ENV !== 'production') {
    validateDevelopmentVars();
  }
};