const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificate.controllers");
const { authenticateToken } = require("../middlewares/student.middleware");

// Generate a certificate
router.post("/generate", authenticateToken, certificateController.generateCertificate);

// Get all certificates for a student
router.get("/", authenticateToken, certificateController.getStudentCertificates);

// Get certificate by ID
router.get("/:certificateId", authenticateToken, certificateController.getCertificateById);

module.exports = router;