const app = require('express').Router();
const { body } = require('express-validator');
const validate = require('../../validator');
const { authAdmin } = require('../../auth');
const { getAllEmails, getAllTemplates } = require('./db/repository');


app.get('/email', authAdmin, async (req, res, next) => {
  res.send(await getAllEmails());
});

app.get('/email/template', authAdmin, async (req, res, next) => {
  res.send(await getAllTemplates());
});

module.exports = app;