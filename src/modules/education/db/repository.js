const getRepository = require('typeorm').getRepository;
const { ConflictError } = require('../../../errors');


//** CATEGORY QUERIES **//

module.exports.saveCategory = async function (category) {
  return await getRepository("Category").save(category);
};

module.exports.removeCategory = async function (uid) {
  return await getRepository("Category")
    .createQueryBuilder()
    .delete()
    .from("Category")
    .where("uid = :uid", { uid })
    .execute()
    .catch(e => {
      if (/ER_ROW_IS_REFERENCED/.test(e.message)) {
        throw new ConflictError("Cannot delete entity because it is referenced");
      } else {
        throw new ConflictError(e.message)
      }
    })
};

module.exports.getCategoryByUid = async function (uid) {
  return await getRepository("Category")
  .createQueryBuilder("c")
  .where("c.uid = :uid", {uid})
  .getOne();
};

module.exports.getAllCategories = async function () {
  return await getRepository("Category")
  .createQueryBuilder("c")
  .getMany();
};


//** SUBCATEGORY QUERIES **//

module.exports.saveSubcategory = async function (subCategory) {
  return await getRepository("Subcategory").save(subCategory);
};

module.exports.removeSubcategory = async function (uid) {
  return await getRepository("Subcategory")
    .createQueryBuilder()
    .delete()
    .from("Subcategory")
    .where("uid = :uid", { uid })
    .execute();
};

module.exports.getSubcategoryByUid = async function (uid) {
  return await getRepository("Subcategory")
  .createQueryBuilder("s")
  .where("s.uid = :uid", {uid})
  .getOne();
};

module.exports.getSubcategories = async function (categoryUid) {
  return await getRepository("Subcategory")
  .createQueryBuilder("s")
  .leftJoinAndSelect("s.category", "category")
  .where("s.category = :categoryUid", {categoryUid})
  .getMany();
};

module.exports.getAllSubcategories = async function (categoryUid) {
  return await getRepository("Subcategory")
    .createQueryBuilder("s")
    .leftJoinAndSelect("s.category", "category")
    .getMany();
};


//** COURSE QUERIES **//

module.exports.saveCourse = async function (course) {
  return await getRepository("Course").save(course);
};

module.exports.removeCourse = async function (uid) {
  return await getRepository("Course")
    .createQueryBuilder()
    .delete()
    .from("Course")
    .where("uid = :uid", { uid })
    .execute();
};

module.exports.getCourses = async function (subcategoryUid) {
  let courses = await getRepository("Course")
  .createQueryBuilder("c")
  .leftJoinAndSelect("c.subcategories", "subcategories")
  .where("subcategories.uid = :subcategoryUid", {subcategoryUid})
  .getMany();
  return parseCourses(courses);
};

module.exports.getAllCourses = async function () {
  let courses = await getRepository("Course")
  .createQueryBuilder("c")
  .leftJoinAndSelect("c.subcategories", "subcategories")
  .getMany();
  return parseCourses(courses);
};

module.exports.getCourseByUid = async function (uid) {
  return await getRepository("Course")
  .createQueryBuilder("c")
  .where("c.uid = :uid", {uid})
  .getOne();
};

function parseCourses(courses) {
  return courses.map(c => ({
    ...c,
    tags: c.tags ? c.tags.split(',') : '',
    categories: c.categories ? c.categories.split(',') : c.categories
  }))
}