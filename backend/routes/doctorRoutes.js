// Doctor Routes:

// Stored Procedures:
// AddDoctor

// Queries:
// GetPatientByID, GetAppointmentsForDoctor, GetPaymentsForDoctor, GetPatientRecords

const express = require("express");

const router = express.Router();

// Add Doctor
router.post("/addDoctor", async (req, res) => {
  const {
    first_name,
    last_name,
    DoctorImg,
    Specialization,
    Certificate,
    Bio,
    Age,
  } = req.body;
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.query(
      "CALL AddDoctor(?, ?, ?, ?, ?, ?, ?)",
      [first_name, last_name, DoctorImg, Specialization, Certificate, Bio, Age]
    );
    res.status(200).json({ message: "Doctor added successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// GetPatientByID
router.get("/getPatient/:id", async (req, res) => {
  const patientID = req.params.id;
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query("CALL GetPatientByID(?)", [
      patientID,
    ]);
    if (rows.length === 0) {
      res.status(404).json({ message: "Patient not found" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// GetAppointmentsForDoctor
router.get("getAppointmentsForDoctor/:id", async (req, res) => {
  const doctorID = req.params.id;
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query("Call GetAppointmentsForDoctor(?)", [
      doctorID,
    ]);

    if (rows.length === 0) {
      res.status(404).json({ message: "Appointment not found" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// GetPatientRecords (Fix later when you have implemented the block chain)
router.get("getPatientRecords/:id", async (req, res) => {
  const patientID = req.params.id;
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query("Call GetPatientRecords(?)", [
      patientID,
    ]);

    if (rows.length === 0) {
      res.status(404).json({ message: "Records not found" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// GetPaymentsForDoctor
router.get("getPaymentsForDoctor/:id", async (req, res) => {
  const doctorID = req.params.id;
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query("Call GetPaymentsForDoctor(?)", [
      doctorID,
    ]);

    if (rows.length === 0) {
      res.status(404).json({ message: "Payments not found" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

module.exports = (pool) => router;
