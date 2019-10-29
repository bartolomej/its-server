const createConnection = require('typeorm').createConnection;
const getRepository = require('typeorm').getRepository;
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '..', '..', '..', '.env')
});

const Category = require('./Category');
const Subcategory = require('./Subcategory');
const Course = require('./Course');
const db = require('./db/repository');


describe('Education repository tests', function () {

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await require('../../setup/enviroment')();
    await require('../../setup/db')();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    process.env.NODE_ENV = 'development';
    await require('../../setup/db').close();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  it('should save and fetch Category, SubCategories, Courses', async function () {
    let category1 = new Category(
      'category1',
      'Category1 description',
      'Category1 overview'
    );
    let category2 = new Category(
      'category2',
      'Category2 description',
      'Category2 overview'
    );
    let subCategory1 = new Subcategory(
      'subCategory1',
      'SubCategory1 description',
      category1
    );
    let subCategory2 = new Subcategory(
      'subCategory2',
      'SubCategory2 description',
      category2
    );
    let course1 = new Course(
      'course1',
      'Test course 1',
      [ 'test', 'tag' ],
      '# Test content',
      [ subCategory1, subCategory2 ]
    );
    let course2 = new Course(
      'course2',
      'Test course 2',
      [ 'test', 'tag' ],
      '# Test content',
      [ subCategory1 ]
    );

    let savedCategory1 = await db.saveCategory(category1);
    let savedCategory2 = await db.saveCategory(category2);
    let savedSubCategory1 = await db.saveSubcategory(subCategory1);
    let savedSubCategory2 = await db.saveSubcategory(subCategory2);
    let savedCourse1 = await db.saveCourse(course1);
    let savedCourse2 = await db.saveCourse(course2);

    expect(savedCategory1).toEqual(category1);
    expect(savedCategory2).toEqual(category2);
    expect(savedSubCategory1).toEqual(subCategory1);
    expect(savedSubCategory2).toEqual(subCategory2);
    expect(savedCourse1).toEqual(course1);
    expect(savedCourse2).toEqual(course2);


    let categories = await db.getAllCategories();
    let subcategories1 = await db.getSubcategories(category1.uid);
    let subcategories2 = await db.getSubcategories(category2.uid);
    let courses1 = await db.getCourses(subCategory1.uid);
    let courses2 = await db.getCourses(subCategory2.uid);
    let allCourses = await db.getAllCourses();

    expect(categories.length).toBe(2);
    expect(subcategories1.length).toBe(1);
    expect(subcategories2.length).toBe(1);
    expect(courses1.length).toBe(2);
    expect(courses2.length).toBe(1);
    expect(allCourses.length).toBe(2);
  });

});

async function clearDatabase () {
  await remove("Course");
  await remove("Subcategory");
  await remove("Category");
}

async function remove (modelName) {
  await getRepository(modelName)
    .createQueryBuilder()
    .delete()
    .from(modelName)
    .execute();
}