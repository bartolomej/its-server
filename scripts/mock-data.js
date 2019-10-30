const getRepository = require('typeorm').getRepository;
const uuid = require('uuid/v4');

const Category = require('../src/modules/education/Category');
const Subcategory = require('../src/modules/education/Subcategory');
const Course = require('../src/modules/education/Course');
const User = require('../src/modules/user/User');
const Email = require('../src/modules/email/Email');

const userDb = require('../src/modules/user/db/repository');
const educationDb = require('../src/modules/education/db/repository');
const emailDb = require('../src/modules/email/db/repository');

const users = [
  'jakic12',
  'bartKoz',
  'kiko',
  'zak',
  'jakic122',
  'bartK3oz',
  'kikso',
  'zdak',
  'jakfdic12',
  'barqtKoz',
  'kifko',
  'zcak',
  'jakdic12',
  'bavrtKoz',
  'kisko',
  'zxack',
  'jakixc12',
  'bavrxtKoz',
  'kikxo',
  'zaxk',
  'jakxic12',
  'barztKoz',
  'kifgdko',
  'zafk',
  'jakicsds12',
  'baartKoz',
  'kiqko',
  'zgak',
];

(async function () {
  await require('../src/setup/enviroment')();
  await require('../src/setup/db')();

  try {
    await remove("User");
    await remove("Course");
    await remove("Subcategory");
    await remove("Category");
  } catch (e) {
    console.error('ERROR WHILE DELETING DATA');
    console.error(e);
    process.exit(1);
  }

  try {
    await insertEducationData();
    await insertUserData(users);
    await insertMailData(users, 6);
    console.log('Test data successfully inserted in db.');
    process.exit();
  } catch (e) {
    console.error('ERROR WHILE INSERTING DATA!');
    console.error(e);
    process.exit(1);
  }
})();

async function insertEducationData () {
  let matematika = await educationDb.saveCategory(new Category(
    'Matematika',
    'Vse o matematiki...',
  ));
  let racunalnistvo = await educationDb.saveCategory(new Category(
    'Racunalnistvo',
    'Vse o racunalnistvu...',
  ));
  let stevila = await educationDb.saveSubcategory(new Subcategory(
    'Stevila',
    'V tem poglavju se bomo ukvarjali z stevili',
    matematika
  ));
  let programiranje = await educationDb.saveSubcategory(new Subcategory(
    'Programiranje',
    'SubCategory2 description',
    racunalnistvo
  ));
  await educationDb.saveCourse(new Course(
    'Vizualizacija kompleksnih stevil',
    `Kaj so kompleksna in realna stevila ? Izdelajte preprosto vizualizacijo...`,
    ['stevila', 'programiranje', 'vizualizacije', 'javascript'],
    '# Test content',
    [programiranje, stevila]
  ));
  await educationDb.saveCourse(new Course(
    'Osnove programiranja v Pythony',
    `Tukaj se boste naucili osnove programskega jezika Python, 
     ki je zelo popularen med mladimi programerji`,
    ['python', 'programiranje'],
    '# Test content',
    [programiranje]
  ));
}

async function insertUserData (users) {
  for (const username of users) {
    let user = createUser(username);
    await userDb.save(user);
  }
}

function createUser (username) {
  let user = new User();
  user.username = username;
  user.createdDate = new Date();
  user.birthDate = new Date();
  user.email = username + '@mail.com';
  user.website = username + '-example.com';
  user.interests = 'programming,design,math';
  user.avatar = '/image/profile.png';
  user.type = Math.random()*2 > 1 ? 'ADMIN' : 'USER';
  return user;
}

async function insertMailData (users, n) {
  for (let i = 0; i < n; i++) {
    let from = Math.round(Math.random()*n);
    let to = Math.round(Math.random()*n);
    let email = new Email();
    email.uid = uuid();
    email.fromAddress = `${users[from]}@mail.com`;
    email.toAddress = `${users[to]}@mail.com`;
    email.subject = `Test mail ${i}`;
    email.text = 'This is a test email. ';
    await emailDb.save(email);
  }
}

async function remove(modelName) {
  await getRepository(modelName)
    .createQueryBuilder()
    .delete()
    .from(modelName)
    .execute();
}