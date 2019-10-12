# ITS server app
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


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
```

## Available Scripts

In the project directory, you can run:

### `npm run test-data`
Inserts test data. Script is located in `scripts/mock-data.js`

### `npm run remove-data`
Removes all data. Script is located in `scripts/clear-data.js`

### Code style

- check for style warnings: `npx standard` or `npm test`
- automatically format code: `npx standard --fix`
