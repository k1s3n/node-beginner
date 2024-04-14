const mysql = require('mysql2');
const settings = require('./settings.json');

const pool = mysql.createPool({
  host: settings.db.host,
  user: settings.db.user,
  password: settings.db.password,
  database: settings.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
