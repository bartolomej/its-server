(async function () {
  await require('../src/setup/enviroment');
  await require('../src/setup/db')();

  await remove("User");
  await remove("Course");
  await remove("Subcategory");
  await remove("Category");
  console.log('Data successfully removed from db.');
  process.exit();
})();

async function remove(modelName) {
  await require('typeorm').getRepository(modelName)
    .createQueryBuilder()
    .delete()
    .from(modelName)
    .execute();
}