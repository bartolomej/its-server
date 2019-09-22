const express = require('express');
const path = require('path');
const winston = require('winston');
const morgan = require('morgan');

require('dotenv').config({
  path: path.join(__dirname, '..', '.env')
});

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res, next) => {
  res.send('ITS server');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).send('404 error');
});

// error handler
app.use((err, req, res, next) => {
  res.send('error');
});

app.listen(process.env.PORT || 3000, error => {
  if (error) {
    console.error(error);
    process.exit(1);
    return;
  }
  console.log(`Server listening on port: ${process.env.PORT || 3000}`)
});