const pool = require("../databases/db");

// Add Doctor
exports.addDoctor = async (req, res) => {
  console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body);

  const { first_name, last_name, email, user_type, specialization, bio, age } =
    req.body;

  if (
    !first_name ||
    !last_name ||
    !email ||
    !user_type ||
    !specialization ||
    !bio ||
    !age
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const validUserTypes = ["patient", "doctor"];
  if (!validUserTypes.includes(user_type)) {
    return res.status(400).json({
      error: `${first_name} Invalid user_type. Must be 'patient' or 'doctor'. Received: ${user_type}`,
    });
  }

  const connection = await pool.getConnection();

  try {
    const [result] = await connection.query(
      "CALL AddDoctor(?, ?, ?, ?, ?, ?, ?)",
      [first_name, last_name, email, user_type, specialization, bio, age]
    );
    res.status(200).json({ message: "Doctor added successfully", result });
  } catch (error) {
    console.error("Error in addDoctor:", error);
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

// Get Patient By ID
exports.getPatientById = async (req, res) => {
  const patientID = req.params.id;
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query("CALL GetPatientByID(?)", [
      patientID,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error in getPatientByID:", error);
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

// Get Appointments For Doctor
exports.getAppointmentsForDoctor = async (req, res) => {
  const doctorID = req.params.id;
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query("CALL GetAppointmentsForDoctor(?)", [
      doctorID,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Appointments not found" });
    }
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error in getAppointmentsForDoctor:", error);
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

// Get Patient Records
exports.getPatientRecords = async (req, res) => {
  const patientID = req.params.id;
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query("CALL GetPatientRecords(?)", [
      patientID,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Records not found" });
    }
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error in getPatientRecords:", error);
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

// Get Payments For Doctor
exports.getPaymentsForDoctor = async (req, res) => {
  const doctorID = req.params.id;
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query("CALL GetPaymentsForDoctor(?)", [
      doctorID,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Payments not found" });
    }
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error in getPaymentsForDoctor:", error);
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};
