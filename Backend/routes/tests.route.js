const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/student.middleware");
const Test = require("../models/Test.models.js");
const TestAttempt = require("../models/testAttempt.models.js");
const Student = require("../models/student.models");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API
const GOOGLE_API_KEY = "AIzaSyB2G1eKOy_4iwK8oiBVzsvkS9kjT20L0-U";
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Generate more tests
router.post("/generate-more", authenticateToken, async (req, res) => {
  try {
    const studentId = req.student.id;
    const student = await Student.findById(studentId);
    const { count = 2 } = req.body;
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }
    
    const course = student.course || "General";
    
    // Extract topics from student's batches
    const topics = student.batches
      .flatMap(batch => batch.chapters?.map(chapter => chapter.title) || [])
      .join(', ');
    
    // Generate new tests
    const newTests = await generateTests(course, topics, count);
    
    // Save new tests to database
    if (newTests && newTests.length > 0) {
      await Test.insertMany(newTests);
      
      // Return success
      res.status(200).json({
        success: true,
        message: `Generated ${newTests.length} new tests`,
        tests: newTests
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to generate new tests"
      });
    }
  } catch (error) {
    console.error('Error generating more tests:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Generate more questions for a specific test
router.post("/:testId/generate-more", authenticateToken, async (req, res) => {
  try {
    const { testId } = req.params;
    const { count = 5 } = req.body;
    
    // Find the test
    const test = await Test.findById(testId);
    
    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found"
      });
    }
    
    // Generate more questions using Gemini
    const newQuestions = await generateMoreQuestions(test, count);
    
    if (newQuestions && newQuestions.length > 0) {
      // Add new questions to the test
      test.questions = [...test.questions, ...newQuestions];
      test.totalQuestions = test.questions.length;
      
      await test.save();
      
      res.status(200).json({
        success: true,
        message: `Added ${newQuestions.length} new questions`,
        test
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to generate new questions"
      });
    }
  } catch (error) {
    console.error('Error generating more questions:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get tests
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
    
    // Check if we already have tests for this course
    let tests = await Test.find({ course });
    
    // Always generate some new tests on each visit, but keep old ones too
    // Extract topics from student's batches
    const topics = student.batches
      .flatMap(batch => batch.chapters?.map(chapter => chapter.title) || [])
      .join(', ');
    
    // Generate new tests using Gemini (fewer items if we already have some)
    const testsToGenerate = tests.length > 0 ? 2 : 20;
    const newTests = await generateTests(course, topics, testsToGenerate);
    
    // Save new tests to database
    if (newTests && newTests.length > 0) {
      await Test.insertMany(newTests);
      
      // Fetch all tests again, including both old and new
      tests = await Test.find({ course });
    }
    
    // Remove full questions from response to reduce payload size
    const testsWithLimitedQuestions = tests.map(test => {
      const testObj = test.toObject();
      testObj.questions = testObj.questions.slice(0, 2); // Only include first 2 questions as preview
      return testObj;
    });
    
    res.status(200).json({
      success: true,
      tests: testsWithLimitedQuestions
    });
  } catch (error) {
    console.error('Error fetching tests:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get a specific test by ID
router.get("/:testId", authenticateToken, async (req, res) => {
  try {
    const { testId } = req.params;
    
    // Find the test
    const test = await Test.findById(testId);
    
    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found"
      });
    }
    
    res.status(200).json({
      success: true,
      test
    });
  } catch (error) {
    console.error('Error fetching test:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Submit test answers and get analysis
router.post("/:testId/submit", authenticateToken, async (req, res) => {
  try {
    const { testId } = req.params;
    const { answers, timeTaken } = req.body;
    const studentId = req.student.id;
    
    // Find the test
    const test = await Test.findById(testId);
    
    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found"
      });
    }
    
    // Calculate score and prepare answers array
    let score = 0;
    const answersWithCorrectness = answers.map((answer, index) => {
      const isCorrect = answer.selectedOption === test.questions[answer.questionIndex].correct;
      if (isCorrect) score++;
      
      return {
        questionIndex: answer.questionIndex,
        selectedOption: answer.selectedOption,
        isCorrect,
        timeTaken: answer.timeTaken
      };
    });
    
    // Generate analysis using Gemini
    const analysis = await generateTestAnalysis(test, answersWithCorrectness, score);
    
    // Create test attempt record
    const testAttempt = new TestAttempt({
      testId,
      studentId,
      score,
      totalQuestions: test.questions.length,
      timeTaken,
      answers: answersWithCorrectness,
      completed: true,
      analysis
    });
    
    await testAttempt.save();
    
    res.status(200).json({
      success: true,
      testAttempt
    });
  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get test attempts for a student
router.get("/attempts/student", authenticateToken, async (req, res) => {
  try {
    const studentId = req.student.id;
    
    // Find all test attempts for this student
    const testAttempts = await TestAttempt.find({ studentId })
      .populate('testId', 'title subject topic difficulty')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      testAttempts
    });
  } catch (error) {
    console.error('Error fetching test attempts:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Generate tests using Gemini API
async function generateTests(course, topics, count = 20) {
  try {
    const prompt = `
I am a student studying ${course} with knowledge in: ${topics}.
Please generate a list of ${count} comprehensive tests with questions in JSON format.

Each test should follow this structure:
{
  "title": "Test Title",
  "subject": "${course}",
  "topic": "Specific Topic",
  "duration": 30,
  "totalQuestions": 15,
  "difficulty": "Easy/Medium/Hard",
  "description": "Description of what the test covers",
  "questions": [
    {
      "question": "Question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct": 0,
      "explanation": "Explanation of the correct answer",
      "topic": "Specific subtopic within the test topic",
      "difficulty": "Easy/Medium/Hard",
      "category": "Conceptual/Numerical/Application"
    }
  ]
}

For each test:
- Create 15 questions with 4 options each
- Ensure questions are relevant to ${course} and the topics I mentioned
- Include a mix of easy, medium, and hard questions
- Provide detailed explanations for correct answers
- Cover different topics within ${course}
- For each question, specify the subtopic, difficulty level, and category
- Make sure the questions are challenging and educational

Return ONLY a valid JSON array of tests.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    
    // Parse JSON from response
    let jsonMatch = text.match(/\[\s*\{.*\}\s*\]/s);
    if (jsonMatch) {
      const jsonText = jsonMatch[0];
      const tests = JSON.parse(jsonText);
      
      // Add course to each test
      return tests.map(test => ({
        ...test,
        course
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error generating tests:', error);
    return [];
  }
}

// Generate more questions for a test using Gemini API
async function generateMoreQuestions(test, count) {
  try {
    const prompt = `
I need ${count} additional questions for a test on "${test.title}" about ${test.subject}, specifically covering ${test.topic}.

The questions should match the following structure:
{
  "question": "Question text?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct": 0,
  "explanation": "Explanation of the correct answer",
  "topic": "Specific subtopic within ${test.topic}",
  "difficulty": "${test.difficulty}",
  "category": "Conceptual/Numerical/Application"
}

Please ensure:
- Questions are challenging and educational
- Each question has 4 options with only one correct answer
- The correct answer is indicated by its index (0-3)
- A detailed explanation is provided for each correct answer
- Questions cover different aspects of ${test.topic}
- Questions match the difficulty level of the test (${test.difficulty})

Return ONLY a valid JSON array of questions.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    
    // Parse JSON from response
    let jsonMatch = text.match(/\[\s*\{.*\}\s*\]/s);
    if (jsonMatch) {
      const jsonText = jsonMatch[0];
      return JSON.parse(jsonText);
    }
    
    return [];
  } catch (error) {
    console.error('Error generating more questions:', error);
    return [];
  }
}

// Generate test analysis using Gemini API
async function generateTestAnalysis(test, answers, score) {
  try {
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const totalQuestions = answers.length;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Calculate average time per question
    const totalTimeTaken = answers.reduce((sum, answer) => sum + (answer.timeTaken || 0), 0);
    const avgTimePerQuestion = totalTimeTaken / totalQuestions;
    
    // Group questions by topic
    const topicPerformance = {};
    answers.forEach((answer, index) => {
      const question = test.questions[answer.questionIndex];
      const topic = question.topic || test.topic;
      
      if (!topicPerformance[topic]) {
        topicPerformance[topic] = { correct: 0, total: 0 };
      }
      
      topicPerformance[topic].total++;
      if (answer.isCorrect) {
        topicPerformance[topic].correct++;
      }
    });
    
    // Format topic performance for Gemini
    const topicPerformanceText = Object.entries(topicPerformance)
      .map(([topic, data]) => {
        const percentage = Math.round((data.correct / data.total) * 100);
        return `${topic}: ${percentage}% (${data.correct}/${data.total} correct)`;
      })
      .join('\n');
    
    const prompt = `
Analyze this test performance and provide insights:

Test: ${test.title}
Subject: ${test.subject}
Topic: ${test.topic}
Difficulty: ${test.difficulty}

Score: ${score}/${totalQuestions} (${Math.round((score/totalQuestions)*100)}%)
Accuracy: ${accuracy}%
Average time per question: ${Math.round(avgTimePerQuestion)} seconds

Performance by topic:
${topicPerformanceText}

Based on this data, please provide:
1. Three specific strengths (topics or question types the student did well on)
2. Three specific weaknesses (topics or question types the student struggled with)
3. An accuracy percentage (0-100)
4. A speed rating percentage (0-100) based on time taken per question
5. Three specific recommendations for improvement

Return ONLY a valid JSON object with this structure:
{
  "strengths": ["strength1", "strength2", "strength3"],
  "weaknesses": ["weakness1", "weakness2", "weakness3"],
  "accuracy": 85,
  "speed": 75,
  "recommendations": ["recommendation1", "recommendation2", "recommendation3"]
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    
    // Parse JSON from response
    let jsonMatch = text.match(/\{[\s\S]*\}/s);
    if (jsonMatch) {
      const jsonText = jsonMatch[0];
      return JSON.parse(jsonText);
    }
    
    // Fallback if JSON parsing fails
    return {
      strengths: ["Good overall performance"],
      weaknesses: ["Need more practice"],
      accuracy: accuracy,
      speed: Math.min(100, Math.max(0, 100 - (avgTimePerQuestion / 2))),
      recommendations: ["Continue practicing regularly"]
    };
  } catch (error) {
    console.error('Error generating test analysis:', error);
    return {
      strengths: ["Data not available"],
      weaknesses: ["Data not available"],
      accuracy: 0,
      speed: 0,
      recommendations: ["Try more practice tests"]
    };
  }
}

module.exports = router;