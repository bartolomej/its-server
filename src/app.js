const { ConnectionStringParser } = require("connection-string-parser");
const express = require('express');
const path = require('path');
const cors = require('cors');
const typeorm = require('typeorm');
const morgan = require('morgan');
const app = express();
require('dotenv').config({
  path: path.join(__dirname, '..', '.env')
});


// parse mysql connection string if present
let connectionObject;
if (process.env.DATABASE_URL) {
  const connectionStringParser = new ConnectionStringParser({
    scheme: "mysql",
    hosts: []
  });
  connectionObject = connectionStringParser.parse(process.env.DATABASE_URL);
  console.log('FOUND MYSQL CONNECTION STRING!');
}

typeorm.createConnection(process.env.DATABASE_URL ?
  require('../typeorm').withConnectionString(connectionObject) :
  require('../typeorm').normal
).then(() => {
  // Enable CORS
  app.use(cors());

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.get('/', (req, res, next) => {
    res.send('ITS server')
  });

  app.use(require('./modules/education/api'));
  app.use(require('./modules/user/api'));
  app.use(require('./modules/email/api'));
  app.use(require('./modules/events/api'));

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    res.status(404).send({
      name: 'NotFoundError',
      message: `Path '${req.path}' not found`
    })
  });

  // error handler
  app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(err);
    }
    const error = {
      name: err.name,
      message: err.message,
      description: err.description,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    };
    console.log(JSON.stringify(error));
    res.status(err.statusCode || 400).send(error);
  });

  app.listen(process.env.PORT || 3000, error => {
    if (error) {
      console.error(error);
      process.exit(1);
      return
    }
    console.log(`Server listening on port: ${process.env.PORT || 3000}`);
  })
}).catch(error => {
  console.log(error);
  process.exit(1);
});
