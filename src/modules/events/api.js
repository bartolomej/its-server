const app = require('express').Router();
const db = require('./db/repository');


app.get('/event', async (req, res, next) => {
  if (req.query.hasOwnProperty('type')) {
    return res.send(await db.getEventByType(req.query.type));
  }
  if (req.query.hasOwnProperty('creator')) {
    return res.send(await db.getEventByCreator(req.query.creator));
  }
  res.send(await db.getAllEvents());
});

module.exports = app;