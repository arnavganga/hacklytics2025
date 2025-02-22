const express = require("express");
const router = express.Router();
const virtualNurseController = require("../controllers/virtualNurseController");

router.post("/", virtualNurseController.getAIResponse);

module.exports = router;
