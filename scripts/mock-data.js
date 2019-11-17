const getRepository = require('typeorm').getRepository;
const uuid = require('uuid/v4');
const fetch = require('node-fetch');

const Category = require('../src/modules/education/Category');
const Subcategory = require('../src/modules/education/Subcategory');
const Course = require('../src/modules/education/Course');
const User = require('../src/modules/user/User');
const Email = require('../src/modules/email/Email');

const userDb = require('../src/modules/user/db/repository');
const educationDb = require('../src/modules/education/db/repository');
const emailDb = require('../src/modules/email/db/repository');


/** PARAMETERS **/
const numberOfTestUsers = 30;
const numberOfTestEmails = 20;

(async function () {
  await require('../src/setup/enviroment')();
  try {
    await require('../src/setup/db')();
  } catch (e) { console.log(e.message) }

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
    await insertUserData(numberOfTestUsers);
    await insertMailData(numberOfTestEmails);
    console.log('Test data successfully inserted in db.');
    process.exit();
  } catch (e) {
    console.error('ERROR WHILE INSERTING DATA!');
    console.error(e);
    process.exit(1);
  }
})();

async function insertEducationData () {
  let matematika = await createCategory(
    'Matematika',
    'Vse o matematiki...',
  );
  let racunalnistvo = await createCategory(
    'Racunalnistvo',
    'Vse o racunalnistvu...',
  );
  let stevila = await createSubcategory(
    'Stevila',
    'V tem poglavju se bomo ukvarjali z stevili',
    matematika
  );
  let programiranje = await createSubcategory(
    'Programiranje',
    'SubCategory2 description',
    racunalnistvo
  );
  await createCourse(
    'Vizualizacija kompleksnih stevil',
    `Kaj so kompleksna in realna stevila ? Izdelajte preprosto vizualizacijo...`,
    ['stevila', 'programiranje', 'vizualizacije', 'javascript'],
    '# Test content',
    [programiranje, stevila]
  );
  await createCourse(
    'Osnove programiranja v Pythony',
    `Tukaj se boste naucili osnove programskega jezika Python, 
     ki je zelo popularen med mladimi programerji`,
    ['python', 'programiranje'],
    '# Test content',
    [programiranje]
  );

  async function createCategory (name, description) {
    let category = new Category(name, description);
    category.visible = true;
    await educationDb.saveCategory(category);
  }
  async function createSubcategory (name, description, category) {
    let subcategory = new Subcategory(name, description, category);
    subcategory.visible = true;
    await educationDb.saveSubcategory(subcategory);
  }
  async function createCourse (title, description, tags, content, subcategories) {
    let course = new Course(
      title,
      description,
      tags,
      content,
      subcategories
    );
    course.visible = true;
    await educationDb.saveCourse(course);
  }
}

async function insertUserData (n) {
  for (let i = 0; i < n; i++) {
    let response = await fetch('https://randomuser.me/api/');
    let result = await response.json();
    let randomUser = result.results[0];
    await createUser(
      randomUser.login.username,
      randomUser.registered.date,
      randomUser.dob.date,
      randomUser.email,
      randomUser.picture.medium,
      randomUser.gender
    );
  }

  async function createUser (username, created, birth, email, avatar, gender) {
    let user = new User();
    user.username = username;
    user.createdDate = created;
    user.birthDate = birth;
    user.email = email;
    user.website = username + '-example.com';
    user.interests = 'programming,design,math';
    user.avatar = avatar;
    user.gender = gender;
    user.type = Math.random()*2 > 1 ? 'ADMIN' : 'USER';
    await userDb.save(user);
  }
}

async function insertMailData (n) {
  let users = await userDb.getAll();
  for (let i = 0; i < n; i++) {
    let from = users[Math.round(Math.random()*n)].username;
    let to = users[Math.round(Math.random()*n)].username;
    await createEmail(from, to, i);
  }

  async function createEmail (fromUser, toUser, index) {
    let email = new Email();
    email.uid = uuid();
    email.fromAddress = `${fromUser}@mail.com`;
    email.toAddress = `${toUser}@mail.com`;
    email.subject = `Test mail ${index}`;
    email.text = 'This is a test email. ';
    await emailDb.saveEmail(email);
  }
}

async function remove(modelName) {
  await getRepository(modelName)
    .createQueryBuilder()
    .delete()
    .from(modelName)
    .execute();
}

module.exports = {
  ...module.exports,
  insertEducationData,
  insertMailData,
  insertUserData
};