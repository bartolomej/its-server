const getRepository = require('typeorm').getRepository;


module.exports.saveEvent = async function (event) {
  return await getRepository("Event").save(event);
};

module.exports.getEventByCreator = async function (uid) {
  return await getRepository("Event")
    .createQueryBuilder("c")
    .where("c.creator = :uid", { uid })
    .getOne();
};

module.exports.getEventByType = async function (type) {
  return await getRepository("Event")
    .createQueryBuilder("c")
    .where("c.type = :type", { type })
    .getOne();
};

module.exports.getAllEvents = async function () {
  return await getRepository("Event")
    .createQueryBuilder("c")
    .getMany();
};