const createConnection = require('typeorm').createConnection;
const getRepository = require('typeorm').getRepository;
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '..', '..', '..', '.env')
});

const db = require('./db/repository');
const service = require('./service');
const User = require('./User');


describe('User repository tests', function () {

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await connectToDatabase();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(() => {
    process.env.NODE_ENV = 'development';
  })

  afterEach(async () => {
    await clearDatabase();
  });

  it('should save and fetch single user', async function () {
    let user = new User();
    user.username = 'testUserName';
    user.createdDate = new Date();
    user.birthDate = new Date();
    user.email = 'est@mail.com';
    user.website = 'example.com';
    user.interests = 'programming,design';
    user.avatar = '/image/profile.png';

    let savedUser = await db.save(user);
    let fetchedUser = await db.getByUid(user.uid);

    expect(savedUser).toEqual(user);
    expect(fetchedUser).toEqual(fetchedUser);
  });

  it('should fetch and return not found error', async function () {
    try {
      await db.getByUid('invalidId');
    } catch (e) {
      expect(e.name).toEqual('NotFoundError');
      expect(e.message).toEqual(`User 'invalidId' not found`);
    }
  })

});


describe('User model tests', function () {

  it('should return field key', async function () {
    let user = new User();
    user.username = 'testUserName';
    user.createdDate = new Date();
    user.birthDate = new Date();
    user.email = 'test@mail.com';
    user.website = 'example.com';
    user.interests = 'programming,design';
    user.avatar = '/image/profile.png';

    expect(user.getFieldName('testUserName')).toEqual('username');
    expect(user.getFieldName('test@mail.com')).toEqual('email');
  });

});


describe('User service tests', function () {

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await connectToDatabase();
  });

  afterAll(() => {
    process.env.NODE_ENV = 'development';
  })

  beforeEach(async () => {
    await clearDatabase();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  it('should register users with same username', async function () {
    await service.register('testUsername', new Date(), 'test1@mail.com');
    try {
      await service.register('testUsername', new Date(), 'test2@mail.com');
    } catch (e) {
      expect(e.name).toEqual('ConflictError');
      expect(e.message).toEqual(`Username 'testUsername' taken`);
    }
  });

  it('should register users with same email', async function () {
    await service.register('testUsername1', new Date(), 'test@mail.com');
    try {
      await service.register('testUsername2', new Date(), 'test@mail.com');
    } catch (e) {
      expect(e.name).toEqual('ConflictError');
      expect(e.message).toEqual(`Email 'test@mail.com' taken`);
    }
  })

  it('should register users with same username & password', async function () {
    await service.register('testUsername', new Date(), 'test@mail.com');
    try {
      await service.register('testUsername', new Date(), 'test@mail.com');
    } catch (e) {
      expect(e.name).toEqual('ConflictError');
      expect(e.message).toEqual(`Username 'testUsername' taken`);
    }
  })
});


async function connectToDatabase () {
  await createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
      path.join(__dirname, 'db', 'UserSchema.js')
    ]
  });
}

async function clearDatabase () {
  await getRepository("User")
    .createQueryBuilder()
    .delete()
    .from(User)
    .execute();
}