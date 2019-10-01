const app = require('express').Router();
const { check, validationResult } = require('express-validator');
const { send } = require('./service');
const { getByUid, getAll } = require('./db/repository');
const { BadRequestError } = require('../../errors');


app.get('/email', async (req, res, next) => {
  res.send(await getAll());
});

module.exports = app;