const app = require('express').Router();
const { check, validationResult } = require('express-validator');
const db = require('./db/repository');
const { BadRequestError } = require("../../errors");
const Course = require('./Course');
const Category = require('./Category');
const Subcategory = require('./Subcategory');


app.get('/education', (req, res) => {
  res.send('Education API endpoint');
});


/** CATEGORY ENDPOINTS **/

app.get('/education/category', async (req, res) => {
    res.send(await db.getAllCategories());
});

app.delete('/education/category/:uid', async (req, res, next) => {
  try {
    await db.removeCategory(req.params.uid);
    res.send({ status: 'ok' });
  } catch (e) { next(e) }
});

app.put('/education/category/:uid', [
  check('name').isString().isLength({ min: 1 }),
  check('description').isString().isLength({ min: 1 }),
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

app.post('/education/category', [
  check('name').isString().isLength({ min: 1 }),
  check('description').isString().isLength({ min: 1 }),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new BadRequestError(
      "Invalid request body", errors.array()
    ));
  }
  try {
    let category = new Category(
      req.body.name,
      req.body.description,
    );
    res.send(await db.saveCategory(category));
  } catch (e) { next(e) }
});


/** SUBCATEGORY ENDPOINTS **/

app.get('/education/subcategory', async (req, res) => {
  let subcategories = await db.getAllSubcategories();
  res.send(subcategories.map(c => ({
    ...c,
    category: c.category ? c.category.uid : c.category,
  })));
});

app.delete('/education/subcategory/:uid', async (req, res, next) => {
  try {
    await db.removeSubcategory(req.params.uid);
    res.send({ status: 'ok' });
  } catch (e) { next(e) }
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

app.post('/education/subcategory', [
  check('name').isString(),
  check('description').isString(),
  check('category').isString(),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new BadRequestError(
      "Invalid request body", errors.array()
    ));
  }
  try {
    let category = await db.getCategoryByUid(req.body.category);
    let subcategory = new Subcategory(
      req.body.name,
      req.body.description,
      category
    );
    res.send(await db.saveSubcategory(subcategory));
  } catch (e) { next(e) }
});


/** COURSE ENDPOINTS **/

app.get('/education/course', async (req, res) => {
  let courses = req.query.subcategory ?
    await db.getCourses(req.query.subcategory) :
    await db.getAllCourses();
  res.send(courses.map(c => ({
    ...c,
    subcategories: c.subcategories.map(s => s.uid),
  })));
});

app.delete('/education/course/:uid', async (req, res, next) => {
  try {
    await db.removeCourse(req.params.uid);
    res.send({ status: 'ok' });
  } catch (e) { next(e) }
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
    course.subcategories = await Promise.all(
      req.body.subcategories.map(async uid => await db.getSubcategoryByUid(uid))
    );
    res.send(await db.saveCourse(course));
  } catch (e) { next(e) }
});

app.post('/education/course', [
  check('title').isString().isLength({ min: 1 }),
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
    let course = new Course(
      req.body.title,
      req.body.description,
      req.body.tags,
      req.body.content,
      req.body.subcategories
    );
    res.send(await db.saveCourse(course));
  } catch (e) { next(e) }
});


module.exports = app;