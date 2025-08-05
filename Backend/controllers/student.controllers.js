const studentService = require("../services/student.service");
const studentModel = require("../models/student.models");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');

// Register Student
exports.RegisterStudent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, course } = req.body;
    const isUserAlready = await studentModel.findOne({ email });

    if (isUserAlready) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await studentModel.hashPassword(password);
    const student = await studentService.createStudent({
      name,
      email,
      password: hashedPassword,
      course,
    });
    const token = student.generateAuthToken();

    res.status(201).json({
      token,
      user: {
        id: student._id,
        name: student.name,
        email: student.email,
        course: student.course,
        totalPoints: student.totalPoints || 0,
        streak: student.streak || 0
      },
      message: "Registration successful"
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: err.message || "Registration failed" });
  }
};





// Add batch to student
exports.addBatchToStudent = async (req, res) => {
  try {
    console.log('Add batch request received:', req.body);
    const { id, title, description, chapters } = req.body;
    
    // Validate required fields
    if (!id || !title) {
      return res.status(400).json({ message: 'Batch ID and title are required' });
    }
    
    // Get user ID from token
    let userId = null;
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id || decoded._id;
        console.log('User ID from token:', userId);
      } catch (tokenError) {
        console.error('Token error:', tokenError);
        return res.status(401).json({ message: 'Invalid token' });
      }
    }

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const student = await studentModel.findById(userId);
    if (!student) {
      console.log('Student not found for ID:', userId);
      return res.status(404).json({ message: 'Student not found' });
    }

    console.log('Student found:', student.name);
    console.log('Current batches count:', student.batches ? student.batches.length : 0);

    // Initialize batches array if it doesn't exist
    if (!student.batches) {
      student.batches = [];
    }

    // Check if batch already exists
    const existingBatch = student.batches.find(batch => batch.id === id);
    if (existingBatch) {
      console.log('Batch already exists, updating...');
      existingBatch.title = title;
      existingBatch.description = description;
      existingBatch.chapters = chapters || [];
    } else {
      // Add new batch to student's batches array
      student.batches.push({
        id,
        title,
        description,
        chapters: chapters || [],
        progress: 0,
        totalChapters: Array.isArray(chapters) ? chapters.length : 0,
        completedChapters: 0,
        createdAt: new Date()
      });
    }

    // Save with error handling
    try {
      await student.save();
      console.log('Batch saved successfully. New batches count:', student.batches.length);
      res.status(200).json({ 
        message: 'Batch added successfully', 
        batchesCount: student.batches.length,
        batchId: id
      });
    } catch (saveError) {
      console.error('Failed to save batch to student database:', saveError);
      res.status(500).json({ 
        message: 'Failed to save batch to student database', 
        error: saveError.message 
      });
    }

  } catch (err) {
    console.error('Error in addBatchToStudent:', err);
    res.status(500).json({ message: err.message });
  }
};









exports.addLibraryToStudent = async (req, res) => {
  try {
    console.log('Add library item request received:', req.body);
    const { title, description, tags, url, readingTime, rating, views } = req.body;

    if (!description || !title) {
      return res.status(400).json({ message: 'Description and title are required' });
    }

    let userId = null;
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decoded = require('jsonwebtoken').verify(token, process.env.JWT_SECRET);
        userId = decoded.id || decoded._id;
        console.log('User ID from token:', userId);
      } catch (tokenError) {
        console.error('Token error:', tokenError);
        return res.status(401).json({ message: 'Invalid token' });
      }
    }

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const studentModel = require('../models/student.models'); // Check your path carefully, e.g. student.model.js or .models.js
    const student = await studentModel.findById(userId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (!student.libraryItems) {
      student.libraryItems = [];
    }

    const existingItem = student.libraryItems.find(item => item.url === url);
    if (existingItem) {
      existingItem.title = title;
      existingItem.description = description;
      existingItem.tags = tags;
      existingItem.readingTime = readingTime;
      existingItem.rating = rating;
      existingItem.views = views;
    } else {
      // NOTE: Your schema requires `type`, `subject`, `content`, `course` fields based on previous info
      // But you are NOT assigning these here. This likely will cause validation errors.
      // You MUST include them here with proper values or provide defaults:

      student.libraryItems.push({
        title,
        description,
        tags,
        url,
        readingTime,
        rating,
        views,
        // Add required additional fields here, e.g.:
        type: req.body.type || "document",    // or derive type from tags or AI data
        subject: req.body.subject || "General",
        content: req.body.content || description || "No content",
        course: student.course || "Unknown Course",  // Use student.course if available
        createdAt: new Date(),
      });
    }

    await student.save();

    res.status(200).json({
      message: 'Library item added successfully',
      libraryCount: student.libraryItems.length,
      libraryItems: student.libraryItems
    });

  } catch (err) {
    console.error('Error in addLibraryToStudent:', err);
    res.status(500).json({ message: err.message });
  }
};

// Update study time and points
exports.updateStudySession = async (req, res) => {
  try {
    const { sessionTime, pointsEarned } = req.body;
    
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

    const student = await studentModel.findById(userId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const today = new Date().toDateString();
    
    // Initialize studySessions if it doesn't exist
    if (!student.studySessions) {
      student.studySessions = [];
    }

    // Find or create today's session
    let todaySession = student.studySessions.find(session => session.date === today);
    if (!todaySession) {
      todaySession = {
        date: today,
        totalTime: 0,
        sessions: [],
        pointsEarned: 0
      };
      student.studySessions.push(todaySession);
    }

    // Update session data
    todaySession.totalTime += sessionTime;
    todaySession.pointsEarned += pointsEarned;
    todaySession.sessions.push({
      start: new Date(Date.now() - sessionTime),
      end: new Date(),
      duration: sessionTime
    });

    // Update total points
    student.totalPoints += pointsEarned;
    student.lastActiveDate = new Date();

    // Update streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    const yesterdaySession = student.studySessions.find(session => session.date === yesterdayStr);
    if (yesterdaySession && yesterdaySession.totalTime > 0) {
      student.streak += 1;
    } else if (student.streak === 0) {
      student.streak = 1;
    }

    await student.save();

    res.status(200).json({
      message: 'Study session updated successfully',
      totalPoints: student.totalPoints,
      streak: student.streak,
      todayStudyTime: todaySession.totalTime
    });

  } catch (err) {
    console.error('Error updating study session:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get user with real-time stats
exports.getUserWithStats = async (req, res) => {
  try {
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

    const student = await studentModel.findById(userId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const today = new Date().toDateString();
    const todaySession = student.studySessions?.find(session => session.date === today);
    
    res.status(200).json({
      ...student.toObject(),
      todayStudyTime: todaySession?.totalTime || 0,
      todayPoints: todaySession?.pointsEarned || 0
    });

  } catch (err) {
    console.error('Error fetching user stats:', err);
    res.status(500).json({ message: err.message });
  }
};



exports.loginstudent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const student = await studentModel.findOne({ email }).select("+password");

  if (!student) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await student.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = student.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, student });
};

















