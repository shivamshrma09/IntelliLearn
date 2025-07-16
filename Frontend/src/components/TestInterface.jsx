import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Flag, ChevronLeft, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import './TestInterface.css';

export const TestInterface = ({ onBack, testData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(testData.duration * 60); // in seconds
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);

  // Sample questions data
  const questions = [
    {
      id: 1,
      question: "A particle moves in a straight line with constant acceleration. If it covers 100m in the first 10 seconds and 150m in the next 10 seconds, what is its acceleration?",
      options: [
        "2.5 m/s²",
        "5.0 m/s²",
        "7.5 m/s²",
        "10.0 m/s²"
      ],
      correct: 0,
      subject: "Physics",
      topic: "Kinematics"
    },
    {
      id: 2,
      question: "Which of the following is the correct expression for the work done by a variable force?",
      options: [
        "W = F × d",
        "W = ∫ F⃗ · dr⃗",
        "W = F × d × cos θ",
        "W = ½mv²"
      ],
      correct: 1,
      subject: "Physics",
      topic: "Work and Energy"
    },
    {
      id: 3,
      question: "The efficiency of a Carnot engine operating between temperatures T₁ and T₂ (T₁ > T₂) is:",
      options: [
        "1 - T₂/T₁",
        "1 - T₁/T₂",
        "T₁/T₂",
        "T₂/T₁"
      ],
      correct: 0,
      subject: "Physics",
      topic: "Thermodynamics"
    },
    {
      id: 4,
      question: "In Young's double slit experiment, the fringe width is given by:",
      options: [
        "λD/d",
        "λd/D",
        "Dd/λ",
        "D/(λd)"
      ],
      correct: 0,
      subject: "Physics",
      topic: "Wave Optics"
    },
    {
      id: 5,
      question: "The de Broglie wavelength of a particle is inversely proportional to:",
      options: [
        "Its mass",
        "Its velocity",
        "Its momentum",
        "Its energy"
      ],
      correct: 2,
      subject: "Physics",
      topic: "Modern Physics"
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !testSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmitTest();
    }
  }, [timeLeft, testSubmitted]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex.toString()
    });
  };

  const handleFlagQuestion = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestion)) {
      newFlagged.delete(currentQuestion);
    } else {
      newFlagged.add(currentQuestion);
    }
    setFlaggedQuestions(newFlagged);
  };

  const handleSubmitTest = () => {
    setTestSubmitted(true);
    setShowSubmitModal(false);
  };

  const getQuestionStatus = (index) => {
    if (answers[index] !== undefined) return 'answered';
    if (flaggedQuestions.has(index)) return 'flagged';
    return 'not-attempted';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'answered': return 'testnav-answered';
      case 'flagged': return 'testnav-flagged';
      case 'current': return 'testnav-current';
      default: return 'testnav-notattempted';
    }
  };

  if (testSubmitted) {
    const score = questions.reduce((acc, question, index) => {
      return acc + (answers[index] === question.correct.toString() ? 1 : 0);
    }, 0);
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="test-bg-center">
        <div className="test-result-card">
          <div className="test-result-icon">
            <CheckCircle size={64} />
          </div>
          <h1>Test Submitted Successfully!</h1>
          <p>Your responses have been recorded and evaluated.</p>
          <div className="test-result-score-row">
            <div>
              <div className="test-result-score">{score}/{questions.length}</div>
              <div className="test-result-label">Questions Correct</div>
            </div>
            <div>
              <div className="test-result-percent">{percentage}%</div>
              <div className="test-result-label">Score</div>
            </div>
          </div>
          <div className="test-result-actions">
            <button className="test-btn-primary">
              View Detailed Analysis
            </button>
            <button 
              onClick={onBack}
              className="test-btn-secondary"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="test-root">
      {/* Header */}
      <div className="test-header">
        <div className="test-header-inner">
          <div className="test-header-left">
            <button 
              onClick={onBack}
              className="test-header-backbtn"
            >
              <ArrowLeft size={20} />
            </button>
            <h1>{testData.title}</h1>
          </div>
          <div className="test-header-right">
            <div className="test-header-timer">
              <Clock size={20} />
              <span>{formatTime(timeLeft)}</span>
            </div>
            <button 
              onClick={() => setShowSubmitModal(true)}
              className="test-btn-green"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>

      <div className="test-content">
        <div className="test-content-grid">
          {/* Question Panel */}
          <div className="test-question-panel">
            <div className="test-question-card">
              <div className="test-question-header">
                <div>
                  <h2>Question {currentQuestion + 1} of {questions.length}</h2>
                  <p>{questions[currentQuestion].subject} • {questions[currentQuestion].topic}</p>
                </div>
                <button
                  onClick={handleFlagQuestion}
                  className={`test-flag-btn${flaggedQuestions.has(currentQuestion) ? ' flagged' : ''}`}
                >
                  <Flag size={16} />
                  <span>{flaggedQuestions.has(currentQuestion) ? 'Flagged' : 'Flag'}</span>
                </button>
              </div>

              <div className="test-question-text">
                {questions[currentQuestion].question}
              </div>

              <div className="test-options">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`test-option-btn${answers[currentQuestion] === index.toString() ? ' selected' : ''}`}
                  >
                    <div className="test-option-radio">
                      {answers[currentQuestion] === index.toString() && <div className="test-option-dot"></div>}
                    </div>
                    <span>{String.fromCharCode(65 + index)}. {option}</span>
                  </button>
                ))}
              </div>

              <div className="test-question-footer">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="test-btn-secondary"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>
                <div className="test-question-actions">
                  <button className="test-btn-gray">
                    Clear Response
                  </button>
                  <button className="test-btn-blue">
                    Mark for Review
                  </button>
                </div>
                <button
                  onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                  disabled={currentQuestion === questions.length - 1}
                  className="test-btn-primary"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Question Navigator */}
          <div className="test-nav-panel">
            <div className="test-nav-card">
              <h3>Question Navigator</h3>
              <div className="test-nav-grid">
                {questions.map((_, index) => {
                  const status = index === currentQuestion ? 'current' : getQuestionStatus(index);
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`test-nav-btn ${getStatusColor(status)}`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
              <div className="test-nav-legend">
                <div><span className="testnav-answered"></span> Answered ({Object.keys(answers).length})</div>
                <div><span className="testnav-flagged"></span> Flagged ({flaggedQuestions.size})</div>
                <div><span className="testnav-notattempted"></span> Not Attempted ({questions.length - Object.keys(answers).length})</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="test-modal-bg">
          <div className="test-modal">
            <div className="test-modal-header">
              <AlertCircle size={24} className="test-modal-icon" />
              <h2>Submit Test</h2>
            </div>
            <p>
              Are you sure you want to submit the test? You have answered {Object.keys(answers).length} out of {questions.length} questions.
            </p>
            <div className="test-modal-actions">
              <button 
                onClick={() => setShowSubmitModal(false)}
                className="test-btn-secondary"
              >
                Continue Test
              </button>
              <button 
                onClick={handleSubmitTest}
                className="test-btn-green"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};