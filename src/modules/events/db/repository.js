const getRepository = require('typeorm').getRepository;

module.exports.saveEvent = async function (category) {
  return await getRepository("Event").save(category);
};

module.exports.getEventByUid = async function (uid) {
  return await getRepository("Event")
    .createQueryBuilder("c")
    .where("c.uid = :uid", { uid })
    .getOne();
};

module.exports.getAllEvents = async function () {
  return await getRepository("Event")
    .createQueryBuilder("c")
    .getMany();
};