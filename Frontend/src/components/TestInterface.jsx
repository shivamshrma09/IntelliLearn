import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag,
  CheckCircle,
  AlertCircle,
  Save,
  ArrowLeft,
  Send
} from 'lucide-react';
import './TestInterface.css';

const TestInterface = ({ testId, onClose }) => {
  const [test, setTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(null);

  // Fetch test data
  useEffect(() => {
    const fetchTest = async () => {
      try {
        setIsLoading(true);
        
        const response = await fetch(`/api/tests/${testId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch test');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setTest(data.test);
          // Initialize answers array
          setAnswers(data.test.questions.map(() => ({ 
            questionIndex: 0,
            selectedOption: -1,
            timeTaken: 0
          })));
          // Set timer based on test duration
          setTimeRemaining(data.test.duration * 60); // convert minutes to seconds
          setStartTime(Date.now());
          setQuestionStartTime(Date.now());
        } else {
          throw new Error(data.message || 'Failed to fetch test');
        }
      } catch (error) {
        console.error('Error fetching test:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTest();
  }, [testId]);

  // Timer effect
  useEffect(() => {
    if (!test || timeRemaining <= 0) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [test, timeRemaining]);

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optionIndex) => {
    const now = Date.now();
    const timeTaken = Math.round((now - questionStartTime) / 1000);
    
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = {
        questionIndex: currentQuestionIndex,
        selectedOption: optionIndex,
        timeTaken
      };
      return newAnswers;
    });
    
    // Reset question timer for next question
    setQuestionStartTime(now);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setQuestionStartTime(Date.now());
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setQuestionStartTime(Date.now());
    }
  };

  const handleSubmitTest = async () => {
    try {
      setIsSubmitting(true);
      
      // Calculate total time taken
      const totalTimeTaken = Math.round((Date.now() - startTime) / 1000);
      
      // Filter out unanswered questions
      const answeredQuestions = answers.filter(answer => answer.selectedOption !== -1);
      
      const response = await fetch(`/api/tests/${testId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          answers: answeredQuestions,
          timeTaken: totalTimeTaken
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit test');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setTestResult(data.testAttempt);
      } else {
        throw new Error(data.message || 'Failed to submit test');
      }
    } catch (error) {
      console.error('Error submitting test:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="test-interface-container">
        <div className="test-interface-loading">
          <div className="test-interface-loading-spinner"></div>
          <p>Loading test...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="test-interface-container">
        <div className="test-interface-error">
          <AlertCircle className="test-interface-error-icon" />
          <p>Error: {error}</p>
          <button onClick={onClose} className="test-interface-back-btn">
            <ArrowLeft className="test-interface-back-icon" />
            <span>Back to Tests</span>
          </button>
        </div>
      </div>
    );
  }

  if (testResult) {
    return (
      <div className="test-interface-container">
        <div className="test-result-container">
          <div className="test-result-header">
            <h2 className="test-result-title">Test Completed</h2>
            <div className="test-result-score">
              <span className="test-result-score-value">{testResult.score}/{testResult.totalQuestions}</span>
              <span className="test-result-score-percent">
                ({Math.round((testResult.score / testResult.totalQuestions) * 100)}%)
              </span>
            </div>
          </div>
          
          <div className="test-result-metrics">
            <div className="test-result-metric">
              <Clock className="test-result-metric-icon" />
              <span className="test-result-metric-label">Time Taken</span>
              <span className="test-result-metric-value">{formatTime(testResult.timeTaken)}</span>
            </div>
            
            <div className="test-result-metric">
              <CheckCircle className="test-result-metric-icon" />
              <span className="test-result-metric-label">Accuracy</span>
              <span className="test-result-metric-value">{testResult.analysis.accuracy}%</span>
            </div>
            
            <div className="test-result-metric">
              <Flag className="test-result-metric-icon" />
              <span className="test-result-metric-label">Speed</span>
              <span className="test-result-metric-value">{testResult.analysis.speed}%</span>
            </div>
          </div>
          
          <div className="test-result-analysis">
            <div className="test-result-strengths">
              <h3 className="test-result-section-title">Strengths</h3>
              <ul className="test-result-list">
                {testResult.analysis.strengths.map((strength, index) => (
                  <li key={index} className="test-result-list-item strength">
                    <CheckCircle className="test-result-list-icon" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="test-result-weaknesses">
              <h3 className="test-result-section-title">Areas to Improve</h3>
              <ul className="test-result-list">
                {testResult.analysis.weaknesses.map((weakness, index) => (
                  <li key={index} className="test-result-list-item weakness">
                    <AlertCircle className="test-result-list-icon" />
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="test-result-recommendations">
            <h3 className="test-result-section-title">Recommendations</h3>
            <ul className="test-result-list">
              {testResult.analysis.recommendations.map((recommendation, index) => (
                <li key={index} className="test-result-list-item recommendation">
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="test-result-actions">
            <button onClick={onClose} className="test-result-close-btn">
              Return to Tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!test) return null;

  const currentQuestion = test.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === test.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const currentAnswer = answers[currentQuestionIndex];
  const answeredCount = answers.filter(a => a.selectedOption !== -1).length;

  return (
    <div className="test-interface-container">
      <div className="test-interface-header">
        <div className="test-interface-title">
          <h2>{test.title}</h2>
          <p>{test.subject} - {test.topic}</p>
        </div>
        
        <div className="test-interface-timer">
          <Clock className="test-interface-timer-icon" />
          <span className="test-interface-timer-value">{formatTime(timeRemaining)}</span>
        </div>
      </div>
      
      <div className="test-interface-progress">
        <div className="test-interface-progress-text">
          Question {currentQuestionIndex + 1} of {test.questions.length}
        </div>
        <div className="test-interface-progress-bar">
          <div 
            className="test-interface-progress-fill"
            style={{ width: `${((currentQuestionIndex + 1) / test.questions.length) * 100}%` }}
          ></div>
        </div>
        <div className="test-interface-progress-stats">
          <span className="test-interface-answered">
            {answeredCount} Answered
          </span>
          <span className="test-interface-unanswered">
            {test.questions.length - answeredCount} Remaining
          </span>
        </div>
      </div>
      
      <div className="test-interface-question-container">
        <div className="test-interface-question">
          <h3 className="test-interface-question-text">
            {currentQuestionIndex + 1}. {currentQuestion.question}
          </h3>
          
          <div className="test-interface-options">
            {currentQuestion.options.map((option, index) => (
              <div 
                key={index}
                className={`test-interface-option ${currentAnswer.selectedOption === index ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(index)}
              >
                <div className="test-interface-option-marker">
                  {String.fromCharCode(65 + index)}
                </div>
                <div className="test-interface-option-text">
                  {option}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="test-interface-actions">
        <button 
          className="test-interface-prev-btn"
          onClick={handlePrevQuestion}
          disabled={isFirstQuestion}
        >
          <ChevronLeft className="test-interface-action-icon" />
          <span>Previous</span>
        </button>
        
        {isLastQuestion ? (
          <button 
            className="test-interface-submit-btn"
            onClick={handleSubmitTest}
            disabled={isSubmitting}
          >
            <Send className="test-interface-action-icon" />
            <span>{isSubmitting ? 'Submitting...' : 'Submit Test'}</span>
          </button>
        ) : (
          <button 
            className="test-interface-next-btn"
            onClick={handleNextQuestion}
          >
            <span>Next</span>
            <ChevronRight className="test-interface-action-icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TestInterface;