const app = require('express').Router();
const { check, validationResult } = require('express-validator');
const db = require('./db/repository');


app.get('/education', (req, res) => {
  res.send('Education API');
});

app.get('/education/category', async (req, res) => {
    res.send(await db.getAllCategories());
});

app.get('/education/subcategory', async (req, res) => {
  let subcategories = await db.getAllSubcategories();
  res.send(subcategories.map(c => ({
    ...c,
    category: c.category.uid,
  })));
});

app.get('/education/course', async (req, res) => {
  let courses = req.query.subcategory ?
    await db.getCourses(req.query.subcategory) :
    await db.getAllCourses();
  res.send(courses.map(c => ({
    ...c,
    subcategory: c.subcategories.map(s => s.uid),
    subcategories: undefined
  })));
});


module.exports = app;