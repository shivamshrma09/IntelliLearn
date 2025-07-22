const Certificate = require("../models/certificate.models");
const Student = require("../models/student.models");
const Batch = require("../models/batch.models");
const { v4: uuidv4 } = require('uuid');

// Generate a certificate for a student
exports.generateCertificate = async (req, res) => {
  try {
    const { batchId, score, totalQuestions, correctAnswers } = req.body;
    const studentId = req.student.id;
    
    // Check if certificate already exists
    const existingCertificate = await Certificate.findOne({ studentId, batchId });
    
    if (existingCertificate) {
      return res.status(400).json({
        success: false,
        message: "Certificate already generated for this batch"
      });
    }
    
    // Get batch details
    const batch = await Batch.findOne({ id: batchId });
    
    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found"
      });
    }
    
    // Calculate percentage
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Generate unique certificate ID
    const certificateId = `CERT-${uuidv4().substring(0, 8).toUpperCase()}`;
    
    // Create certificate
    const certificate = new Certificate({
      studentId,
      batchId,
      batchName: batch.title,
      score,
      totalQuestions,
      correctAnswers,
      percentage,
      certificateId
    });
    
    await certificate.save();
    
    // Update batch completion status
    batch.isCompleted = true;
    await batch.save();
    
    // Update student's completed batches count
    const student = await Student.findById(studentId);
    student.numberOfBatchesCompleted += 1;
    await student.save();
    
    res.status(201).json({
      success: true,
      certificate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all certificates for a student
exports.getStudentCertificates = async (req, res) => {
  try {
    const studentId = req.student.id;
    
    const certificates = await Certificate.find({ studentId });
    
    res.status(200).json({
      success: true,
      certificates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get certificate by ID
exports.getCertificateById = async (req, res) => {
  try {
    const { certificateId } = req.params;
    
    const certificate = await Certificate.findOne({ certificateId });
    
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found"
      });
    }
    
    res.status(200).json({
      success: true,
      certificate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};