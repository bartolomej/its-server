const db = require('./db/repository');
const Course = require('./Course');
const Category = require('./Category');
const Subcategory = require('./Subcategory');


/** CATEGORY METHODS **/

async function createCategory ({ name, description }) {
  try {
    let category = new Category(
      name,
      description,
    );
    return await db.saveCategory(category);
  } catch (e) {
    console.log(e);
  }
}

async function updateCategory ({ uid, name, description }) {
  try {
    let category = await db.getCategoryByUid(uid);
    category.name = name;
    category.description = description;
    return await db.saveCategory(category);
  } catch (e) {
    console.log(e);
  }
}

async function removeCategory (uid) {
  try {
    await db.removeCategory(uid);
  } catch (e) {
    throw new Error('Category cant be removed');
  }
}

module.exports = {
  createCategory,
  updateCategory,
  removeCategory
};


/** SUBCATEGORY METHODS **/

async function createSubcategory ({ name, description, category }) {
  try {
    let category = await db.getCategoryByUid(category);
    let subcategory = new Subcategory(
      name,
      description,
      category
    );
    return await db.saveSubcategory(subcategory);
  } catch (e) {

  }
}

async function updateSubcategory ({ uid, name, description }) {
  try {
    let subcategory = await db.getSubcategoryByUid(uid);
    subcategory.name = name;
    subcategory.description = description;
    return await db.saveSubcategory(subcategory);
  } catch (e) {

  }
}

async function removeSubcategory (uid) {
  try {
    await db.removeSubcategory(uid);
  } catch (e) {

  }
}

module.exports = {
  ...module.exports,
  createSubcategory,
  updateSubcategory,
  removeSubcategory
};


/** COURSE METHODS **/

async function createCourse ({ title, description, tags, content, subcategories }) {
  try {
    let course = new Course(
      title,
      description,
      tags,
      content,
      subcategories
    );
    return await db.saveCourse(course);
  } catch (e) {

  }
}

async function updateCourse ({ uid, title, description, tags, content, subcategories }) {
  try {
    let course = await db.getCourseByUid(uid);
    course.title = title;
    course.description = description;
    course.tags = tags.join(',');
    course.content = content;
    course.subcategories = await Promise.all(
      subcategories.map(async uid => await db.getSubcategoryByUid(uid))
    );
    return await db.saveCourse(course);
  } catch (e) {

  }
}

async function removeCourse (uid) {
  try {
    await db.removeCourse(uid);
  } catch (e) {

  }
}

module.exports = {
  ...module.exports,
  createCourse,
  updateCourse,
  removeCourse
};