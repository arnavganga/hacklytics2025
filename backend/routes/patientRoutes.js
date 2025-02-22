// Patient Routes are:

// Stored Procedures:
// AddPatient, ScheduleAppointment, AddReview, AddPatientRecord, AddTransaction, SaveMessage

// Queries:
// GetAllDoctors, GetDoctorByID, GetAppointmentsForPatient, GetDoctorReviews, GetTransactionsForPatient
// GetPatientRecords, GetChatHistory
const express = require("express");

const router = express.Router();

// AddPatient
router.post("addPatient/", async (req, res) => {
  const { first_name, last_name, Age, Gender } = req.body;
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.query("CALL AddPatient(?, ?, ?, ?)", [
      first_name,
      last_name,
      Age,
      Gender,
    ]);
    res.status(200).json({ message: "Patient added successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// ScheduleAppointment
router.post("/scheduleAppointment", async (req, res) => {
  const { PatientID, DoctorID, DateTime } = req.body;
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.query(
      "CALL ScheduleAppointment(?, ?, ?)",
      [PatientID, DoctorID, DateTime]
    );
    res
      .status(200)
      .json({ message: "Appointment scheduled successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// AddReview
router.post("/addReview", async (req, res) => {
  const { PatientID, DoctorID, Rating, Feedback } = req.body;
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.query("CALL AddReview(?, ?, ?, ?)", [
      PatientID,
      DoctorID,
      Rating,
      Feedback,
    ]);
    res.status(200).json({ message: "Review added successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// AddPatientRecord
router.post("/addPatientRecord", async (req, res) => {
  const { PatientID, FileHash } = req.body;
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.query("CALL AddPatientRecord(?, ?)", [
      PatientID,
      FileHash,
    ]);
    res
      .status(200)
      .json({ message: "Patient record added successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// AddTransaction
router.post("/addTransaction", async (req, res) => {
  const { PatientID, DoctorID, Amount, DateSent } = req.body;
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.query("CALL AddTransaction(?, ?, ?, ?)", [
      PatientID,
      DoctorID,
      Amount,
      DateSent,
    ]);
    res.status(200).json({ message: "Transaction added successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// SaveMessage
router.post("/saveMessage", async (req, res) => {
  const { PatientID, DoctorID, Message } = req.body;
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.query("CALL SaveMessage(?, ?, ?)", [
      PatientID,
      DoctorID,
      Message,
    ]);
    res.status(200).json({ message: "Message saved successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// GetAllDoctors
router.get("/getAllDoctors", async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query("Call GetPatientRecords(?)");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// GetDoctorByID
router.get("/getDoctorByID/:id", async (req, res) => {
  const doctorID = req.params.id;
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query("Call GetDoctorByID(?)", [doctorID]);
    if (rows.length === 0) {
      res.status(404).json({ message: "Doctor not found" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// GetAppointmentsForPatient
router.get("/getAppointmentsForPatient/:id", async (req, res) => {
  const patientID = req.params.id;
  const connection = await pool.getConnection();

  try {
    const [appointments] = await connection.query(
      "Call GetAppointmentsForPatient(?)",
      [patientID]
    );
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// GetDoctorReviews
router.get("/getDoctorReviews/:id", async (req, res) => {
  const doctorID = req.params.id;
  const connection = await pool.getConnection();

  try {
    const [reviews] = await connection.query("Call GetDoctorReviews(?)", [
      doctorID,
    ]);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// GetTransactionsForPatient
router.get("/getTransactionsForPatient/:id", async (req, res) => {
  const patientID = req.params.id;
  const connection = await pool.getConnection();

  try {
    const [transactions] = await connection.query(
      "Call GetTransactionsForPatient(?)",
      [patientID]
    );
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// GetPatientRecords
router.get("/getPatientRecords/:id", async (req, res) => {
  const patientID = req.params.id;
  const connection = await pool.getConnection();

  try {
    const [records] = await connection.query("Call GetPatientRecords(?)", [
      patientID,
    ]);
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// GetChatHistory
router.get("/getChatHistory/:patientId/:doctorId", async (req, res) => {
  const { patientId, doctorId } = req.params;
  const connection = await pool.getConnection();

  try {
    const [chats] = await connection.query("Call GetChatHistory(?, ?)", [
      patientId,
      doctorId,
    ]);
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

module.exports = (pool) => router;
