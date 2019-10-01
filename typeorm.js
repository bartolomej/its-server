const path = require('path');

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    path.join(__dirname, 'src', 'modules', 'education', 'db/*'),
    path.join(__dirname, 'src', 'modules', 'email', 'db/*'),
    path.join(__dirname, 'src', 'modules', 'user', 'db/*'),
    path.join(__dirname, 'src', 'modules', 'admin', 'db/*')
  ]
};