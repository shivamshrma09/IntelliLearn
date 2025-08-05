const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batch.controllers');

// Get all batches (with optional auth)
router.get('/', batchController.getBatches);

// Get specific batch by ID
router.get('/:id', batchController.getBatchById);

// Create new batch
router.post('/', batchController.createBatch);

// Update batch progress
router.put('/:id/progress', batchController.updateBatchProgress);

// Update chapter progress
router.put('/:id/chapter/:chapterId/progress', batchController.updateChapterProgress);

// Save test results
router.post('/:id/test-results', batchController.saveTestResults);

// Save notes
router.post('/:id/notes', batchController.saveNotes);

module.exports = router;