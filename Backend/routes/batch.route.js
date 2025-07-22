const express = require("express");
const router = express.Router();
const Batch = require("../models/batch.models");
const Student = require("../models/student.models");
const { authenticateToken } = require("../middlewares/student.middleware");

// Create new batch
router.post("/", authenticateToken, async (req, res) => {
  try {
    const studentId = req.student.id;
    const student = await Student.findById(studentId);
    
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    
    // Create and save the batch
    const batch = new Batch(req.body);
    await batch.save();
    
    // Add batch to student's batches
    student.batches.push({
      id: batch.id,
      title: batch.title,
      subject: batch.subject,
      difficulty: batch.difficulty,
      language: batch.language,
      estimatedTime: batch.estimatedTime,
      instructor: batch.instructor,
      image: batch.image,
      progress: 0,
      totalChapters: batch.totalChapters,
      completedChapters: 0,
      enrolledStudents: 1,
      type: batch.type,
      aiLearningPlan: batch.aiLearningPlan,
      completionStatus: batch.completionStatus
    });
    
    await student.save();
    
    res.status(201).json({ message: "Batch saved successfully", batch });
  } catch (error) {
    console.error("Error saving batch:", error.message);
    res.status(500).json({ message: "Error saving batch", error: error.message });
  }
});

// Get all batches for a student
router.get("/", authenticateToken, async (req, res) => {
  try {
    const studentId = req.student.id;
    const student = await Student.findById(studentId);
    
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    
    // Get batches from student's batches array
    res.json(student.batches);
  } catch (error) {
    console.error("Error fetching batches:", error.message);
    res.status(500).json({ message: "Error fetching batches", error: error.message });
  }
});

// Get a specific batch by ID
router.get("/:batchId", authenticateToken, async (req, res) => {
  try {
    const { batchId } = req.params;
    const batch = await Batch.findOne({ id: batchId });
    
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }
    
    res.json(batch);
  } catch (error) {
    console.error("Error fetching batch:", error.message);
    res.status(500).json({ message: "Error fetching batch", error: error.message });
  }
});

router.get('/batchesdetails', authenticateToken, async (req, res) => {
  try {
    const studentId = req.student.id;
    const student = await Student.findById(studentId);
    
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    
    // Get full batch details for each batch in student's batches
    const batchIds = student.batches.map(batch => batch.id);
    const batchDetails = await Batch.find({ id: { $in: batchIds } });
    
    res.json(batchDetails);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch batches' });
  }
});

// Generate library items, tests, and opportunities based on a batch
router.post('/:batchId/generate-resources', authenticateToken, async (req, res) => {
  try {
    const { batchId } = req.params;
    const studentId = req.student.id;
    
    // Find the batch and student
    const batch = await Batch.findOne({ id: batchId });
    const student = await Student.findById(studentId);
    
    if (!batch || !student) {
      return res.status(404).json({ message: "Batch or student not found" });
    }
    
    // Trigger resource generation in the background
    // This will be handled by the library, tests, and opportunities routes
    // when they are next accessed
    
    res.status(200).json({ 
      success: true,
      message: "Resource generation initiated. Resources will be available shortly."
    });
  } catch (error) {
    console.error("Error generating resources:", error.message);
    res.status(500).json({ message: "Error generating resources", error: error.message });
  }
});


// Update batch progress
router.put('/:batchId/progress', authenticateToken, async (req, res) => {
  try {
    const { batchId } = req.params;
    const { progress, completedChapters } = req.body;
    const studentId = req.student.id;
    
    // Update in student's batches array
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    
    const batchIndex = student.batches.findIndex(b => b.id === batchId);
    if (batchIndex === -1) {
      return res.status(404).json({ message: "Batch not found in student's batches" });
    }
    
    // Update progress
    student.batches[batchIndex].progress = progress;
    student.batches[batchIndex].completedChapters = completedChapters;
    
    // Check if batch is completed
    if (progress >= 100) {
      student.batches[batchIndex].isCompleted = true;
      student.numberOfBatchesCompleted += 1;
    }
    
    await student.save();
    
    // Also update the main batch document
    const batch = await Batch.findOne({ id: batchId });
    if (batch) {
      batch.progress = progress;
      batch.completedChapters = completedChapters;
      if (progress >= 100) {
        batch.isCompleted = true;
      }
      await batch.save();
    }
    
    res.status(200).json({ 
      success: true,
      message: "Batch progress updated",
      progress,
      completedChapters
    });
  } catch (error) {
    console.error("Error updating batch progress:", error.message);
    res.status(500).json({ message: "Error updating batch progress", error: error.message });
  }
});

module.exports = router;
