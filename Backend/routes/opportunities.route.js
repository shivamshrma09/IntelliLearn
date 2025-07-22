const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/student.middleware");
const Opportunity = require("../models/opportunity.models");
const Student = require("../models/student.models");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API
const GOOGLE_API_KEY = "AIzaSyB2G1eKOy_4iwK8oiBVzsvkS9kjT20L0-U";
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Get opportunities
router.get("/", authenticateToken, async (req, res) => {
  try {
    const studentId = req.student.id;
    const student = await Student.findById(studentId);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }
    
    const course = student.course || "General";
    
    // Check if we already have opportunities for this course
    let opportunities = await Opportunity.find({ course });
    
    // Always generate some new opportunities on each visit, but keep old ones too
    // Extract skills from student's batches
    const skills = student.batches
      .flatMap(batch => batch.chapters?.map(chapter => chapter.title) || [])
      .join(', ');
    
    // Generate new opportunities using Gemini (fewer items if we already have some)
    const itemsToGenerate = opportunities.length > 0 ? 5 : 40;
    const newOpportunities = await generateOpportunities(course, skills, itemsToGenerate);
    
    // Save new opportunities to database
    if (newOpportunities && newOpportunities.length > 0) {
      await Opportunity.insertMany(newOpportunities);
      
      // Fetch all opportunities again, including both old and new
      opportunities = await Opportunity.find({ course });
    }
    
    res.status(200).json({
      success: true,
      opportunities
    });
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Generate opportunities using Gemini API
async function generateOpportunities(course, skills, count = 40) {
  try {
    const prompt = `
I am a student studying ${course} with skills in: ${skills}.
Please generate a list of ${count} relevant job opportunities, internships, and scholarships in JSON format.

Each opportunity should follow this structure:
{
  "title": "Opportunity Title",
  "company": "Company Name",
  "location": "Location (can be Remote)",
  "type": "Internship/Job/Scholarship/Research",
  "deadline": "YYYY-MM-DD",
  "description": "Detailed description of the opportunity",
  "requirements": ["Requirement 1", "Requirement 2", "Requirement 3"],
  "tags": ["Tag1", "Tag2", "Tag3"],
  "url": "https://link.to/apply",
  "postedDate": "YYYY-MM-DD"
}

All opportunities must be:
- Relevant to ${course} and my skills
- Realistic with actual company names
- Include a mix of internships, jobs, and scholarships
- Have realistic requirements
- Include real application URLs when possible

Return ONLY a valid JSON array of opportunities.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    
    // Parse JSON from response
    let jsonMatch = text.match(/\[\s*\{.*\}\s*\]/s);
    if (jsonMatch) {
      const jsonText = jsonMatch[0];
      const opportunities = JSON.parse(jsonText);
      
      // Add course to each opportunity
      return opportunities.map(opportunity => ({
        ...opportunity,
        course
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error generating opportunities:', error);
    return [];
  }
}

// Generate more opportunities
router.post("/generate", authenticateToken, async (req, res) => {
  try {
    const studentId = req.student.id;
    const student = await Student.findById(studentId);
    const { count = 5 } = req.body;
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }
    
    const course = student.course || "General";
    
    // Extract skills from student's batches
    const skills = student.batches
      .flatMap(batch => batch.chapters?.map(chapter => chapter.title) || [])
      .join(', ');
    
    // Generate new opportunities
    const newOpportunities = await generateOpportunities(course, skills, count);
    
    // Save new opportunities to database
    if (newOpportunities && newOpportunities.length > 0) {
      await Opportunity.insertMany(newOpportunities);
      
      // Return the new opportunities
      res.status(200).json({
        success: true,
        message: `Generated ${newOpportunities.length} new opportunities`,
        opportunities: newOpportunities
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to generate new opportunities"
      });
    }
  } catch (error) {
    console.error('Error generating opportunities:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;