const { ConnectionStringParser } = require("connection-string-parser");
const path = require('path');
const typeorm = require('typeorm');

let connection;

module.exports = async function () {
  try {
    connection = await typeorm.createConnection(typeormConfig());
  } catch (e) {
    console.error('DB Connection Error');
    console.error(e);
    throw e;
  }
};

module.exports.close = async function () {
  if (connection) {
    await connection.close();
  }
};

function typeormConfig () {

  const config = (host, port, database, username, password ) => ({
    host, port, username, password, database,
    type: 'mysql',
    synchronize: true,
    logging: false,
    extra: { insecureAuth: true },
    entities: [
      path.join(__dirname, '..', 'modules', 'education', 'db', '*.schema.js'),
      path.join(__dirname, '..', 'modules', 'email', 'db/*.schema.js'),
      path.join(__dirname, '..', 'modules', 'user', 'db/*.schema.js'),
    ]
  });

  // parse mysql connection string if present
  if (process.env.DATABASE_URL) {
    console.log('FOUND MYSQL CONNECTION STRING');
    const parser = new ConnectionStringParser({ scheme: "mysql", hosts: [] });
    let connectionObject = parser.parse(process.env.DATABASE_URL);
    return config(
      connectionObject.hosts[0].host,
      connectionObject.hosts[0].port,
      connectionObject.endpoint,
      connectionObject.password,
      connectionObject.username
    );
  } else {
    return config(
      process.env.DB_HOST,
      process.env.DB_PORT,
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
    );
  }
}