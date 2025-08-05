const Student = require('../models/student.models');
const jwt = require('jsonwebtoken');

// Save user progress to database
exports.saveUserProgress = async (req, res) => {
  try {
    // Get user ID from token
    let userId = null;
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id || decoded._id;
      } catch (tokenError) {
        return res.status(401).json({ message: 'Invalid token' });
      }
    }

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { batchId, progress, completedChapters, completionStatus, testResults } = req.body;

    // Find student and update progress
    const student = await Student.findById(userId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Find the batch in student's batches array
    const batchIndex = student.batches.findIndex(batch => batch.id === batchId);
    
    if (batchIndex === -1) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    // Update only progress-related data in database
    student.batches[batchIndex].progress = progress;
    student.batches[batchIndex].completedChapters = completedChapters;
    student.batches[batchIndex].completionStatus = completionStatus;
    
    // Save test results if provided
    if (testResults) {
      if (!student.batches[batchIndex].testResults) {
        student.batches[batchIndex].testResults = [];
      }
      student.batches[batchIndex].testResults.push({
        ...testResults,
        timestamp: new Date()
      });
    }

    await student.save();

    res.json({ 
      message: 'Progress saved successfully',
      progress: {
        progress,
        completedChapters,
        completionStatus
      }
    });

  } catch (error) {
    console.error('Error saving progress:', error);
    res.status(500).json({ message: 'Error saving progress', error: error.message });
  }
};

// Get user progress from database
exports.getUserProgress = async (req, res) => {
  try {
    // Get user ID from token
    let userId = null;
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id || decoded._id;
      } catch (tokenError) {
        return res.status(401).json({ message: 'Invalid token' });
      }
    }

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { batchId } = req.params;

    // Find student
    const student = await Student.findById(userId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Find the batch
    const batch = student.batches.find(batch => batch.id === batchId);
    
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    // Return only progress data, not full batch content
    res.json({
      progress: batch.progress,
      completedChapters: batch.completedChapters,
      completionStatus: batch.completionStatus,
      testResults: batch.testResults || []
    });

  } catch (error) {
    console.error('Error getting progress:', error);
    res.status(500).json({ message: 'Error getting progress', error: error.message });
  }
};