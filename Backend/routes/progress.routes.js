const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progress.controllers');

// Save user progress
router.post('/save', progressController.saveUserProgress);

// Get user progress for a specific batch
router.get('/:batchId', progressController.getUserProgress);

module.exports = router;