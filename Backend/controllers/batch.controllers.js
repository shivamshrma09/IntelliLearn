const Batch = require('../models/batch.models');
const jwt = require('jsonwebtoken');

// Get all batches for user
exports.getBatches = async (req, res) => {
  try {
    // Return empty array if no auth or user
    if (!req.headers.authorization) {
      return res.json([]);
    }
    
    // Try to get user ID from token
    let userId = null;
    try {
      const token = req.headers.authorization.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id || decoded._id;
    } catch (tokenError) {
      console.log('Token verification failed:', tokenError.message);
      return res.json([]);
    }
    
    if (!userId) {
      return res.json([]);
    }
    
    const batches = await Batch.find({ userId }).sort({ createdAt: -1 });
    console.log('Found batches:', batches.length);
    res.json(batches);
  } catch (error) {
    console.error('Error fetching batches:', error);
    res.json([]);
  }
};

// Get batch by ID
exports.getBatchById = async (req, res) => {
  try {
    const batch = await Batch.findOne({ id: req.params.id, userId: req.user._id });
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }
    res.json(batch);
  } catch (error) {
    console.error('Error fetching batch:', error);
    res.status(500).json({ message: 'Error fetching batch', error: error.message });
  }
};

// Create new batch (basic info only)
exports.createBatch = async (req, res) => {
  try {
    console.log('Creating batch request body:', req.body);
    
    // Get user ID from token
    let userId = null;
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id || decoded._id;
      } catch (tokenError) {
        console.log('Token verification failed:', tokenError.message);
      }
    }
    
    // Only save basic batch information to database
    const batchData = {
      id: req.body.id || `batch-${Date.now()}`,
      userId: userId || 'anonymous',
      title: req.body.title,
      subject: req.body.subject,
      difficulty: req.body.difficulty,
      language: req.body.language,
      estimatedTime: req.body.estimatedTime,
      instructor: req.body.instructor,
      image: req.body.image,
      description: req.body.description,
      totalChapters: req.body.totalChapters,
      type: req.body.type,
      progress: 0,
      completedChapters: 0,
      enrolledStudents: 1,
      createdAt: new Date()
    };
    
    console.log('Basic batch data to save:', batchData);
    
    const batch = new Batch(batchData);
    const savedBatch = await batch.save();
    
    console.log('Batch saved successfully:', savedBatch._id);
    res.status(201).json({ batch: savedBatch });
  } catch (error) {
    console.error('Error creating batch:', error);
    res.status(500).json({ message: 'Error creating batch', error: error.message });
  }
};

// Update batch progress
exports.updateBatchProgress = async (req, res) => {
  try {
    const { progress, completedChapters } = req.body;
    const batch = await Batch.findOneAndUpdate(
      { id: req.params.id, userId: req.user._id },
      { progress, completedChapters },
      { new: true }
    );
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }
    res.json(batch);
  } catch (error) {
    console.error('Error updating batch progress:', error);
    res.status(500).json({ message: 'Error updating batch progress', error: error.message });
  }
};

// Update chapter progress
exports.updateChapterProgress = async (req, res) => {
  try {
    const { progress, completed } = req.body;
    const batch = await Batch.findOne({ id: req.params.id, userId: req.user._id });
    
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }
    
    // Update chapter progress in aiLearningPlan
    if (batch.aiLearningPlan && batch.aiLearningPlan.chapters) {
      const chapterIndex = batch.aiLearningPlan.chapters.findIndex(
        ch => ch.id === req.params.chapterId
      );
      
      if (chapterIndex !== -1) {
        batch.aiLearningPlan.chapters[chapterIndex].progress = progress;
        batch.aiLearningPlan.chapters[chapterIndex].completed = completed;
      }
    }
    
    await batch.save();
    res.json(batch);
  } catch (error) {
    console.error('Error updating chapter progress:', error);
    res.status(500).json({ message: 'Error updating chapter progress', error: error.message });
  }
};

// Save test results
exports.saveTestResults = async (req, res) => {
  try {
    const { testResults } = req.body;
    const batch = await Batch.findOne({ id: req.params.id, userId: req.user._id });
    
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }
    
    if (!batch.testResults) {
      batch.testResults = [];
    }
    
    batch.testResults.push({
      ...testResults,
      timestamp: new Date()
    });
    
    await batch.save();
    res.json(batch);
  } catch (error) {
    console.error('Error saving test results:', error);
    res.status(500).json({ message: 'Error saving test results', error: error.message });
  }
};

// Save notes
exports.saveNotes = async (req, res) => {
  try {
    const { notes } = req.body;
    const batch = await Batch.findOneAndUpdate(
      { id: req.params.id, userId: req.user._id },
      { notes },
      { new: true }
    );
    
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }
    
    res.json(batch);
  } catch (error) {
    console.error('Error saving notes:', error);
    res.status(500).json({ message: 'Error saving notes', error: error.message });
  }
};