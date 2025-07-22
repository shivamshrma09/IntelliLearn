const Flashcard = require("../models/flashcard.models");
const Student = require("../models/student.models");

// Create a new flashcard
exports.createFlashcard = async (req, res) => {
  try {
    const { title, content, batchId, topicId } = req.body;
    
    const flashcard = new Flashcard({
      title,
      content,
      batchId,
      topicId
    });
    
    await flashcard.save();
    
    res.status(201).json({
      success: true,
      flashcard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all flashcards for a batch
exports.getFlashcardsByBatch = async (req, res) => {
  try {
    const { batchId } = req.params;
    
    const flashcards = await Flashcard.find({ batchId });
    
    res.status(200).json({
      success: true,
      flashcards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Like a flashcard
exports.likeFlashcard = async (req, res) => {
  try {
    const { flashcardId } = req.params;
    const studentId = req.student.id;
    
    const flashcard = await Flashcard.findById(flashcardId);
    
    if (!flashcard) {
      return res.status(404).json({
        success: false,
        message: "Flashcard not found"
      });
    }
    
    // Check if student already liked this flashcard
    if (flashcard.likedBy.includes(studentId)) {
      // Unlike
      flashcard.likes -= 1;
      flashcard.likedBy = flashcard.likedBy.filter(id => id.toString() !== studentId);
    } else {
      // Like
      flashcard.likes += 1;
      flashcard.likedBy.push(studentId);
    }
    
    await flashcard.save();
    
    res.status(200).json({
      success: true,
      flashcard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get flashcard by ID
exports.getFlashcardById = async (req, res) => {
  try {
    const { flashcardId } = req.params;
    
    const flashcard = await Flashcard.findById(flashcardId);
    
    if (!flashcard) {
      return res.status(404).json({
        success: false,
        message: "Flashcard not found"
      });
    }
    
    res.status(200).json({
      success: true,
      flashcard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};