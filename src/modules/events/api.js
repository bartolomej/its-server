const app = require('express').Router();
const db = require('./db/repository');
require('./listeners').register();


app.get('/event', async (req, res, next) => {
  res.send(await db.getAllEvents());
});

module.exports = app;