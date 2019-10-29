# ITS server app
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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

```
// database config
DB_PORT = <port-number>
DB_HOST = <host-address>
DB_USER = <username>
DB_PASSWORD = <password>
DB_NAME = <name>

// email config
EMAIL_HOST = gmail
EMAIL_SERVICE = gmail
EMAIL_USER = <email>
EMAIL_PASSWORD = <email-password>

// app config
PORT = <app-port>
NODE_ENV = <current-enviroment>
```

## Available Scripts

In the project directory, you can run:

1. ##### `npm start`
Starts ITS application with node.

2. ##### `npm run start-dev`
Starts ITS application with nodemon process manager. 
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

```
├── README.md
├── package-lock.json
├── package.json
├── scripts
│   ├── clear-data.js
│   └── mock-data.js
└── src
    ├── app.js
    ├── errors.js
    ├── modules
    │   ├── education
    │   │   ├── Category.js
    │   │   ├── Course.js
    │   │   ├── Subcategory.js
    │   │   ├── api.js
    │   │   ├── db
    │   │   │   ├── Category.schema.js
    │   │   │   ├── Course.schema.js
    │   │   │   ├── Subcategory.schema.js
    │   │   │   └── repository.js
    │   │   └── education.test.js
    │   ├── email
    │   │   ├── Email.js
    │   │   ├── api.js
    │   │   ├── db
    │   │   │   ├── Email.schema.js
    │   │   │   └── repository.js
    │   │   ├── email.test.js
    │   │   ├── service.js
    │   │   └── template.js
    │   ├── events
    │   │   ├── Event.js
    │   │   ├── api.js
    │   │   ├── db
    │   │   │   ├── EventSchema.js
    │   │   │   └── repository.js
    │   │   └── listeners.js
    │   └── user
    │       ├── User.js
    │       ├── api.js
    │       ├── db
    │       │   ├── User.schema.js
    │       │   └── repository.js
    │       ├── service.js
    │       └── user.test.js
    └── setup
        ├── db.js
        ├── enviroment.js
        └── server.js
```