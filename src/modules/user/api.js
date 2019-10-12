const app = require('express').Router();
const { check, validationResult } = require('express-validator');
const { register, update, deactivate } = require('./service');
const { getByUid, getAll, remove } = require('./db/repository');
const { BadRequestError } = require('../../errors');


app.get('/user', async (req, res, next) => {
  res.send(await getAll());
});

app.get('/user/:uid', async (req, res, next) => {
  try {
    res.send(await remove(req.params.uid));
  } catch (e) { next(e) }
});

app.delete('/user/:uid', async (req, res, next) => {
  try {
    await remove(req.params.uid);
    res.send({ status: 'ok' });
  } catch (e) { next(e) }
});

app.post('/user', [
  check('username').isString(),
  check('birthDate').isString(),
  check('email').isEmail()
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new BadRequestError(
      "Invalid request body", errors.array()
    ));
  }
  try {
    res.send(await register(
      req.body.username,
      req.body.birthDate,
      req.body.email
    ));
  } catch (e) { next(e) }
});

app.put('/user/:uid', [
  check('username').isString(),
  check('birthDate').isString(),
  check('email').isString(),
  check('website').isString(),
  check('interests').isArray(),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new BadRequestError(
      "Invalid request body", errors.array()
    ));
  }
  try {
    res.send(await update(
      req.params.uid,
      req.body.username,
      req.body.birthDate,
      req.body.email,
      req.body.website,
      req.body.interests,
      req.body.avatar
    ));
  } catch (e) { next(e) }
});

module.exports = app;