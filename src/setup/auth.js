const { UnauthorizedError } = require('../errors');
const { authenticate } = require('../auth');


module.exports = async function (app) {
  app.use(async (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      return next();
    }
    if (!req.headers.authorization) {
      return next(new UnauthorizedError("Authorization headers missing"))
    }
    try {
      await authenticate(req.headers.authorization);
      return next();
    } catch (e) {
      return next(e);
    }
  });
};