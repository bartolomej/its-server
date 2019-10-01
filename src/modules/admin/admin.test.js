const createConnection = require('typeorm').createConnection;
const getRepository = require('typeorm').getRepository;
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '..', '..', '..', '.env')
});

const Admin = require('./Admin');
const db = require('./db/repository');



describe('Admin repository tests', function () {

  beforeAll(async () => {
    await connectToDatabase();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  it('should save admin', async function () {
    let admin = new Admin(
      'testAdmin',
      'testAdminSurname',
      Admin.roles.NORMAL,
      'example@mail.com',
      '0310000'
    );

    let savedAdmin = await db.save(admin);
    expect(savedAdmin).toEqual(admin);
  })

});


async function connectToDatabase () {
  await createConnection(require('../../../typeorm'));
}

async function clearDatabase () {
  await getRepository("Admin")
    .createQueryBuilder()
    .delete()
    .from(Admin)
    .execute();
}