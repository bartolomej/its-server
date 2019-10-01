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
    await connectToDatabase();
  });

  afterAll(() => {
    process.env.NODE_ENV = 'development';
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

    let savedEmail = await db.save(email);
    let fetchedEmail = await db.getByUid('1');

    expect(savedEmail).toEqual(email);
    expect(fetchedEmail).toEqual(email);
  })

});


describe('Email service tests', function () {

  beforeAll(async () => {
    await connectToDatabase();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  it('should send test mail', async function () {
    let sentEmail = await service.send(
      'bartolomej.kozorog@gmail.com', 'ITS', 'Test',
      `Pozdravljen bartolomej,\n\nTo je testni email.
       Test je potekal ob ${ new Date().toLocaleString() }\n\nEkipa ITS`
    );

    let savedEmail = await db.getByUid(sentEmail.uid);

    expect(savedEmail).toEqual(sentEmail);
  })

});


async function connectToDatabase () {
  await createConnection(require('../../../typeorm'));
}

async function clearDatabase () {
  await getRepository("Email")
  .createQueryBuilder()
  .delete()
  .from(Email)
  .execute();
}