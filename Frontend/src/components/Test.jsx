import React, { useState, useEffect } from "react";
import { Zap, XCircle } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./Test.css";

// Your API key for Gemini (Keep this secure in env variables for production)
const GOOGLE_API_KEY = "AIzaSyC5wCrEK1HSLGpnbOZ0vVqsBl83QuR-VJI";

// Gemini model setup
const getGeminiModel = (modelName = "gemini-1.5-flash") => {
  const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
  return genAI.getGenerativeModel({ model: modelName });
};

const Test = () => {
  // Core form state
  const [showBatchCreation, setShowBatchCreation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newLanguage, setNewLanguage] = useState("English");
  const [newDuration, setNewDuration] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newSyllabusText, setNewSyllabusText] = useState("");

  // State to store all generated test series
  const [allTestSeries, setAllTestSeries] = useState([]);

  // State for current selected test series and active test
  const [selectedTestSeries, setSelectedTestSeries] = useState(null);
  const [activeTest, setActiveTest] = useState(null);

  // Test question navigation and selection state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // FIXED: Initialize testResults ensuring it is always an array
  const [testResults, setTestResults] = useState(() => {
    try {
      const storedResults = localStorage.getItem("testResults");
      const parsed = storedResults ? JSON.parse(storedResults) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to parse test results from localStorage:", error);
      return [];
    }
  });

  // Load allTestSeries from localStorage once on mount
  useEffect(() => {
    const storedTestSeries = localStorage.getItem("allTestSeries");
    try {
      const parsedSeries = storedTestSeries ? JSON.parse(storedTestSeries) : [];
      setAllTestSeries(Array.isArray(parsedSeries) ? parsedSeries : []);
    } catch (error) {
      console.error("Error parsing all test series from local storage:", error);
      setAllTestSeries([]);
    }
  }, []);

  // Form submission handler for generating new test series via Gemini API
  const handleBatchFormSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const prompt = `
You are an expert world best educator. Create a highly detailed, accurate, and comprehensive learning Test series from basic to advance for:
Subject: ${newSubject}
Language: ${newLanguage}
Syllabus/Detail: ${newSyllabusText || newDescription}
Description: ${newDescription}

The test series should contain exactly:
- 3 basic tests
- 3 mid-level tests
- 4 advanced tests

Each test must include multiple questions based on the SBA (Single Best Answer) format. For each question:
- Provide 4 options labeled (A, B, C, D)
- Each test should contain 8 questions
- Specify the correct answer

Answer strictly in JSON like this format (example):

{
  "Testname": "string",
  "description": "string",
  "tests": [
    {
      "title": "Basic Test 1",
      "level": "Basic",
      "questions": [
        {
          "question": "string",
          "options": {
            "A": "string",
            "B": "string",
            "C": "string",
            "D": "string"
          },
          "correctAnswer": "A"
        }
      ]
    }
  ]
}

Return ONLY strict JSON, no extra text outside JSON.
`;

    try {
      const model = getGeminiModel();
      const result = await model.generateContent(prompt);
      const rawText = result.response.text();

      if (!rawText.trim()) {
        throw new Error("Gemini API returned empty response!");
      }

      // Remove any code block markers
      const cleanedResponse = rawText.replace(/``````/g, "").trim();
      const cleanedResponse2 = cleanedResponse.replace(/```json\n?|\n?```/g, '').trim();
      const generatedPlan = JSON.parse(cleanedResponse2);

      const newTestSeries = {
        id: Date.now(),
        ...generatedPlan,
        subject: newSubject,
        createdAt: new Date().toISOString(),
      };

      setAllTestSeries((prev) => {
        const updated = [...prev, newTestSeries];
        localStorage.setItem("allTestSeries", JSON.stringify(updated));
        return updated;
      });

      alert("Test series generated successfully!");

      // Reset fields
      setNewTitle("");
      setNewSubject("");
      setNewLanguage("English");
      setNewDuration("");
      setNewDescription("");
      setNewSyllabusText("");
      setShowBatchCreation(false);
    } catch (error) {
      console.error("Error generating test series:", error.message);
      alert("Failed to generate test series. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Select test series
  const handleSelectTestSeries = (series) => {
    setSelectedTestSeries(series);
    setActiveTest(null);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
  };

  // Start specific test inside series
  const handleStartTest = (index) => {
    if (selectedTestSeries && selectedTestSeries.tests[index]) {
      setActiveTest(selectedTestSeries.tests[index]);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setShowResult(false);
      setScore(0);
    }
  };

  // Option select
  const handleOptionSelect = (option) => {
    if (showResult) return;
    setSelectedOption(option);
  };

  // Submit answer and check correctness
  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setShowResult(true);
    if (selectedOption === activeTest.questions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  // Go to next question or finish test
  const handleNextQuestion = () => {
    if (!showResult) return;

    const questionsLength = activeTest.questions.length;

    if (currentQuestionIndex < questionsLength - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      // Save test result on finish
      const testResult = {
        testSeriesId: selectedTestSeries.id,
        testName: selectedTestSeries.Testname,
        testTitle: activeTest.title,
        level: activeTest.level,
        score,
        totalQuestions: questionsLength,
        dateCompleted: new Date().toISOString(),
      };

      setTestResults((prev) => {
        const updated = [...prev, testResult];
        localStorage.setItem("testResults", JSON.stringify(updated));
        return updated;
      });

      alert(`Test Completed! Your score: ${score}/${questionsLength}`);
      setActiveTest(null);
      setScore(0);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  // Skip current question
  const handleSkipQuestion = () => {
    const questionsLength = activeTest.questions.length;

    if (currentQuestionIndex < questionsLength - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      // Finish test after skip last question
      const testResult = {
        testSeriesId: selectedTestSeries.id,
        testName: selectedTestSeries.Testname,
        testTitle: activeTest.title,
        level: activeTest.level,
        score,
        totalQuestions: questionsLength,
        dateCompleted: new Date().toISOString(),
      };

      setTestResults((prev) => {
        const updated = [...prev, testResult];
        localStorage.setItem("testResults", JSON.stringify(updated));
        return updated;
      });

      alert(`Test Completed (last question skipped)! Your score: ${score}/${questionsLength}`);
      setActiveTest(null);
      setScore(0);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  // Render active test interface
  const renderTestInterface = () => {
    if (!activeTest) return null;
    const currentQuestion = activeTest.questions[currentQuestionIndex];
    const optionLabels = ["A", "B", "C", "D"];

    return (
      <div className="test-interface-card">
        <div className="test-info-header">
          <button className="back-button" onClick={() => setActiveTest(null)}>
            &larr; Back to Test Selection
          </button>
          <div className="test-series-name">{selectedTestSeries.Testname}</div>
          <div className="test-title">
            {activeTest.title} - Question {currentQuestionIndex + 1} of {activeTest.questions.length}
          </div>
        </div>

        <div className="question-text">{currentQuestion.question}</div>

        <div className="options-container">
          {optionLabels.map((ch) => (
            <label
              key={ch}
              htmlFor={"option-" + ch}
              className={`option-label ${
                selectedOption === ch ? "selected" : ""
              } ${
                showResult && ch === currentQuestion.correctAnswer ? "correct-answer" : ""
              } ${
                showResult && selectedOption === ch && selectedOption !== currentQuestion.correctAnswer ? "wrong-answer" : ""
              }`}
            >
              <input
                type="radio"
                name="option"
                id={"option-" + ch}
                value={ch}
                checked={selectedOption === ch}
                onChange={() => handleOptionSelect(ch)}
                disabled={showResult}
              />
              <span>
                <b>{ch}.</b> {currentQuestion.options[ch]}
              </span>
            </label>
          ))}
        </div>

        {showResult && (
          <div className={`result-feedback ${selectedOption === currentQuestion.correctAnswer ? "correct" : "wrong"}`}>
            {selectedOption === currentQuestion.correctAnswer ? "Correct Answer!" : (
              <>
                Wrong Answer. Correct:{" "}
                <span className="correct-answer-display">{currentQuestion.correctAnswer}</span>
              </>
            )}
          </div>
        )}

        <div className="action-buttons-container">
          <button
            onClick={handleSkipQuestion}
            disabled={showResult && currentQuestionIndex === activeTest.questions.length - 1} // disable skip last question after submit
            className="btn-skip"
          >
            Skip
          </button>
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedOption === null || showResult}
            className="btn-submit"
          >
            Submit
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={!showResult}
            className="btn-next"
          >
            {currentQuestionIndex === activeTest.questions.length - 1 ? "Finish Test" : "Next"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="mybatch-root">
      {/* Batch Creation Modal */}
      {showBatchCreation && (
        <div className="pw-modal-overlay">
          <div className="pw-modal-content">
            <button className="close-modal-btn" onClick={() => setShowBatchCreation(false)}>
              <XCircle size={24} />
            </button>
            <h2>Create a New Test Series</h2>
            <form onSubmit={handleBatchFormSubmit} className="pw-batch-form">
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Test Series Title (e.g., 'Physics Fundamentals') *"
                required
              />
              <input
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Subject (e.g., 'Physics') *"
                required
              />
              <input
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="Language (e.g., 'English') *"
                required
              />
              <input
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                type="number"
                min="1"
                placeholder="Duration (hrs, optional)"
              />
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Brief Description (e.g., 'Comprehensive tests covering core physics concepts.')"
              />
              <textarea
                value={newSyllabusText}
                onChange={(e) => setNewSyllabusText(e.target.value)}
                placeholder="Enter detailed syllabus topics (e.g., 'Newtonian Mechanics, Thermodynamics, Electromagnetism, Quantum Physics')"
              />
              <div className="form-actions">
                <button type="submit" disabled={loading} className="pw-btn pw-btn-primary">
                  {loading ? "Generating..." : "Generate Test Series"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mybatch-header">
        <div>
          <h1 className="mybatch-title">My Learning Tests</h1>
          <p className="mybatch-subtitle">Create and manage your AI-powered test series</p>
        </div>
        <button onClick={() => setShowBatchCreation(true)} className="mybatch-btn mybatch-btn-create">
          <Zap size={18} /> Generate New AI Test Series
        </button>
      </div>

      {/* Test Series List */}
      {!selectedTestSeries && !activeTest && (
        <>
          <h2 className="section-heading">Available Test Series</h2>
          {allTestSeries.length === 0 && (
            <p className="no-tests-message">No test series generated yet. Click "Generate New AI Test Series" to create one!</p>
          )}
          <div className="test-series-grid">
            {allTestSeries.map((series) => (
              <div key={series.id} className="test-series-card" onClick={() => handleSelectTestSeries(series)}>
                <div className="card-icon">
                  <Zap size={28} color="#0070f3" />
                </div>
                <h3 className="card-title">{series.Testname}</h3>
                <p className="card-description">{series.description}</p>
                <div className="card-meta">
                  <span>Subject: {series.subject || "N/A"}</span>
                  <span>Tests: {series.tests ? series.tests.length : 0}</span>
                </div>
                <button className="card-button">Select Test Series &rarr;</button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Test Selection */}
      {selectedTestSeries && !activeTest && (
        <div className="test-selection-interface">
          <button className="back-button" onClick={() => setSelectedTestSeries(null)}>
            &larr; Back to All Test Series
          </button>
          <h2 className="section-heading">{selectedTestSeries.Testname}</h2>
          <p className="section-description">{selectedTestSeries.description}</p>
          <h3 className="sub-section-heading">Choose a Test to Start</h3>
          <div className="test-level-buttons">
            {selectedTestSeries.tests && selectedTestSeries.tests.map((test, idx) => (
              <button key={idx} onClick={() => handleStartTest(idx)} className="test-level-btn">
                {test.title} ({test.questions.length} Questions)
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Test Interface */}
      {activeTest && renderTestInterface()}

      {/* Test Results */}
      <div className="test-results-section">
        <h2 className="section-heading">Your Test Results</h2>
        {testResults.length === 0 ? (
          <p className="no-results-message">No test results yet. Complete a test to see your performance here!</p>
        ) : (
          <div className="results-grid">
            {testResults.map((result, idx) => (
              <div key={idx} className="result-card">
                <h3 className="result-card-title">{result.testName} - {result.testTitle}</h3>
                <p>Score: {result.score} / {result.totalQuestions}</p>
                <p>Date: {new Date(result.dateCompleted).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;

































