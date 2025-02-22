const express = require("express");
const cors = require("cors");
const db = require("./config/db"); // Import database connection
const doctorRoutes = require("./routes/doctorRoutes"); // Example API routes

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors()); // Enable CORS for frontend communication

// API Routes
app.use("/api/doctors", doctorRoutes); // Example route for doctors

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Healthcare API");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
