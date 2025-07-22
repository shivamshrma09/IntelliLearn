const express = require("express");
const router = express.Router();
const flashcardController = require("../controllers/flashcard.controllers");
const { authenticateToken } = require("../middlewares/student.middleware");

// Create a new flashcard
router.post("/", authenticateToken, flashcardController.createFlashcard);

// Get all flashcards for a batch
router.get("/batch/:batchId", authenticateToken, flashcardController.getFlashcardsByBatch);

// Like a flashcard
router.post("/like/:flashcardId", authenticateToken, flashcardController.likeFlashcard);

// Get flashcard by ID
router.get("/:flashcardId", authenticateToken, flashcardController.getFlashcardById);

module.exports = router;