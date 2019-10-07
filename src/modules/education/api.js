const app = require('express').Router();
const { check, validationResult } = require('express-validator');
const db = require('./db/repository');
const { BadRequestError } = require("../../errors");


app.get('/education', (req, res) => {
  res.send('Education API endpoint');
});

app.get('/education/category', async (req, res) => {
    res.send(await db.getAllCategories());
});

app.put('/education/category/:uid', [
  check('name').isString(),
  check('description').isString(),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new BadRequestError(
      "Invalid request body", errors.array()
    ));
  }
  try {
    let category = await db.getCategoryByUid(req.params.uid);
    category.name = req.body.name;
    category.description = req.body.description;
    res.send(await db.saveCategory(category));
  } catch (e) { next(e) }
});

app.get('/education/subcategory', async (req, res) => {
  let subcategories = await db.getAllSubcategories();
  res.send(subcategories.map(c => ({
    ...c,
    category: c.category.uid,
  })));
});

app.put('/education/subcategory/:uid', [
  check('name').isString(),
  check('description').isString(),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new BadRequestError(
      "Invalid request body", errors.array()
    ));
  }
  try {
    let subcategory = await db.getSubcategoryByUid(req.params.uid);
    subcategory.name = req.body.name;
    subcategory.description = req.body.description;
    res.send(await db.saveSubcategory(subcategory));
  } catch (e) { next(e) }
});

app.get('/education/course', async (req, res) => {
  let courses = req.query.subcategory ?
    await db.getCourses(req.query.subcategory) :
    await db.getAllCourses();
  res.send(courses.map(c => ({
    ...c,
    subcategories: c.subcategories.map(s => s.uid),
  })));
});

app.put('/education/course/:uid', [
  check('title').isString(),
  check('description').isString(),
  check('tags').isString(),
  check('content').isString(),
  check('subcategories').isArray(),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new BadRequestError(
      "Invalid request body", errors.array()
    ));
  }
  try {
    let course = await db.getCourseByUid(req.params.uid);
    course.title = req.body.title;
    course.description = req.body.description;
    course.tags = req.body.tags;
    course.content = req.body.content;
    course.subcategory = req.body.description;
    res.send(await db.saveCourse(course));
  } catch (e) { next(e) }
});


module.exports = app;