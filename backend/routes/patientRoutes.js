const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

// Patient Routes
router.post("/getUser", patientController.GetUserByEmail);
router.post("/addPatient", patientController.addPatient);
router.post("/scheduleAppointment", patientController.scheduleAppointment);
router.post("/addReview", patientController.addReview);
router.post("/addTransaction", patientController.addTransaction);
router.post("/saveMessage", patientController.saveMessage);
router.get("/getAllDoctors", patientController.getAllDoctors);
router.get("/getDoctorByID/:id", patientController.getDoctorByID);
router.get(
  "/getAppointmentsForPatient/:id",
  patientController.getAppointmentsForPatient
);
router.get("/getDoctorReviews/:id", patientController.getDoctorReviews);
router.get(
  "/getTransactionsForPatient/:id",
  patientController.getTransactionsForPatient
);
router.get(
  "/getChatHistory/:patientId/:doctorId",
  patientController.getChatHistory
);

module.exports = router;
