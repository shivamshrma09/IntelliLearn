const express = require('express');
const aiController = require("../controllers/ai.controllers"); // Correct relative path
const router = express.Router();

router.get('/generate', aiController.getresponse);

module.exports = router;