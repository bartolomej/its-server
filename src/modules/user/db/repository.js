const getRepository = require('typeorm').getRepository;
const { ConflictError, NotFoundError } = require('../../../errors');

module.exports.save = async function (user) {
  return deserialize(await getRepository("User")
    .save(serialize(user))
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
    }));
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
  return deserialize(user);
};

module.exports.getByEmail = async function (email) {
  let user = await getRepository("User")
    .createQueryBuilder("u")
    .where("u.email = :email", { email })
    .getOne();
  if (!user) throw new NotFoundError(`User '${email}' not found`);
  return deserialize(user);
};

module.exports.getAll = async function () {
  let users = await getRepository("User")
    .createQueryBuilder("u")
    .getMany();
  return users.map(deserialize);
};

function deserialize (user) {
  if (typeof user.interests === 'string') {
    user.interests = user.interests.split(',');
  }
  return user;
}

function serialize (user) {
  if (user.interests instanceof Array) {
    user.interests = user.interests.join(',')
  }
  return user;
}