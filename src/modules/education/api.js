const app = require('express').Router();
const { check, validationResult } = require('express-validator');
const db = require('./db/repository');


app.get('/education', (req, res) => {
  res.send('Education API');
});


//** CATEGORY ENDPOINTS **//

app.get('/education/category', async (req, res) => {
  res.send(await db.getCategories());
});


//** SUBCATEGORY ENDPOINTS **//

app.get('/education/category/:uid/subcategory', async (req, res) => {
  let categories = await db.getSubcategories(req.params.uid);
  res.send(categories.map(c => ({...c, category: undefined})));
});


//** COURSE ENDPOINTS **//

app.get('/education/subcategory/:uid/course', async (req, res) => {
  let courses = await db.getCourses(req.params.uid);
  res.send(courses.map(c => ({...c, subcategories: undefined})));
});



module.exports = app;