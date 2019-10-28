const path = require('path');

module.exports.normal = {
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

module.exports.withConnectionString = connectionObject => ({
  "type": "mysql",
  "host": connectionObject.hosts[0].host,
  "port": connectionObject.hosts[0].port,
  "username": connectionObject.username,
  "password": connectionObject.password,
  "database": connectionObject.endpoint,
  "synchronize": true,
  "entities": [
    "src/models/*.js"
  ]
});