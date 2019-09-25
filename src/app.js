const express = require('express');
const path = require('path');
const cors = require('cors');
const typeorm = require('typeorm');
const morgan = require('morgan');
const app = express();
require('dotenv').config({
  path: path.join(__dirname, '..', '.env')
})


typeorm.createConnection({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    path.join(__dirname, 'modules', 'education', 'db/*'),
    path.join(__dirname, 'modules', 'email', 'db/*'),
    path.join(__dirname, 'modules', 'user', 'db/*'),
  ]
}).then(() => {
  // Enable CORS
  app.use(cors())

  app.use(morgan('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.get('/', (req, res, next) => {
    res.send('ITS server')
  })

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    res.status(404).send('404 error')
  })

  // error handler
  app.use((err, req, res, next) => {
    res.send('error')
  })

  app.listen(process.env.PORT || 3000, error => {
    if (error) {
      console.error(error)
      process.exit(1)
      return
    }
    console.log(
      `Server listening on port: ${process.env.PORT || 3000}`
    );
  })
}).catch(error => {
  console.log(error)
  process.exit(1)
})
