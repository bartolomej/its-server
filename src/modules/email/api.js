const app = require('express').Router();
const { body } = require('express-validator');
const validate = require('../../validator');
const { getAllEmails, getAllTemplates } = require('./db/repository');


app.get('/email', async (req, res, next) => {
  res.send(await getAllEmails());
});

app.get('/email/template', async (req, res, next) => {
  res.send(await getAllTemplates());
});

module.exports = app;