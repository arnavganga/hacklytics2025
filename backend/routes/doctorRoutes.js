const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");

router.post("/addDoctor", doctorController.addDoctor);
router.get("/getPatient/:id", doctorController.getPatientById);
router.get(
  "/getAppointmentsForDoctor/:id",
  doctorController.getAppointmentsForDoctor
);
router.get("/getPatientRecords/:id", doctorController.getPatientRecords);
router.get("/getPaymentsForDoctor/:id", doctorController.getPaymentsForDoctor);

module.exports = router;
