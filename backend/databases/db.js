const mysql = require("mysql2");
const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
} = require("../config/config");

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
});

const promisePool = pool.promise();

promisePool
  .getConnection()
  .then((connection) => {
    console.log("Connected to the database.");
    connection.release();
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err.stack);
  });
module.exports = promisePool;
