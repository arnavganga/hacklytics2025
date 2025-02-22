const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 5000; // Can be any free port

// Enable CORS for cross-origin requests
app.use(cors());

// Set up middleware to handle JSON bodies
app.use(express.json());

// Create a database connection
const db = mysql.createConnection({
  host: "localhost", // Your DB host
  user: "your-user", // Your DB user
  password: "your-password", // Your DB password
  database: "your-database", // Your database name
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error: ", err);
    return;
  }
  console.log("Connected to the database!");
});

// Sample route to fetch data
app.get("/api/data", (req, res) => {
  db.query("SELECT * FROM your_table_name", (err, results) => {
    if (err) {
      res.status(500).send("Database query error");
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
