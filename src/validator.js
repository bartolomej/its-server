const { BadRequestError } = require("./errors");
const { validationResult } = require('express-validator');

// validates req objects with injected validation object
module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return next(new BadRequestError(
    "Invalid request body", errors.array()
  ));
};