const pool = require("../databases/db");

// AddPatient
const addPatient = async (req, res) => {
  const { email, first_name, last_name, age, gender } = req.body;
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.query("CALL AddPatient(?, ?, ?, ?, ?)", [
      email,
      first_name,
      last_name,
      age,
      gender,
    ]);
    res.status(200).json({ message: "Patient added successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

// ScheduleAppointment
const scheduleAppointment = async (req, res) => {
  const { PatientID, DoctorID, DateTime, Link, Summary } = req.body;
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.query(
      "CALL ScheduleAppointment(?, ?, ?, ?, ?)",
      [PatientID, DoctorID, DateTime, Link, Summary]
    );
    res
      .status(200)
      .json({ message: "Appointment scheduled successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

// AddReview
const addReview = async (req, res) => {
  const { PatientID, DoctorID, Rating, Feedback } = req.body;
  const connection = await pool.getConnection();

  try {
    const [result] = await connection.query("CALL AddReview(?, ?, ?, ?)", [
      DoctorID,
      PatientID,
      Rating,
      Feedback,
    ]);
    res.status(200).json({ message: "Review added successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

// AddTransaction
const addTransaction = async (req, res) => {
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
};

// SaveMessage
const saveMessage = async (req, res) => {
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
};

// GetAllDoctors
const getAllDoctors = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query("CALL GetAllDoctors()");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

// GetUserByEmail
const GetUserByEmail = async (req, res) => {
  const email = req.params.id;
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query("CALL GETUSER(?)", [email]);
    if (rows.length === 0) {
      res.status(404).json(null);
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

// GetDoctorByID
const getDoctorByID = async (req, res) => {
  const doctorID = req.params.id;
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query("CALL GetDoctorByEmail(?)", [
      doctorID,
    ]);
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
};

// GetAppointmentsForPatient
const getAppointmentsForPatient = async (req, res) => {
  const patientID = req.params.id;
  const connection = await pool.getConnection();

  try {
    const [appointments] = await connection.query(
      "CALL GetAppointmentsForPatient(?)",
      [patientID]
    );
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

// GetDoctorReviews
const getDoctorReviews = async (req, res) => {
  const doctorID = req.params.id;
  const connection = await pool.getConnection();

  try {
    const [reviews] = await connection.query("CALL GetDoctorReviews(?)", [
      doctorID,
    ]);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

// GetTransactionsForPatient
const getTransactionsForPatient = async (req, res) => {
  const patientID = req.params.id;
  const connection = await pool.getConnection();

  try {
    const [transactions] = await connection.query(
      "CALL GetTransactionsForPatient(?)",
      [patientID]
    );
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

// GetChatHistory
const getChatHistory = async (req, res) => {
  const { patientId, doctorId } = req.params;
  const connection = await pool.getConnection();

  try {
    const [chats] = await connection.query("CALL GetChatHistory(?, ?)", [
      patientId,
      doctorId,
    ]);
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

module.exports = {
  addPatient,
  scheduleAppointment,
  addReview,
  addTransaction,
  saveMessage,
  getAllDoctors,
  getDoctorByID,
  getAppointmentsForPatient,
  getDoctorReviews,
  getTransactionsForPatient,
  getChatHistory,
  GetUserByEmail,
};
