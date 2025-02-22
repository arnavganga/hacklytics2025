const express = require("express");
const router = express.Router();
const virtualNurseController = require("../controllers/virtualNurseController");

router.post("/virtual-nurse", virtualNurseController.getAIResponse);

module.exports = router;
