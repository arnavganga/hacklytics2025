const express = require("express");
const cors = require("cors");
const db = require("./databases/db");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const virtualNurseRoutes = require("./routes/virtualNurseRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/virtualNurse", virtualNurseRoutes);

// Global Error handling
app.use(errorHandler);

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Healthcare API");
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
