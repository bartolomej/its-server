const createConnection = require('typeorm').createConnection;
const getRepository = require('typeorm').getRepository;
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '..', '.env')
});


(async function () {
  await createConnection(require('../typeorm'));
  await remove("User");
  await remove("Course");
  await remove("Subcategory");
  await remove("Category");
})();

async function remove(modelName) {
  await getRepository(modelName)
    .createQueryBuilder()
    .delete()
    .from(modelName)
    .execute();
}