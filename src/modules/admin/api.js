const app = require('express').Router();
const { getUser, getUsers } = require('./firebase');
const { authAdmin } = require('../../auth');
const { registerAdmin } = require('../user/service');
const { body } = require('express-validator');
const validate = require('../../validator');

// describe fields for HTTP request body
const adminValidationRules = () => ([
  body('password').isString(),
  body('username').isString(),
  body('email').isEmail(),
]);


app.get('/admin/user', authAdmin, async (req, res, next) => {
  res.send(await getUsers());
});

app.get('/admin/user/:uid', authAdmin, async (req, res, next) => {
  res.send(await getUser(req.params.uid));
});

// TODO: restrict admin registration in future versions
app.post('/admin/admin',
  adminValidationRules(),
  validate,
  async (req, res, next) => {
  try {
    res.send(await registerAdmin(
      req.body.password,
      req.body.username,
      req.body.email
    ));
  } catch (e) {
    next(e);
  }
});

module.exports = app;