const { authenticate, ROLES } = require("./modules/admin/firebase");
const { AuthorizationError } = require("./errors");


async function authUser (req, res, next) {
  if (process.env.ENABLE_AUTH === 'false') return next();
  if (!req.headers.authorization) {
    return next(new AuthorizationError("Authorization headers missing"))
  }
  try {
    const user = await authenticate(req.headers.authorization, ROLES.USER);
    console.log('User authenticated!');
    console.log(user);
  } catch (e) {
    return next(e);
  }
  next();
}

async function authAdmin (req, res, next) {
  if (process.env.ENABLE_AUTH === 'false') return next();
  if (!req.headers.authorization) {
    return next(new AuthorizationError("Authorization headers missing"))
  }
  try {
    const admin = await authenticate(req.headers.authorization, ROLES.ADMIN);
    console.log('Admin authenticated!');
    console.log(admin);
  } catch (e) {
    return next(e);
  }
  next();
}

module.exports = {
  authAdmin,
  authUser
};