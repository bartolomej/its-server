const createConnection = require('typeorm').createConnection;
const getRepository = require('typeorm').getRepository;
const path = require('path');
const uuid = require('uuid/v4');
require('dotenv').config({
  path: path.join(__dirname, '..', '.env')
});

const Category = require('../src/modules/education/Category');
const Subcategory = require('../src/modules/education/Subcategory');
const Course = require('../src/modules/education/Course');
const User = require('../src/modules/user/User');
const Email = require('../src/modules/email/Email');
const Admin = require('../src/modules/admin/Admin');

const userDb = require('../src/modules/user/db/repository');
const educationDb = require('../src/modules/education/db/repository');
const emailDb = require('../src/modules/email/db/repository');
const adminDb = require('../src/modules/admin/db/repository');


(async function () {
  await createConnection(require('../typeorm'));

  const users = [
    'jakic12',
    'bartKoz',
    'kiko',
    'zak'
  ];
  const admins = [
    ['Bartolomej', 'Kozorog'],
    ['Jakob', 'Drusany'],
    ['Luka', 'Gulic']
  ];
  await insertEducationData();
  await insertUserData(users);
  await insertMailData(users, 6);
  await insertAdminData(admins)
})();

async function insertEducationData () {
  let matematika = await educationDb.saveCategory(new Category(
    'Matematika',
    'Vse o matematiki...',
    'Category1 overview'
  ));
  let racunalnistvo = await educationDb.saveCategory(new Category(
    'Racunalnistvo',
    'Vse o racunalnistvu...',
    'Category2 overview'
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
  users.forEach(async username => {
    let user = createUser(username);
    await userDb.save(user);
  });
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

async function insertAdminData (admins) {
  admins.forEach(async admin => {
    await adminDb.save(new Admin(
      admin[0],
      admin[1],
      Admin.roles.NORMAL,
      admin[0] + '@mail.com',
      '0310000'
    ))
  })
}