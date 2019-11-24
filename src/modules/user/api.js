const app = require('express').Router();
const { body } = require('express-validator');
const validate = require('../../validator');
const { register, update, deactivate } = require('./service');
const { getByUid, getAll } = require('./db/repository');
const { authAdmin, authUser } = require('../../auth');


// describe fields for HTTP request body
const userValidationRules = () => ([
  body('password').isString(),
  body('username').isString(),
  body('birthDate').isString(),
  body('email').isEmail(),
  body('website').isString().optional(),
  body('interests').isArray().optional()
]);



app.get('/user', authAdmin, async (req, res, next) => {
  res.send(await getAll());
});

app.get('/user/:uid', authUser, async (req, res, next) => {
  res.send(await getByUid(req.params.uid));
});

app.post('/user',
  userValidationRules(),
  validate,
  async (req, res, next) => {
    try {
      res.send(await register(
        req.body.password,
        req.body.username,
        req.body.birthDate,
        req.body.email
      ));
    } catch (e) {
      next(e)
    }
});

app.put('/user/:uid',
  userValidationRules(),
  validate,
  async (req, res, next) => {
    try {
      res.send(await update(
        req.params.uid,
        req.body.password,
        req.body.username,
        req.body.birthDate,
        req.body.email,
        req.body.website,
        req.body.interests,
        req.body.avatar
      ));
    } catch (e) {
      next(e)
    }
});

app.delete('/user/:uid', async (req, res, next) => {
  try {
    await deactivate(req.params.uid);
    res.send({ status: 'ok' });
  } catch (e) {
    next(e)
  }
});

module.exports = app;