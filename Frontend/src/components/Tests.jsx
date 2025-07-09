import React, { useState } from 'react';
import { BarChart3, Clock, Target, TrendingUp, Award, Calendar, Filter, Play } from 'lucide-react';
import './Tests.css';

export const Tests = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const recentTests = [
    {
      id: 1,
      title: 'Physics - Electromagnetic Induction',
      type: 'Chapter Quiz',
      score: 85,
      totalQuestions: 20,
      correctAnswers: 17,
      timeSpent: '15 min',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Chemistry - Organic Reactions',
      type: 'Subject Test',
      score: 92,
      totalQuestions: 30,
      correctAnswers: 28,
      timeSpent: '25 min',
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: 3,
      title: 'JEE Main Mock Test - 3',
      type: 'Full Test',
      score: 78,
      totalQuestions: 90,
      correctAnswers: 70,
      timeSpent: '180 min',
      date: '2024-01-13',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Mathematics - Calculus',
      type: 'Chapter Quiz',
      score: 0,
      totalQuestions: 15,
      correctAnswers: 0,
      timeSpent: '0 min',
      date: '2024-01-12',
      status: 'pending'
    }
  ];

  const performanceData = [
    { subject: 'Physics', score: 85, tests: 12, improvement: '+5%' },
    { subject: 'Chemistry', score: 92, tests: 8, improvement: '+12%' },
    { subject: 'Mathematics', score: 78, tests: 15, improvement: '-2%' },
    { subject: 'Biology', score: 88, tests: 6, improvement: '+8%' }
  ];

  const upcomingTests = [
    {
      id: 1,
      title: 'NEET Biology Mock Test',
      type: 'Full Test',
      duration: '180 min',
      questions: 90,
      scheduledDate: '2024-01-20',
      difficulty: 'Advanced'
    },
    {
      id: 2,
      title: 'Chemistry - Thermodynamics',
      type: 'Chapter Quiz',
      duration: '30 min',
      questions: 25,
      scheduledDate: '2024-01-18',
      difficulty: 'Intermediate'
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return 'tests-score-green';
    if (score >= 75) return 'tests-score-blue';
    if (score >= 60) return 'tests-score-yellow';
    return 'tests-score-red';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'tests-score-bg-green';
    if (score >= 75) return 'tests-score-bg-blue';
    if (score >= 60) return 'tests-score-bg-yellow';
    return 'tests-score-bg-red';
  };

  return (
    <div className="tests-root">
      {/* Header */}
      <div className="tests-header">
        <div>
          <h1 className="tests-title">Tests & Analytics</h1>
          <p className="tests-desc">Track your progress and identify areas for improvement</p>
        </div>
        <div className="tests-header-actions">
          <button className="tests-filter-btn">
            <Filter size={20} className="mr-2" />
            Filter
          </button>
          <button className="tests-taketest-btn">
            <Play size={20} className="mr-2" />
            Take Test
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tests-tabs">
        {['overview', 'recent', 'upcoming', 'analytics'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tests-tab-btn${activeTab === tab ? ' active' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="tests-overview">
          {/* Stats Cards */}
          <div className="tests-stats-grid">
            <div className="tests-stat-card">
              <div className="tests-stat-card-row">
                <div>
                  <p className="tests-stat-label">Tests Taken</p>
                  <p className="tests-stat-value">47</p>
                  <p className="tests-stat-caption tests-stat-caption-green">+5 this week</p>
                </div>
                <div className="tests-stat-icon tests-stat-icon-blue">
                  <BarChart3 className="w-6 h-6" />
                </div>
              </div>
            </div>
            <div className="tests-stat-card">
              <div className="tests-stat-card-row">
                <div>
                  <p className="tests-stat-label">Average Score</p>
                  <p className="tests-stat-value">84%</p>
                  <p className="tests-stat-caption tests-stat-caption-green">+3% improvement</p>
                </div>
                <div className="tests-stat-icon tests-stat-icon-green">
                  <Target className="w-6 h-6" />
                </div>
              </div>
            </div>
            <div className="tests-stat-card">
              <div className="tests-stat-card-row">
                <div>
                  <p className="tests-stat-label">Study Time</p>
                  <p className="tests-stat-value">28h</p>
                  <p className="tests-stat-caption tests-stat-caption-blue">This month</p>
                </div>
                <div className="tests-stat-icon tests-stat-icon-purple">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
            </div>
            <div className="tests-stat-card">
              <div className="tests-stat-card-row">
                <div>
                  <p className="tests-stat-label">Rank</p>
                  <p className="tests-stat-value">#127</p>
                  <p className="tests-stat-caption tests-stat-caption-green">Top 5%</p>
                </div>
                <div className="tests-stat-icon tests-stat-icon-orange">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Subject Performance */}
          <div className="tests-section-card">
            <div className="tests-section-header">
              <h2>Subject Performance</h2>
            </div>
            <div className="tests-section-body">
              <div className="tests-subjects-grid">
                {performanceData.map((subject, index) => (
                  <div key={index} className="tests-subject-card">
                    <h3>{subject.subject}</h3>
                    <div className="tests-subject-score-row">
                      <span className={`tests-subject-score ${getScoreColor(subject.score)}`}>
                        {subject.score}%
                      </span>
                      <span className={`tests-subject-improvement ${subject.improvement.startsWith('+') ? 'tests-score-green' : 'tests-score-red'}`}>
                        {subject.improvement}
                      </span>
                    </div>
                    <p className="tests-subject-caption">{subject.tests} tests taken</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Tests */}
          <div className="tests-section-card">
            <div className="tests-section-header">
              <h2>Recent Tests</h2>
            </div>
            <div className="tests-section-body">
              <div className="tests-recent-list">
                {recentTests.slice(0, 3).map(test => (
                  <div key={test.id} className="tests-recent-row">
                    <div>
                      <h3>{test.title}</h3>
                      <p>{test.type} • {test.date}</p>
                    </div>
                    <div className="tests-recent-score">
                      {test.status === 'completed' ? (
                        <>
                          <div className={`tests-recent-score-badge ${getScoreBgColor(test.score)} ${getScoreColor(test.score)}`}>
                            {test.score}%
                          </div>
                          <p>{test.correctAnswers}/{test.totalQuestions} correct</p>
                        </>
                      ) : (
                        <span className="tests-recent-score-badge tests-score-bg-yellow tests-score-yellow">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Tests Tab */}
      {activeTab === 'recent' && (
        <div className="tests-section-card">
          <div className="tests-section-header">
            <h2>Recent Tests</h2>
          </div>
          <div className="tests-section-body">
            <div className="tests-recent-list">
              {recentTests.map(test => (
                <div key={test.id} className="tests-recent-row tests-recent-row-full">
                  <div>
                    <h3>{test.title}</h3>
                    <p>{test.type}</p>
                    <div className="tests-recent-meta">
                      <span>{test.totalQuestions} questions</span>
                      <span>{test.timeSpent}</span>
                      <span>{test.date}</span>
                    </div>
                  </div>
                  <div className="tests-recent-score">
                    {test.status === 'completed' ? (
                      <>
                        <div className={`tests-recent-score-badge ${getScoreBgColor(test.score)} ${getScoreColor(test.score)}`}>
                          {test.score}%
                        </div>
                        <p>{test.correctAnswers}/{test.totalQuestions} correct</p>
                        <button className="tests-link">View Details</button>
                      </>
                    ) : (
                      <div>
                        <span className="tests-recent-score-badge tests-score-bg-yellow tests-score-yellow">
                          Pending
                        </span>
                        <br />
                        <button className="tests-btn-blue tests-btn-small">
                          Start Test
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Tests Tab */}
      {activeTab === 'upcoming' && (
        <div className="tests-section-card">
          <div className="tests-section-header">
            <h2>Upcoming Tests</h2>
          </div>
          <div className="tests-section-body">
            <div className="tests-recent-list">
              {upcomingTests.map(test => (
                <div key={test.id} className="tests-recent-row tests-recent-row-full">
                  <div>
                    <h3>{test.title}</h3>
                    <p>{test.type}</p>
                    <div className="tests-recent-meta">
                      <span><Calendar size={14} className="mr-1" />{test.scheduledDate}</span>
                      <span><Clock size={14} className="mr-1" />{test.duration}</span>
                      <span>{test.questions} questions</span>
                    </div>
                  </div>
                  <div className="tests-recent-score">
                    <span className={`tests-recent-score-badge ${
                      test.difficulty === 'Advanced' ? 'tests-score-bg-red tests-score-red' :
                      test.difficulty === 'Intermediate' ? 'tests-score-bg-yellow tests-score-yellow' :
                      'tests-score-bg-green tests-score-green'
                    }`}>
                      {test.difficulty}
                    </span>
                    <br />
                    <button className="tests-btn-blue tests-btn-small">
                      Schedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="tests-overview">
          <div className="tests-section-card">
            <div className="tests-section-header">
              <h2>Detailed Analytics</h2>
            </div>
            <div className="tests-section-body">
              <div className="tests-analytics-grid">
                <div className="tests-analytics-chart">
                  <TrendingUp size={48} className="tests-analytics-chart-icon" />
                  <h3>Performance Trend</h3>
                  <p>Chart showing your progress over time</p>
                </div>
                <div className="tests-analytics-subjects">
                  <h3>Subject-wise Analysis</h3>
                  <div className="tests-analytics-subject-list">
                    {performanceData.map((subject, index) => (
                      <div key={index} className="tests-analytics-subject-row">
                        <span>{subject.subject}</span>
                        <div className="tests-analytics-bar-wrap">
                          <div className="tests-analytics-bar-bg">
                            <div 
                              className="tests-analytics-bar-fill" 
                              style={{ width: `${subject.score}%` }}
                            />
                          </div>
                          <span>{subject.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
