const getRepository = require('typeorm').getRepository;

module.exports.save = async function (email) {
  return await getRepository("Email").save(email);
};

module.exports.getByUid = async function (uid) {
  return await getRepository("Email")
  .createQueryBuilder("e")
  .where("e.uid = :uid", {uid})
  .getOne();
}