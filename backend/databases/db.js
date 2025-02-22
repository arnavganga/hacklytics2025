const mysql = require("mysql2");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost", // Change to your database host if needed
  user: "root", // Your database username
  password: "Hardik@16", // Your database password
  database: "healthcare_db", // Your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to the database.");
});

// Export the database connection
module.exports = connection;
