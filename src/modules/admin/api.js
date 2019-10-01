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

module.exports = app;