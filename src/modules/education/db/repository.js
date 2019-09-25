const getRepository = require('typeorm').getRepository;


module.exports.saveCategory = async function (category) {
  return await getRepository("Category").save(category);
};

module.exports.saveSubcategory = async function (subCategory) {
  return await getRepository("Subcategory").save(subCategory);
};

module.exports.saveCourse = async function (course) {
  return await getRepository("Course").save(course);
};

module.exports.getCategories = async function () {
  return await getRepository("Category")
  .createQueryBuilder("c")
  .getMany();
}

module.exports.getSubcategories = async function (categoryUid) {
  return await getRepository("Subcategory")
  .createQueryBuilder("s")
  .leftJoinAndSelect("s.category", "category")
  .where("s.category = :categoryUid", {categoryUid})
  .getMany();
}

module.exports.getCourses = async function (subcategoryUid) {
  return await getRepository("Course")
  .createQueryBuilder("c")
  .leftJoinAndSelect("c.subcategories", "subcategories")
  .where("subcategories.uid = :subcategoryUid", {subcategoryUid})
  .getMany();
}

module.exports.getAllCourses = async function () {
  return await getRepository("Course")
  .createQueryBuilder("c")
  .leftJoinAndSelect("c.subcategories", "subcategories")
  .getMany();
}

module.exports.getCategoryByUid = async function (uid) {
  return await getRepository("Category")
  .createQueryBuilder("c")
  .where("c.uid = :uid", {uid})
  .getOne();
}

module.exports.getSubcategoryByUid = async function (uid) {
  return await getRepository("Subcategory")
  .createQueryBuilder("s")
  .where("s.uid = :uid", {uid})
  .getOne();
}

module.exports.getCourseByUid = async function (uid) {
  return await getRepository("Course")
  .createQueryBuilder("c")
  .where("c.uid = :uid", {uid})
  .getOne();
}