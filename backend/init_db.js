const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
} = require("./config/config");

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  multipleStatements: true, // Allows executing multiple queries at once
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database.");

  const schema = fs.readFileSync(
    path.join(__dirname, "databases/schema.sql"),
    "utf8"
  );
  const queries = fs.readFileSync(
    path.join(__dirname, "databases/queries.sql"),
    "utf8"
  );
  const procedures = fs.readFileSync(
    path.join(__dirname, "databases/procuedures.sql"),
    "utf8"
  );

  connection.query(schema + queries + procedures, (err) => {
    if (err) {
      console.error("Error initializing database:", err.stack);
    } else {
      console.log("Database initialized successfully.");
    }
    connection.end();
  });
});
