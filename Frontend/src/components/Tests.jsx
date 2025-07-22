import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Target, 
  Users, 
  Award,
  Play,
  BarChart3,
  Calendar,
  Filter,
  Search,
  BookOpen,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Trophy,
  Star,
  ArrowRight,
  Brain,
  Zap,
  Activity,
  PieChart,
  LineChart,
  Medal,
  Flame,
  Loader,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import './Tests.css';
import TestInterface from './TestInterface';

const Tests = ({ onNavigate, currentUser = {} }) => {
  const [activeTab, setActiveTab] = useState('available');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [tests, setTests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingTest, setIsGeneratingTest] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [testAttempts, setTestAttempts] = useState([]);
  
  // Fetch tests from API
  useEffect(() => {
    const fetchTests = async () => {
      try {
        setIsLoading(true);
        
        // Fetch from API
        const response = await fetch('/api/tests', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch tests');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setTests(data.tests);
        } else {
          throw new Error(data.message || 'Failed to fetch tests');
        }
      } catch (error) {
        console.error('Error fetching tests:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    const fetchTestAttempts = async () => {
      try {
        const response = await fetch('/api/tests/attempts/student', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch test attempts');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setTestAttempts(data.testAttempts);
        }
      } catch (error) {
        console.error('Error fetching test attempts:', error);
      }
    };
    
    fetchTests();
    fetchTestAttempts();
  }, []);

  // Calculate performance stats based on test attempts
  const [performanceStats, setPerformanceStats] = useState({
    totalTests: 0,
    averageScore: 0,
    bestScore: 0,
    totalStudyTime: '0h',
    strongSubjects: [],
    weakSubjects: [],
    streak: 0,
    rank: 0,
    improvement: '0%',
    accuracy: 0,
    speed: 0
  });
  
  const [subjectAnalytics, setSubjectAnalytics] = useState([]);
  const [recentPerformance, setRecentPerformance] = useState([]);
  
  // Calculate performance stats when test attempts change
  useEffect(() => {
    if (testAttempts.length > 0) {
      // Calculate average score
      const scores = testAttempts.map(attempt => (attempt.score / attempt.totalQuestions) * 100);
      const averageScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
      const bestScore = Math.round(Math.max(...scores));
      
      // Calculate total study time (in minutes)
      const totalMinutes = testAttempts.reduce((sum, attempt) => sum + (attempt.timeTaken || 0), 0);
      const totalHours = Math.floor(totalMinutes / 60);
      
      // Calculate accuracy and speed
      const accuracy = testAttempts.reduce((sum, attempt) => sum + (attempt.analysis?.accuracy || 0), 0) / testAttempts.length;
      const speed = testAttempts.reduce((sum, attempt) => sum + (attempt.analysis?.speed || 0), 0) / testAttempts.length;
      
      // Group by subject
      const subjectMap = {};
      testAttempts.forEach(attempt => {
        const subject = attempt.testId?.subject || 'General';
        if (!subjectMap[subject]) {
          subjectMap[subject] = {
            subject,
            tests: 0,
            totalScore: 0,
            bestScore: 0
          };
        }
        
        const score = (attempt.score / attempt.totalQuestions) * 100;
        subjectMap[subject].tests += 1;
        subjectMap[subject].totalScore += score;
        subjectMap[subject].bestScore = Math.max(subjectMap[subject].bestScore, score);
      });
      
      // Convert to array and calculate averages
      const subjectAnalyticsData = Object.values(subjectMap).map(subject => ({
        subject: subject.subject,
        tests: subject.tests,
        average: Math.round(subject.totalScore / subject.tests),
        best: Math.round(subject.bestScore),
        trend: Math.random() > 0.5 ? 'up' : 'down',
        color: `bg-${['blue', 'green', 'purple'][Math.floor(Math.random() * 3)]}-500`
      }));
      
      // Sort subjects by average score
      const sortedSubjects = [...subjectAnalyticsData].sort((a, b) => b.average - a.average);
      const strongSubjects = sortedSubjects.slice(0, 2).map(s => s.subject);
      const weakSubjects = sortedSubjects.slice(-2).map(s => s.subject);
      
      // Recent performance
      const recentPerformanceData = testAttempts.slice(0, 4).map(attempt => ({
        test: attempt.testId?.title || 'Test',
        score: Math.round((attempt.score / attempt.totalQuestions) * 100),
        date: new Date(attempt.createdAt).toLocaleDateString(),
        trend: Math.random() > 0.5 ? 'up' : 'down'
      }));
      
      setPerformanceStats({
        totalTests: testAttempts.length,
        averageScore,
        bestScore,
        totalStudyTime: `${totalHours}h`,
        strongSubjects,
        weakSubjects,
        streak: currentUser.streak || 0,
        rank: Math.floor(Math.random() * 1000) + 1,
        improvement: `+${Math.floor(Math.random() * 20)}%`,
        accuracy: Math.round(accuracy),
        speed: Math.round(speed)
      });
      
      setSubjectAnalytics(subjectAnalyticsData);
      setRecentPerformance(recentPerformanceData);
    }
  }, [testAttempts, currentUser]);

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'all' || test.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'difficulty-beginner';
      case 'Intermediate': return 'difficulty-intermediate';
      case 'Advanced': return 'difficulty-advanced';
      default: return 'difficulty-default';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'mock': return 'type-mock';
      case 'chapter': return 'type-chapter';
      case 'quiz': return 'type-quiz';
      case 'subject': return 'type-subject';
      default: return 'type-default';
    }
  };

  // Handle generating more tests
  const handleGenerateMoreTests = async () => {
    try {
      setIsGeneratingTest(true);
      
      // Call API to generate more tests
      const response = await fetch('/api/tests/generate-more', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ count: 2 })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate more tests');
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Refresh tests list
        const testsResponse = await fetch('/api/tests', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (testsResponse.ok) {
          const testsData = await testsResponse.json();
          if (testsData.success) {
            setTests(testsData.tests);
          }
        }
      } else {
        throw new Error(data.message || 'Failed to generate more tests');
      }
    } catch (error) {
      console.error('Error generating more tests:', error);
      setError(error.message);
    } finally {
      setIsGeneratingTest(false);
    }
  };

  const handleTestClose = () => {
    setSelectedTestId(null);
    // Refresh test attempts after completing a test
    const fetchTestAttempts = async () => {
      try {
        const response = await fetch('/api/tests/attempts/student', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch test attempts');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setTestAttempts(data.testAttempts);
        }
      } catch (error) {
        console.error('Error fetching test attempts:', error);
      }
    };
    
    fetchTestAttempts();
  };

  // If a test is selected, show the test interface
  if (selectedTestId) {
    return <TestInterface testId={selectedTestId} onClose={handleTestClose} />;
  }

  // Render completed test card
  const renderCompletedTestCard = (attempt) => {
    const test = attempt.testId;
    return (
      <div key={attempt._id} className="completed-test-card">
        <div className="completed-test-header">
          <div className="completed-test-info">
            <h3 className="completed-test-title">{test.title}</h3>
            <p className="completed-test-date">Completed {new Date(attempt.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="completed-test-score">
            <div className="completed-test-percentage">{Math.round((attempt.score / attempt.totalQuestions) * 100)}%</div>
            <div className="completed-test-marks">{attempt.score}/{attempt.totalQuestions} marks</div>
          </div>
        </div>

        <div className="completed-test-metrics">
          <div className="test-metric time-metric">
            <Clock className="test-metric-icon" />
            <span className="test-metric-label">Time</span>
            <div className="test-metric-value">{Math.floor(attempt.timeTaken / 60)}m {attempt.timeTaken % 60}s</div>
          </div>

          <div className="test-metric accuracy-metric">
            <Target className="test-metric-icon" />
            <span className="test-metric-label">Accuracy</span>
            <div className="test-metric-value">{attempt.analysis?.accuracy || 0}%</div>
          </div>

          <div className="test-metric speed-metric">
            <Zap className="test-metric-icon" />
            <span className="test-metric-label">Speed</span>
            <div className="test-metric-value">{attempt.analysis?.speed || 0}%</div>
          </div>

          <div className="test-metric improve-metric">
            <AlertCircle className="test-metric-icon" />
            <span className="test-metric-label">Areas to Improve</span>
            <div className="test-metric-text">
              {attempt.analysis?.weaknesses?.[0] || 'Not available'}
            </div>
          </div>
        </div>

        <div className="completed-test-analysis">
          <div className="test-strengths">
            <h4 className="test-analysis-title strengths-title">
              <CheckCircle className="test-analysis-icon" />
              <span>Strengths</span>
            </h4>
            <div className="test-analysis-items">
              {attempt.analysis?.strengths ? (
                attempt.analysis.strengths.map((strength, index) => (
                  <div key={index} className="test-analysis-item strength-item">
                    <span className="test-analysis-text">{strength}</span>
                  </div>
                ))
              ) : (
                <div className="test-analysis-item strength-item">
                  <span className="test-analysis-text">Not available</span>
                </div>
              )}
            </div>
          </div>

          <div className="test-weaknesses">
            <h4 className="test-analysis-title weaknesses-title">
              <AlertCircle className="test-analysis-icon" />
              <span>Areas to Improve</span>
            </h4>
            <div className="test-analysis-items">
              {attempt.analysis?.weaknesses ? (
                attempt.analysis.weaknesses.map((weakness, index) => (
                  <div key={index} className="test-analysis-item weakness-item">
                    <span className="test-analysis-text">{weakness}</span>
                  </div>
                ))
              ) : (
                <div className="test-analysis-item weakness-item">
                  <span className="test-analysis-text">Not available</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="completed-test-actions">
          <button className="test-report-btn">
            <BarChart3 className="test-action-icon" />
            <span>View Detailed Report</span>
          </button>
          <button 
            className="test-retake-btn"
            onClick={() => setSelectedTestId(test._id)}
          >
            Retake Test
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="tests-container">
      <div className="tests-header">
        <div className="tests-header-content">
          <div className="tests-header-text">
            <h1 className="tests-title">Test Center</h1>
            <p className="tests-subtitle">
              Practice tests, mock exams, and comprehensive performance analytics
            </p>
          </div>
          <div className="tests-header-stats">
            <div className="tests-stat-card rank">
              <Trophy className="tests-stat-icon" />
              <div className="tests-stat-content">
                <div className="tests-stat-value">#{performanceStats.rank}</div>
                <div className="tests-stat-label">Your Rank</div>
              </div>
            </div>
            <div className="tests-stat-card average">
              <Target className="tests-stat-icon" />
              <div className="tests-stat-content">
                <div className="tests-stat-value">{performanceStats.averageScore}%</div>
                <div className="tests-stat-label">Average Score</div>
              </div>
            </div>
            <div className="tests-stat-card streak">
              <Flame className="tests-stat-icon" />
              <div className="tests-stat-content">
                <div className="tests-stat-value">{performanceStats.streak}</div>
                <div className="tests-stat-label">Day Streak</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tests-tabs">
        {[
          { id: 'available', label: 'Available Tests', icon: Play, count: tests.length || availableTests.length },
          { id: 'completed', label: 'Completed Tests', icon: CheckCircle, count: testAttempts.length },
          { id: 'analytics', label: 'Performance Analytics', icon: BarChart3, count: null }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tests-tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              <Icon className="tests-tab-icon" />
              <span>{tab.label}</span>
              {tab.count && (
                <span className="tests-tab-count">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {activeTab === 'available' && (
        <div className="tests-available">
          {isLoading && (
            <div className="tests-loading">
              <Loader className="tests-loading-spinner" />
              <p>Loading tests...</p>
            </div>
          )}
          
          {error && (
            <div className="tests-error">
              <p>Error loading tests: {error}</p>
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          )}

          <div className="tests-search-section">
            <div className="tests-search-container">
              <button 
                className="tests-generate-btn"
                onClick={handleGenerateMoreTests}
                disabled={isGeneratingTest}
              >
                {isGeneratingTest ? 'Generating...' : 'Generate New Tests'}
              </button>
              <div className="tests-search-wrapper">
                <Search className="tests-search-icon" />
                <input
                  type="text"
                  placeholder="Search tests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="tests-search-input"
                />
              </div>
              
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="tests-filter-select"
              >
                <option value="all">All Subjects</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Biology">Biology</option>
              </select>
            </div>
          </div>

          <div className="tests-grid">
            {filteredTests.map(test => (
              <div key={test.id} className="test-card">
                <div className="test-card-image-container">
                  <img 
                    src={test.image} 
                    alt={test.title}
                    className="test-card-image"
                  />
                  <div className="test-card-badges">
                    <span className={`test-badge ${getTypeColor(test.type)}`}>
                      {test.type.charAt(0).toUpperCase() + test.type.slice(1)}
                    </span>
                    <span className={`test-badge ${getDifficultyColor(test.difficulty)}`}>
                      {test.difficulty}
                    </span>
                  </div>
                  <div className="test-card-rating">
                    <Star className="test-rating-icon" />
                    <span className="test-rating-value">{test.rating}</span>
                  </div>
                </div>

                <div className="test-card-content">
                  <h3 className="test-card-title">{test.title}</h3>
                  <p className="test-card-description">{test.description}</p>

                  {test.isScheduled && (
                    <div className="test-scheduled-info">
                      <Calendar className="test-scheduled-icon" />
                      <span className="test-scheduled-text">Scheduled: {test.scheduledDate}</span>
                    </div>
                  )}

                  <div className="test-card-stats">
                    <div className="test-stat">
                      <Clock className="test-stat-icon" />
                      <span className="test-stat-value">{test.duration}</span>
                      <p className="test-stat-label">Duration</p>
                    </div>
                    <div className="test-stat">
                      <BookOpen className="test-stat-icon" />
                      <span className="test-stat-value">{test.questions}</span>
                      <p className="test-stat-label">Questions</p>
                    </div>
                    <div className="test-stat">
                      <Target className="test-stat-icon" />
                      <span className="test-stat-value">{test.maxMarks}</span>
                      <p className="test-stat-label">Max Marks</p>
                    </div>
                    <div className="test-stat">
                      <Users className="test-stat-icon" />
                      <span className="test-stat-value">{test.participants}</span>
                      <p className="test-stat-label">Participants</p>
                    </div>
                  </div>

                  <div className="test-topics">
                    <p className="test-topics-label">Topics covered:</p>
                    <div className="test-topics-list">
                      {test.topics.map(topic => (
                        <span key={topic} className="test-topic-tag">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    className="test-start-btn"
                    onClick={() => setSelectedTestId(test._id)}
                  >
                    <Play className="test-start-icon" />
                    <span>Start Test</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'completed' && (
        <div className="tests-completed">
          {testAttempts.length > 0 ? (
            testAttempts.map(attempt => renderCompletedTestCard(attempt))
          ) : isLoading ? (
            <div className="tests-loading">
              <Loader className="tests-loading-spinner" />
              <p>Loading test attempts...</p>
            </div>
          ) : (
            <div className="tests-empty-state">
              <Trophy className="tests-empty-icon" />
              <h3 className="tests-empty-title">No completed tests yet</h3>
              <p className="tests-empty-text">Take a test to see your results here</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="tests-analytics">
          <div className="analytics-main">
            <div className="analytics-overview">
              <h2 className="analytics-section-title">Performance Overview</h2>
              
              <div className="analytics-stats-grid">
                <div className="analytics-stat-card">
                  <div className="analytics-stat-icon-wrapper blue">
                    <BookOpen className="analytics-stat-icon" />
                  </div>
                  <div className="analytics-stat-value">{performanceStats.totalTests}</div>
                  <div className="analytics-stat-label">Total Tests</div>
                </div>
                <div className="analytics-stat-card">
                  <div className="analytics-stat-icon-wrapper green">
                    <Target className="analytics-stat-icon" />
                  </div>
                  <div className="analytics-stat-value">{performanceStats.averageScore}%</div>
                  <div className="analytics-stat-label">Average Score</div>
                </div>
                <div className="analytics-stat-card">
                  <div className="analytics-stat-icon-wrapper purple">
                    <Trophy className="analytics-stat-icon" />
                  </div>
                  <div className="analytics-stat-value">{performanceStats.bestScore}%</div>
                  <div className="analytics-stat-label">Best Score</div>
                </div>
                <div className="analytics-stat-card">
                  <div className="analytics-stat-icon-wrapper orange">
                    <Clock className="analytics-stat-icon" />
                  </div>
                  <div className="analytics-stat-value">{performanceStats.totalStudyTime}</div>
                  <div className="analytics-stat-label">Study Time</div>
                </div>
              </div>
            </div>

            <div className="analytics-subjects">
              <h2 className="analytics-section-title">Subject-wise Performance</h2>
              
              <div className="subject-analytics-list">
                {subjectAnalytics.map((subject, index) => (
                  <div key={index} className="subject-analytics-card">
                    <div className="subject-analytics-header">
                      <div className="subject-analytics-name">
                        <div className={`subject-color-indicator ${subject.color}`}></div>
                        <h3 className="subject-name">{subject.subject}</h3>
                      </div>
                      <div className="subject-trend">
                        {subject.trend === 'up' ? (
                          <ChevronUp className="trend-icon up" />
                        ) : (
                          <ChevronDown className="trend-icon down" />
                        )}
                        <span className={`trend-text ${subject.trend === 'up' ? 'up' : 'down'}`}>
                          {subject.trend === 'up' ? 'Improving' : 'Needs Focus'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="subject-analytics-stats">
                      <div className="subject-stat">
                        <div className="subject-stat-value">{subject.tests}</div>
                        <div className="subject-stat-label">Tests Taken</div>
                      </div>
                      <div className="subject-stat">
                        <div className="subject-stat-value">{subject.average}%</div>
                        <div className="subject-stat-label">Average Score</div>
                      </div>
                      <div className="subject-stat">
                        <div className="subject-stat-value">{subject.best}%</div>
                        <div className="subject-stat-label">Best Score</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="analytics-chart">
              <h2 className="analytics-section-title">Recent Performance Trend</h2>
              <div className="chart-placeholder">
                <div className="chart-placeholder-content">
                  <LineChart className="chart-placeholder-icon" />
                  <p className="chart-placeholder-title">Performance trend chart will be displayed here</p>
                  <p className="chart-placeholder-subtitle">Showing improvement over time</p>
                </div>
              </div>
            </div>
          </div>

          <div className="analytics-sidebar">
            <div className="analytics-metrics">
              <h2 className="analytics-sidebar-title">Key Metrics</h2>
              
              <div className="metrics-list">
                <div className="metric-item">
                  <div className="metric-header">
                    <span className="metric-label">Overall Accuracy</span>
                    <span className="metric-value">{performanceStats.accuracy}%</span>
                  </div>
                  <div className="metric-bar">
                    <div className="metric-bar-fill blue" style={{ width: `${performanceStats.accuracy}%` }}></div>
                  </div>
                </div>
                
                <div className="metric-item">
                  <div className="metric-header">
                    <span className="metric-label">Speed Index</span>
                    <span className="metric-value">{performanceStats.speed}%</span>
                  </div>
                  <div className="metric-bar">
                    <div className="metric-bar-fill green" style={{ width: `${performanceStats.speed}%` }}></div>
                  </div>
                </div>
                
                <div className="metric-item">
                  <div className="metric-header">
                    <span className="metric-label">Consistency</span>
                    <span className="metric-value">85%</span>
                  </div>
                  <div className="metric-bar">
                    <div className="metric-bar-fill purple" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="analytics-recent">
              <h2 className="analytics-sidebar-title">Recent Performance</h2>
              
              <div className="recent-performance-list">
                {recentPerformance.map((test, index) => (
                  <div key={index} className="recent-performance-item">
                    <div className="recent-performance-info">
                      <p className="recent-performance-name">{test.test}</p>
                      <p className="recent-performance-date">{test.date}</p>
                    </div>
                    <div className="recent-performance-score">
                      <span className="recent-score-value">{test.score}%</span>
                      {test.trend === 'up' ? (
                        <ChevronUp className="recent-trend-icon up" />
                      ) : (
                        <ChevronDown className="recent-trend-icon down" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="analytics-recommendations">
              <h2 className="analytics-sidebar-title">AI Recommendations</h2>
              
              <div className="recommendations-list">
                <div className="recommendation-item focus">
                  <div className="recommendation-header">
                    <Brain className="recommendation-icon" />
                    <h3 className="recommendation-title">Focus Area</h3>
                  </div>
                  <p className="recommendation-text">Spend more time on Chemistry organic reactions. Your accuracy here is 15% below average.</p>
                </div>
                
                <div className="recommendation-item strength">
                  <div className="recommendation-header">
                    <Medal className="recommendation-icon" />
                    <h3 className="recommendation-title">Strength</h3>
                  </div>
                  <p className="recommendation-text">Excellent progress in Physics! You're in the top 10% for mechanics problems.</p>
                </div>
                
                <div className="recommendation-item practice">
                  <div className="recommendation-header">
                    <Activity className="recommendation-icon" />
                    <h3 className="recommendation-title">Practice Suggestion</h3>
                  </div>
                  <p className="recommendation-text">Take more full-length mock tests to improve your time management skills.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tests;