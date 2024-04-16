import mysql from 'mysql2/promise'; // Use promise version of mysql2
import settings from './settings.json' assert { type: "json" };

const pool = mysql.createPool({
  host: settings.db.host,
  user: settings.db.user,
  password: settings.db.password,
  database: settings.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
