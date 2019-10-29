module.exports = async function (app) {
  const express = require('express');

  // enable CORS
  app.use(require('cors')());
  // development logger
  app.use(require('morgan')('dev'));
  // express json body parser
  app.use(express.json());
  // express url parser
  app.use(express.urlencoded({ extended: false }));

  // root endpoint
  app.get('/', (req, res, next) => res.send('ITS server is running 🙌'));

  // setup module apis
  app.use(require('../modules/education/api'));
  app.use(require('../modules/user/api'));
  app.use(require('../modules/email/api'));
  app.use(require('../modules/events/api'));

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    res.status(404).send({
      name: 'NotFoundError',
      message: `Path '${req.path}' not found`
    })
  });

  // express error handler
  app.use((err, req, res, next) => {
    const error = {
      name: err.name,
      message: err.message,
      description: err.description,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      errorObject: process.env.NODE_ENV === 'development' ? err : undefined
    };
    console.log(JSON.stringify(error, null, 4));
    res.status(err.statusCode || 400).send(error);
  });

  // start the server on port <PORT> or 3000
  app.listen(process.env.PORT || 3000, error => {
    if (error) {
      console.error('Error starting server');
      console.error(error);
      throw error;
    }
    console.log(`Server listening on port: ${process.env.PORT || 3000}`);
  })
};