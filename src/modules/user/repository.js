const getRepository = require('typeorm').getRepository;
const { ConflictError } = require('../../errors');

module.exports.save = async function (user) {
  return await getRepository("User")
    .save(user)
    .catch(e => {
      if (e.code === 'ER_DUP_ENTRY') {
        let value = e.message.split("'")[1];
        throw new ConflictError(
          `${user.getFieldName(value)}: '${value}' taken`,
          'Please use a different value'
        );
      }
    });
};

module.exports.getByUid = async function (uid) {
  return await getRepository("User")
    .createQueryBuilder("u")
    .where("u.uid = :uid", {uid})
    .getOne();
}