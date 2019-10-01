const getRepository = require('typeorm').getRepository;


module.exports.save = async function (admin) {
  return await getRepository("Admin").save(admin);
};

module.exports.getByUid = async function (uid) {
  return await getRepository("Admin")
  .createQueryBuilder("a")
  .where('a.uid = :uid', {uid})
  .getMany();
};

module.exports.getAll = async function () {
  return await getRepository("Admin")
  .createQueryBuilder("a")
  .getMany();
};