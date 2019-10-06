const app = require('express').Router();
const { check, validationResult } = require('express-validator');
const { getByUid, getAll, save } = require('./db/repository');
const { BadRequestError } = require('../../errors');
const Admin = require('./Admin');


app.get('/admin', async (req, res, next) => {
  res.send(await getAll());
});

app.get('/admin/:uid', async (req, res, next) => {
  try {
    res.send(await getByUid(req.params.uid));
  } catch (e) { next(e) }
});

app.post('/admin', [
  check('firstName').isString(),
  check('lastName').isString(),
  check('role').isString(),
  check('email').isEmail(),
  check('phoneNumber').isString(),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new BadRequestError(
      "Invalid request body", errors.array()
    ));
  }
  try {
    res.send(await save(new Admin(
      req.body.firstName,
      req.body.lastName,
      req.body.role,
      req.body.email,
      req.body.phoneNumber
    )));
  } catch (e) { next(e) }
});

app.put('/admin/:uid', [
  check('firstName').isString(),
  check('lastName').isString(),
  check('role').isString(),
  check('email').isEmail(),
  check('phoneNumber').isString(),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new BadRequestError(
      "Invalid request body", errors.array()
    ));
  }
  try {
    let admin = await getByUid(req.params.uid);
    console.log(admin)
    admin.firstName = req.body.firstName;
    admin.lastName = req.body.lastName;
    admin.role = req.body.role;
    admin.email = req.body.email;
    admin.phoneNumber = req.body.phoneNumber;
    console.log(admin)
    let updatedAdmin = await save(admin);
    res.send(updatedAdmin);
  } catch (e) { next(e) }
});

module.exports = app;