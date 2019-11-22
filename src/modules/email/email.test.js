const createConnection = require('typeorm').createConnection;
const getRepository = require('typeorm').getRepository;
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '..', '..', '..', '.env')
});

const Email = require('./Email');
const service = require('./service');
const db = require('./db/repository');


describe('Email repository tests', function () {

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await require('../../setup/enviroment')();
    await require('../../setup/db')();
  });

  afterAll(async () => {
    process.env.NODE_ENV = 'development';
    await require('../../setup/db').close();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  it('should save and fetch single email', async function () {
    let email = new Email();
    email.uid = '1';
    email.fromAddress = 'from.address@mail.com';
    email.toAddress = 'to.address@mail.com';
    email.subject = 'Test';
    email.text = 'This is a test email';

    let savedEmail = await db.saveEmail(email);
    let fetchedEmail = await db.getEmailByUid('1');

    expect(savedEmail).toEqual(email);
    expect({ ...fetchedEmail, datetime: null}).toEqual({ ...email, datetime: null});
  })

});


describe('Email service tests', function () {

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await require('../../setup/enviroment')();
    await require('../../setup/db')();
  });

  afterAll(async () => {
    process.env.NODE_ENV = 'development';
    await require('../../setup/db').close();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  it('should send test mail', async function () {
    let sentEmail = await service.send(
      'bartolomej.kozorog@gmail.com', 'ITS', 'Test',
      `Pozdravljen bartolomej,\n\nTo je testni email.
       Test je potekal ob ${new Date().toLocaleString()}\n\nEkipa ITS`
    );

    let savedEmail = await db.getEmailByUid(sentEmail.uid);

    expect({...savedEmail, datetime: null}).toEqual({...sentEmail, datetime: null});
  })

});

async function clearDatabase () {
  await getRepository("Email")
    .createQueryBuilder()
    .delete()
    .from(Email)
    .execute();
}