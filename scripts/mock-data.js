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
    exampleMarkdown,
    [programiranje, stevila]
  );
  await createCourse(
    'Osnove programiranja v Pythony',
    `Tukaj se boste naucili osnove programskega jezika Python, 
     ki je zelo popularen med mladimi programerji`,
    ['python', 'programiranje'],
    exampleMarkdown,
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

const exampleMarkdown = `
---
__Advertisement :)__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!

---

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


## Code

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


## Plugins

The killer feature of \`markdown-it\` is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).


### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.


### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O


### [\\<ins>](https://github.com/markdown-it/markdown-it-ins)

++Inserted text++


### [\\<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==


### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.


### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b


### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning
*here be dragons*
:::
`;

module.exports = {
  ...module.exports,
  insertEducationData,
  insertMailData,
  insertUserData
};