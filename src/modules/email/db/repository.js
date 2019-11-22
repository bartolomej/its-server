const getRepository = require('typeorm').getRepository;


/** EMAIL ENTITY METHODS **/

module.exports.saveEmail = async function (email) {
  return await getRepository("Email").save(email);
};

module.exports.getAllEmails = async function () {
  return await getRepository("Email")
    .createQueryBuilder("e")
    .getMany();
};

module.exports.getEmailByUid = async function (uid) {
  return await getRepository("Email")
    .createQueryBuilder("e")
    .where("e.uid = :uid", { uid })
    .getOne();
};


/** TEMPLATE ENTITY METHODS **/

module.exports.saveTemplate = async function (template) {
  return await getRepository("Template").save(template);
};

module.exports.getAllTemplates = async function () {
  return await getRepository("Template")
    .createQueryBuilder("e")
    .getMany();
};

module.exports.getTemplateByUid = async function (uid) {
  return await getRepository("Template")
    .createQueryBuilder("e")
    .where("e.uid = :uid", { uid })
    .getOne();
};