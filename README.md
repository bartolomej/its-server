<p align="center"> <img src="https://i.ibb.co/YXHPYQY/its-logo-3.png" width="240" /> </p>

# ITS server app
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![Heroku](https://heroku-badge.herokuapp.com/?app=rd-its)

View REST API documentation [here](https://stoplight.io/p/docs/gh/bartolomej/its-server).

## Setup

To install and work on ITS run:
1. `git clone https://github.com/bartolomej/its-server`
2. `cd its-server`
3. `npm install`
4. [configure environment variables](https://www.npmjs.com/package/dotenv#usage)
5. `npm run test-data`
6. `npm start`

## Environment variables:

Have a look at `.env.example` file in repository root.
```
DB_PORT = 3306
DB_HOST = localhost
DB_USER = <your-mysql-user>
DB_PASSWORD = <your-mysql-password>
DB_NAME = <mysql-db-name>

// app config
PORT = <app-port> / default: 3000
NODE_ENV = <current-enviroment> -> development / production

// those are credentials for test email account needed to send emails
EMAIL_HOST = gmail
EMAIL_SERVICE = gmail
EMAIL_USER = <email>
EMAIL_PASSWORD = <email-password>
```

## Available Scripts

In the project directory, you can run:

1. ##### `npm start`
Starts ITS application with node.

2. ##### `npm run start-dev`
Starts ITS application with nodemon process manager. <br>
Requires nodemon installed globally.
Install with `npm i nodemon -g`.

3. ##### `npm run test-data`
Inserts test data. Script is located in `scripts/mock-data.js`

4. ##### `npm run remove-data`
Removes all data. Script is located in `scripts/clear-data.js`

### Code style

- check for style warnings: `npx standard` or `npm test`
- automatically format code: `npx standard --fix`

## Project structure

<pre>
├── README.md
├── Procfile -> <i>config for deployment on Heroku</i>
├── package-lock.json -> <i>dependency lock file</i>
├── package.json -> <i>package declaration file</i>
├── scripts
│   ├── clear-data.js -> <i>removes data from db</i>
│   └── mock-data.js -> <i>writes test data to db</i>
└── src
    ├── app.js -> <i>entry script (main file)</i>
    ├── errors.js -> <i>defined domain errors objects</i>
    ├── modules -> <i>folder contains submodules</i>
    │   ├── education
    │   │   ├── Category.js -> <i>Category object model</i>
    │   │   ├── Course.js -> <i>Course object model</i>
    │   │   ├── Subcategory.js -> <i>Subcategory object model</i>
    │   │   ├── api.js -> <i>external HTTP endpoints for education</i>
    │   │   ├── db
    │   │   │   ├── Category.schema.js -> <i>Category DB schema definition</i>
    │   │   │   ├── Course.schema.js -> <i>Course DB schema definition</i>
    │   │   │   ├── Subcategory.schema.js -> <i>Subcategory DB schema definition</i>
    │   │   │   └── repository.js -> <i>db functions performing CRUD operations</i>
    │   │   └── education.test.js -> <i>education module tests</i>
    │   ├── email
    │   ├── events
    │   └── user
    └── setup
        ├── db.js -> <i>DB setup script</i>
        ├── environment.js -> <i>environment setup script</i>
        └── server.js -> <i>server setup script</i>
</pre>