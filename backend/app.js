const express = require("express");
const cors = require("cors"); // Lets us share information between frontend and backend (two domains)

// Import Routes for Doctors, Patients, and Virtual Nurse API routes
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const virtualNurseRoutes = require("./routes/virtualNurseRoutes");

// This serves at the global error handler for the APIs
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware (tells our app what it should use)
app.use(express.json());
app.use(cors());

// API Routes (tells our app what routes to use)
app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);
app.use("/virtualNurse", virtualNurseRoutes);

// Global Error handling
app.use(errorHandler);

// Root Route (Home/Welcome Page)
app.get("/", (req, res) => {
  res.send("Welcome to the Healthcare API");
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
