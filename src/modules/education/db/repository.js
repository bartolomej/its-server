const getRepository = require('typeorm').getRepository;
const { ConflictError, NotFoundError } = require('../../../errors');


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
  let category = await getRepository("Category")
    .createQueryBuilder("c")
    .where("c.uid = :uid", { uid })
    .getOne();
  return category ?
    category :
    new NotFoundError("Category not found", `Category '${uid}' doesn't exist`);
};

module.exports.getAllCategories = async function (onlyVisible = true) {
  return await getRepository("Category")
    .createQueryBuilder("c")
    .where(`c.visible = true`)
    .orWhere(`c.visible = ${onlyVisible ? 'true' : 'false'}`)
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
  let subcategory = await getRepository("Subcategory")
    .createQueryBuilder("s")
    .leftJoinAndSelect("s.category", "category")
    .where("s.uid = :uid", { uid })
    .getOne();
  return subcategory ?
    subcategory :
    new NotFoundError("Subcategory not found", `Subcategory '${uid}' doesn't exist`);
};

module.exports.getSubcategories = async function (categoryUid, onlyVisible = true) {
  return await getRepository("Subcategory")
    .createQueryBuilder("s")
    .leftJoinAndSelect("s.category", "category")
    .where("s.category = :categoryUid", { categoryUid })
    .where(`s.visible = true`)
    .orWhere(`s.visible = ${onlyVisible ? 'true' : 'false'}`)
    .getMany();
};

module.exports.getAllSubcategories = async function (categoryUid, onlyVisible = true) {
  return await getRepository("Subcategory")
    .createQueryBuilder("s")
    .leftJoinAndSelect("s.category", "category")
    .where(`s.visible = true`)
    .orWhere(`s.visible = ${onlyVisible ? 'true' : 'false'}`)
    .getMany();
};


//** COURSE QUERIES **//

module.exports.saveCourse = async function (course) {
  return parseCourse(await getRepository("Course").save(course));
};

module.exports.removeCourse = async function (uid) {
  return await getRepository("Course")
    .createQueryBuilder()
    .delete()
    .from("Course")
    .where("uid = :uid", { uid })
    .execute();
};

module.exports.getCourses = async function (subcategoryUid, onlyVisible = true) {
  let courses = await getRepository("Course")
    .createQueryBuilder("c")
    .leftJoinAndSelect("c.subcategories", "subcategories")
    .where("subcategories.uid = :subcategoryUid", { subcategoryUid })
    .where(`c.visible = true`)
    .orWhere(`c.visible = ${onlyVisible ? 'true' : 'false'}`)
    .getMany();
  return parseCourses(courses);
};

module.exports.getAllCourses = async function (onlyVisible = true) {
  let courses = await getRepository("Course")
    .createQueryBuilder("c")
    .leftJoinAndSelect("c.subcategories", "subcategories")
    .where(`c.visible = true`)
    .orWhere(`c.visible = ${onlyVisible ? 'true' : 'false'}`)
    .getMany();
  return parseCourses(courses);
};

module.exports.getCourseByUid = async function (uid) {
  let course = await getRepository("Course")
    .createQueryBuilder("c")
    .leftJoinAndSelect("c.subcategories", "subcategories")
    .where("c.uid = :uid", { uid })
    .getOne();
  return course ?
    parseCourse(course) :
    new NotFoundError("Course not found", `Course '${uid}' doesn't exist`);
};

function parseCourses (courses) {
  return courses.map(c => ({
    ...c,
    tags: c.tags ? c.tags.split(',') : '',
    categories: c.categories ? c.categories.split(',') : c.categories
  }))
}

function parseCourse (course) {
  course.tags = course.tags ? course.tags.split(',') : null;
  return course;
}