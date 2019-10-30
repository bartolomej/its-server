const app = require('express').Router();
const { body } = require('express-validator');
const validate = require('../../validator');
const { getAll } = require('./db/repository');


app.get('/email', async (req, res, next) => {
  res.send(await getAll());
});

module.exports = app;