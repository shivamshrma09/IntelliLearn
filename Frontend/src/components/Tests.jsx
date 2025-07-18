import React, { useState } from 'react';
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
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import './Tests.css';

const Tests = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('available');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');

  const availableTests = [
    {
      id: 1,
      title: 'JEE Main Physics Mock Test #3',
      type: 'mock',
      subject: 'Physics',
      duration: '3 hours',
      questions: 75,
      maxMarks: 300,
      difficulty: 'Advanced',
      participants: 12847,
      rating: 4.8,
      topics: ['Mechanics', 'Thermodynamics', 'Optics', 'Modern Physics'],
      scheduledDate: 'Tomorrow, 10:00 AM',
      isScheduled: true,
      description: 'Comprehensive physics mock test covering all JEE Main topics',
      image: 'https://images.pexels.com/photos/159832/science-formula-physics-school-159832.jpeg?auto=compress&cs=tinysrgb&w=400&h=200'
    },
    {
      id: 2,
      title: 'NEET Biology Chapter Test - Genetics',
      type: 'chapter',
      subject: 'Biology',
      duration: '1 hour',
      questions: 45,
      maxMarks: 180,
      difficulty: 'Intermediate',
      participants: 8934,
      rating: 4.7,
      topics: ['Heredity', 'Molecular Genetics', 'Evolution'],
      scheduledDate: null,
      isScheduled: false,
      description: 'Chapter-wise test focusing on genetics and heredity',
      image: 'https://images.pexels.com/photos/1242348/pexels-photo-1242348.jpeg?auto=compress&cs=tinysrgb&w=400&h=200'
    },
    {
      id: 3,
      title: 'Chemistry Organic Reactions Quiz',
      type: 'quiz',
      subject: 'Chemistry',
      duration: '30 minutes',
      questions: 25,
      maxMarks: 100,
      difficulty: 'Beginner',
      participants: 5621,
      rating: 4.5,
      topics: ['Organic Reactions', 'Mechanisms', 'Functional Groups'],
      scheduledDate: null,
      isScheduled: false,
      description: 'Quick quiz on organic chemistry reactions and mechanisms',
      image: 'https://images.pexels.com/photos/1366909/pexels-photo-1366909.jpeg?auto=compress&cs=tinysrgb&w=400&h=200'
    },
    {
      id: 4,
      title: 'Mathematics Calculus Full Length Test',
      type: 'subject',
      subject: 'Mathematics',
      duration: '2.5 hours',
      questions: 60,
      maxMarks: 240,
      difficulty: 'Advanced',
      participants: 9876,
      rating: 4.9,
      topics: ['Limits', 'Derivatives', 'Integration', 'Applications'],
      scheduledDate: 'Dec 30, 2:00 PM',
      isScheduled: true,
      description: 'Complete calculus test with application problems',
      image: 'https://images.pexels.com/photos/1496154/pexels-photo-1496154.jpeg?auto=compress&cs=tinysrgb&w=400&h=200'
    }
  ];

  const completedTests = [
    {
      id: 5,
      title: 'JEE Main Physics Mock Test #2',
      type: 'mock',
      subject: 'Physics',
      score: 245,
      maxMarks: 300,
      percentage: 82,
      rank: 1247,
      totalParticipants: 15432,
      timeTaken: '2h 45m',
      completedDate: '2 days ago',
      strengths: ['Mechanics', 'Waves'],
      weaknesses: ['Modern Physics', 'Thermodynamics'],
      accuracy: 85,
      speed: 78
    },
    {
      id: 6,
      title: 'NEET Chemistry Chapter Test - Coordination',
      type: 'chapter',
      subject: 'Chemistry',
      score: 156,
      maxMarks: 180,
      percentage: 87,
      rank: 234,
      totalParticipants: 8934,
      timeTaken: '55m',
      completedDate: '5 days ago',
      strengths: ['Coordination Compounds', 'Isomerism'],
      weaknesses: ['Crystal Field Theory'],
      accuracy: 90,
      speed: 82
    },
    {
      id: 7,
      title: 'Mathematics Algebra Test',
      type: 'subject',
      subject: 'Mathematics',
      score: 168,
      maxMarks: 200,
      percentage: 84,
      rank: 567,
      totalParticipants: 12000,
      timeTaken: '1h 30m',
      completedDate: '1 week ago',
      strengths: ['Quadratic Equations', 'Sequences'],
      weaknesses: ['Complex Numbers'],
      accuracy: 88,
      speed: 85
    }
  ];

  const performanceStats = {
    totalTests: 23,
    averageScore: 78,
    bestScore: 95,
    totalStudyTime: '145h',
    strongSubjects: ['Physics', 'Mathematics'],
    weakSubjects: ['Chemistry'],
    streak: 7,
    rank: 342,
    improvement: '+12%',
    accuracy: 82,
    speed: 76
  };

  const subjectAnalytics = [
    { subject: 'Physics', tests: 8, average: 85, best: 95, trend: 'up', color: 'bg-blue-500' },
    { subject: 'Chemistry', tests: 6, average: 72, best: 84, trend: 'up', color: 'bg-green-500' },
    { subject: 'Mathematics', tests: 9, average: 78, best: 92, trend: 'down', color: 'bg-purple-500' }
  ];

  const recentPerformance = [
    { test: 'Physics Mock #3', score: 92, date: '2 days ago', trend: 'up' },
    { test: 'Chemistry Quiz', score: 78, date: '4 days ago', trend: 'up' },
    { test: 'Math Test', score: 85, date: '1 week ago', trend: 'down' },
    { test: 'Biology Chapter', score: 88, date: '1 week ago', trend: 'up' }
  ];

  const filteredTests = availableTests.filter(test => {
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
          { id: 'available', label: 'Available Tests', icon: Play, count: availableTests.length },
          { id: 'completed', label: 'Completed Tests', icon: CheckCircle, count: completedTests.length },
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
          <div className="tests-search-section">
            <div className="tests-search-container">
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

                  <button className="test-start-btn">
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
          {completedTests.map(test => (
            <div key={test.id} className="completed-test-card">
              <div className="completed-test-header">
                <div className="completed-test-info">
                  <h3 className="completed-test-title">{test.title}</h3>
                  <p className="completed-test-date">Completed {test.completedDate}</p>
                </div>
                <div className="completed-test-score">
                  <div className="completed-test-percentage">{test.percentage}%</div>
                  <div className="completed-test-marks">{test.score}/{test.maxMarks} marks</div>
                </div>
              </div>

              <div className="completed-test-metrics">
                <div className="test-metric rank-metric">
                  <Trophy className="test-metric-icon" />
                  <span className="test-metric-label">Rank</span>
                  <div className="test-metric-value">#{test.rank}</div>
                  <div className="test-metric-sub">of {test.totalParticipants}</div>
                </div>

                <div className="test-metric time-metric">
                  <Clock className="test-metric-icon" />
                  <span className="test-metric-label">Time</span>
                  <div className="test-metric-value">{test.timeTaken}</div>
                </div>

                <div className="test-metric accuracy-metric">
                  <Target className="test-metric-icon" />
                  <span className="test-metric-label">Accuracy</span>
                  <div className="test-metric-value">{test.accuracy}%</div>
                </div>

                <div className="test-metric speed-metric">
                  <Zap className="test-metric-icon" />
                  <span className="test-metric-label">Speed</span>
                  <div className="test-metric-value">{test.speed}%</div>
                </div>

                <div className="test-metric improve-metric">
                  <AlertCircle className="test-metric-icon" />
                  <span className="test-metric-label">Areas to Improve</span>
                  <div className="test-metric-text">
                    {test.weaknesses.slice(0, 1).join(', ')}
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
                    {test.strengths.map((strength, index) => (
                      <div key={index} className="test-analysis-item strength-item">
                        <span className="test-analysis-text">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="test-weaknesses">
                  <h4 className="test-analysis-title weaknesses-title">
                    <AlertCircle className="test-analysis-icon" />
                    <span>Areas to Improve</span>
                  </h4>
                  <div className="test-analysis-items">
                    {test.weaknesses.map((weakness, index) => (
                      <div key={index} className="test-analysis-item weakness-item">
                        <span className="test-analysis-text">{weakness}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="completed-test-actions">
                <button className="test-report-btn">
                  <BarChart3 className="test-action-icon" />
                  <span>View Detailed Report</span>
                </button>
                <button className="test-retake-btn">
                  Retake Test
                </button>
              </div>
            </div>
          ))}
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
