const express = require("express");
const router = express.Router();
const pool = require("../databases/db");  // Import the pool from db.js

// Add Doctor
router.post("/addDoctor", async (req, res) => {
  console.log("Request Headers:", req.headers);  // Log headers
  console.log("Request Body:", req.body);

  const {
    first_name,
    last_name,
    email,
    user_type,
    specialization,
    bio,
    age,
  } = req.body;

  // Validate fields
  if (!first_name || !last_name || !email || !user_type || !specialization || !bio || !age) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const validUserTypes = ['patient', 'doctor'];
  if (!validUserTypes.includes(user_type)) {
    return res.status(400).json({ error: `${first_name} Invalid user_type. Must be 'patient' or 'doctor'. Received: ${user_type}` });
  }

  const connection = await pool.promise().getConnection();  // Use promise-based connection

  try {
    const [result] = await connection.query(
      "CALL AddDoctor(?, ?, ?, ?, ?, ?, ?)",
      [first_name, last_name, email, user_type, specialization, bio, age]
    );
    res.status(200).json({ message: "Doctor added successfully", result });
  } catch (error) {
    console.error("Error in addDoctor:", error);  // Log error for debugging
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();  // Release the connection back to the pool
  }
});

// Get Patient By ID
router.get("/getPatient/:id", async (req, res) => {
  const patientID = req.params.id;
  const connection = await pool.promise().getConnection();  // Use promise-based connection

  try {
    const [rows] = await connection.query("CALL GetPatientByID(?)", [patientID]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    console.error("Error in getPatientByID:", error);  // Log error for debugging
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();  // Release the connection back to the pool
  }
});

// Get Appointments For Doctor
router.get("/getAppointmentsForDoctor/:id", async (req, res) => {
  const doctorID = req.params.id;
  const connection = await pool.promise().getConnection();  // Use promise-based connection

  try {
    const [rows] = await connection.query("CALL GetAppointmentsForDoctor(?)", [doctorID]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Appointments not found" });
    } else {
      res.status(200).json(rows);
    }
  } catch (error) {
    console.error("Error in getAppointmentsForDoctor:", error);  // Log error for debugging
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();  // Release the connection back to the pool
  }
});

// Get Patient Records
router.get("/getPatientRecords/:id", async (req, res) => {
  const patientID = req.params.id;
  const connection = await pool.promise().getConnection();  // Use promise-based connection

  try {
    const [rows] = await connection.query("CALL GetPatientRecords(?)", [patientID]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Records not found" });
    } else {
      res.status(200).json(rows);
    }
  } catch (error) {
    console.error("Error in getPatientRecords:", error);  // Log error for debugging
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();  // Release the connection back to the pool
  }
});

// Get Payments For Doctor
router.get("/getPaymentsForDoctor/:id", async (req, res) => {
  const doctorID = req.params.id;
  const connection = await pool.promise().getConnection();  // Use promise-based connection

  try {
    const [rows] = await connection.query("CALL GetPaymentsForDoctor(?)", [doctorID]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Payments not found" });
    } else {
      res.status(200).json(rows);
    }
  } catch (error) {
    console.error("Error in getPaymentsForDoctor:", error);  // Log error for debugging
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();  // Release the connection back to the pool
  }
});

module.exports = router;
