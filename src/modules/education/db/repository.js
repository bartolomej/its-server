const getRepository = require('typeorm').getRepository;


//** CATEGORY QUERIES **//

module.exports.saveCategory = async function (category) {
  return await getRepository("Category").save(category);
};

module.exports.getCategoryByUid = async function (uid) {
  return await getRepository("Category")
  .createQueryBuilder("c")
  .where("c.uid = :uid", {uid})
  .getOne();
}

module.exports.getCategories = async function () {
  return await getRepository("Category")
  .createQueryBuilder("c")
  .getMany();
}


//** SUBCATEGORY QUERIES **//

module.exports.saveSubcategory = async function (subCategory) {
  return await getRepository("Subcategory").save(subCategory);
};

module.exports.getSubcategoryByUid = async function (uid) {
  return await getRepository("Subcategory")
  .createQueryBuilder("s")
  .where("s.uid = :uid", {uid})
  .getOne();
}

module.exports.getSubcategories = async function (categoryUid) {
  return await getRepository("Subcategory")
  .createQueryBuilder("s")
  .leftJoinAndSelect("s.category", "category")
  .where("s.category = :categoryUid", {categoryUid})
  .getMany();
}


//** COURSE QUERIES **//

module.exports.saveCourse = async function (course) {
  return await getRepository("Course").save(course);
};

module.exports.getCourses = async function (subcategoryUid) {
  let courses = await getRepository("Course")
  .createQueryBuilder("c")
  .leftJoinAndSelect("c.subcategories", "subcategories")
  .where("subcategories.uid = :subcategoryUid", {subcategoryUid})
  .getMany();
  return courses.map(c => ({...c, tags: c.tags.split(',')}));
}

module.exports.getAllCourses = async function () {
  return await getRepository("Course")
  .createQueryBuilder("c")
  .leftJoinAndSelect("c.subcategories", "subcategories")
  .getMany();
}

module.exports.getCourseByUid = async function (uid) {
  return await getRepository("Course")
  .createQueryBuilder("c")
  .where("c.uid = :uid", {uid})
  .getOne();
}