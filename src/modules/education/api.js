const app = require('express').Router();
const { body } = require('express-validator');
const validate = require('../../validator');
const db = require('./db/repository');
const service = require('./service');
const { createCategory, updateCategory, removeCategory } = require('./service');
const { createSubcategory, updateSubcategory, removeSubcategory } = require('./service');
const { createCourse, updateCourse, removeCourse } = require('./service');


/** CATEGORY ENDPOINTS **/

// describe fields for HTTP request body
const categoryValidationRules = () => ([
  body('name').isString().isLength({ min: 1 }),
  body('description').isString().isLength({ min: 1 }),
]);


app.get('/education', async (req, res) => {
  res.send(await service.getCategoriesWithCourses());
});

app.get('/education/category', async (req, res) => {
  res.send(await db.getAllCategories());
});

app.get('/education/category/:uid', async (req, res) => {
  res.send(await db.getCategoryByUid(req.params.uid));
});

app.post('/education/category',
  categoryValidationRules(),
  validate,
  async (req, res, next) => {
    try {
      res.send(await createCategory({
        name: req.body.name,
        description: req.body.description
      }));
    } catch (e) {
      next(e)
    }
});

app.put('/education/category/:uid',
  categoryValidationRules(),
  validate,
  async (req, res, next) => {
    try {
      res.send(await updateCategory({
        uid: req.params.uid,
        name: req.body.name,
        description: req.body.description
      }));
    } catch (e) {
      next(e)
    }
});

app.delete('/education/category/:uid', async (req, res, next) => {
  try {
    await removeCategory(req.params.uid);
    res.send({ status: 'ok' });
  } catch (e) {
    next(e)
  }
});


/** SUBCATEGORY ENDPOINTS **/

// describe fields for HTTP request body
const subcategoryValidationRules = () => ([
  body('name').isString(),
  body('description').isString(),
  body('category').isString(),
]);


app.get('/education/subcategory', async (req, res) => {
  let subcategories = await db.getAllSubcategories();
  res.send(subcategories.map(c => ({
    ...c,
    category: c.category ? c.category.uid : c.category,
  })));
});

app.get('/education/subcategory/:uid', async (req, res) => {
  res.send(await db.getSubcategoryByUid(req.params.uid));
});

app.post('/education/subcategory',
  subcategoryValidationRules(),
  validate,
  async (req, res, next) => {
    try {
      res.send(await createSubcategory({
        name: req.body.name,
        description: req.body.description
      }));
    } catch (e) {
      next(e)
    }
  });

app.put('/education/subcategory/:uid',
  subcategoryValidationRules(),
  validate,
  async (req, res, next) => {
    try {
      res.send(await updateSubcategory({
        name: req.body.name,
        description: req.body.description
      }));
    } catch (e) {
      next(e)
    }
});

app.delete('/education/subcategory/:uid', async (req, res, next) => {
  try {
    await removeSubcategory(req.params.uid);
    res.send({ status: 'ok' });
  } catch (e) {
    next(e)
  }
});


/** COURSE ENDPOINTS **/

// describe fields for HTTP request body
const courseValidationRules = () => ([
  body('title').isString().isLength({ min: 1 }),
  body('description').isString(),
  body('tags').isArray(),
  body('content').isString(),
  body('subcategories').isArray(),
]);


app.get('/education/course', async (req, res) => {
  let courses = req.query.subcategory ?
    await db.getCourses(req.query.subcategory) :
    await db.getAllCourses();
  res.send(courses.map(parseToMinifiedCourse));
});

app.get('/education/course/:uid', async (req, res) => {
  res.send(await db.getCourseByUid(req.params.uid));
});

app.post('/education/course',
  courseValidationRules(),
  validate,
  async (req, res, next) => {
  try {
    res.send(
      parseToMinifiedCourse(await createCourse({
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        content: req.body.content,
        subcategories: req.body.subcategories
      }))
    );
  } catch (e) {
    next(e)
  }
});

app.put('/education/course/:uid',
  courseValidationRules(),
  validate,
  async (req, res, next) => {
    try {
      res.send(
        parseToMinifiedCourse(await updateCourse({
          uid: req.params.uid,
          description: req.body.description,
          tags: req.body.tags,
          content: req.body.content,
          subcategories: req.body.subcategories
        }))
      );
    } catch (e) {
      next(e)
    }
});

app.delete('/education/course/:uid', async (req, res, next) => {
  try {
    await removeCourse(req.params.uid);
    res.send({ status: 'ok' });
  } catch (e) {
    next(e)
  }
});

function parseToMinifiedCourse (course) {
  if (
    course.subcategories.length > 0 &&
    course.subcategories[0] instanceof Object
  ) {
    course.subcategories = course.subcategories.map(ele => ele.uid);
  }
  if (
    course.tags.length > 0 &&
    course.tag instanceof String
  ) {
    course.tags = course.tags.split(',')
  }
  return course;
}


module.exports = app;