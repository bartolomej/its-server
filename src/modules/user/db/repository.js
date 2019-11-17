const getRepository = require('typeorm').getRepository;
const { ConflictError, NotFoundError } = require('../../../errors');

module.exports.save = async function (user) {
  user.interests = user.interests &&
    user.interests instanceof Array
    ? user.interests.join(',')
    : user.interests;
  return await getRepository("User")
    .save(user)
    .catch(e => {
      if (e.code === 'ER_DUP_ENTRY') {
        let value = e.message.split("'")[1];
        throw new ConflictError(
          `Duplicate entry '${value}'`,
          'Please use a different value'
        );
      } else {
        throw e;
      }
    });
};

module.exports.remove = async function (uid) {
  return await getRepository("User")
    .createQueryBuilder()
    .delete()
    .from("User")
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

module.exports.getByUid = async function (uid) {
  let user = await getRepository("User")
    .createQueryBuilder("u")
    .where("u.uid = :uid", { uid })
    .getOne();
  if (!user) throw new NotFoundError(`User '${uid}' not found`);
  if (user.interests) user.interests = user.interests.split(',');
  return user;
};

module.exports.getAll = async function () {
  let users = await getRepository("User")
    .createQueryBuilder("u")
    .getMany();
  users.forEach(u => {
    if (u.interests) {
      u.interests = u.interests.split(',')
    }
  });
  return users;
};