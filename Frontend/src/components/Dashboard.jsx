// Dashboard.jsx
import React, { useState } from 'react';
import './Dashboard.css';
import { BookOpen, Trophy, Clock, TrendingUp, Users, Award, Plus, Play, Target, Brain, Zap, Calendar, ChevronRight, Star, BarChart3, FileText, Video, Headphones, Download, Share2 } from 'lucide-react';

export const Dashboard = ({ onContinueLearning, onStartTest }) => {
  const [showCreateTest, setShowCreateTest] = useState(false);
  const [showCreateBatch, setShowCreateBatch] = useState(false);

  const stats = [
    {
      label: 'Active Courses',
      value: '12',
      icon: BookOpen,
      colorClass: 'stat-icon-blue',
      change: '+3 this week',
      trend: 'up'
    },
    {
      label: 'Tests Completed',
      value: '47',
      icon: Trophy,
      colorClass: 'stat-icon-green',
      change: '+8 this week',
      trend: 'up'
    },
    {
      label: 'Study Hours',
      value: '156',
      icon: Clock,
      colorClass: 'stat-icon-purple',
      change: '+24 this week',
      trend: 'up'
    },
    {
      label: 'Current Streak',
      value: '12 days',
      icon: Zap,
      colorClass: 'stat-icon-orange',
      change: 'Personal best!',
      trend: 'up'
    },
    {
      label: 'Average Score',
      value: '87%',
      icon: Target,
      colorClass: 'stat-icon-indigo',
      change: '+5% this month',
      trend: 'up'
    },
    {
      label: 'Rank',
      value: '#127',
      icon: Award,
      colorClass: 'stat-icon-pink',
      change: 'Top 5%',
      trend: 'up'
    }
  ];

  const recentActivity = [
    { 
      type: 'completed', 
      title: 'Completed Physics Chapter: Electromagnetic Induction', 
      time: '2 hours ago',
      points: '+50 points',
      icon: BookOpen,
      colorClass: 'activity-icon-green'
    },
    { 
      type: 'quiz', 
      title: 'Scored 94% in Chemistry Quiz: Organic Reactions', 
      time: '4 hours ago',
      points: '+75 points',
      icon: Trophy,
      colorClass: 'activity-icon-blue'
    },
    { 
      type: 'certificate', 
      title: 'Earned Mathematics Mastery Certificate', 
      time: '1 day ago',
      points: '+200 points',
      icon: Award,
      colorClass: 'activity-icon-yellow'
    },
    { 
      type: 'streak', 
      title: 'Achieved 12-day study streak milestone', 
      time: '2 days ago',
      points: '+100 points',
      icon: Zap,
      colorClass: 'activity-icon-orange'
    },
    { 
      type: 'batch', 
      title: 'Started new batch: Advanced Calculus', 
      time: '3 days ago',
      points: '+25 points',
      icon: Play,
      colorClass: 'activity-icon-purple'
    }
  ];

  const continueLearning = [
    {
      id: 1,
      title: 'JEE Main 2024 Physics',
      subject: 'Physics',
      progress: 68,
      nextChapter: 'Electromagnetic Induction - Part 2',
      timeLeft: '45 min',
      difficulty: 'Advanced',
      instructor: 'Dr. Amit Sharma',
      thumbnail: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      title: 'NEET Chemistry Complete',
      subject: 'Chemistry',
      progress: 45,
      nextChapter: 'Organic Chemistry Basics',
      timeLeft: '60 min',
      difficulty: 'Intermediate',
      instructor: 'Prof. Priya Patel',
      thumbnail: 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      title: 'Mathematics Foundation',
      subject: 'Mathematics',
      progress: 82,
      nextChapter: 'Differential Equations',
      timeLeft: '30 min',
      difficulty: 'Advanced',
      instructor: 'Dr. Suresh Kumar',
      thumbnail: 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const upcomingTests = [
    {
      id: 1,
      title: 'Physics Mock Test - Waves & Optics',
      date: 'Today, 6:00 PM',
      duration: '3 hours',
      questions: 90,
      type: 'Mock Test'
    },
    {
      id: 2,
      title: 'Chemistry Chapter Test - Thermodynamics',
      date: 'Tomorrow, 4:00 PM',
      duration: '1 hour',
      questions: 30,
      type: 'Chapter Test'
    },
    {
      id: 3,
      title: 'Mathematics Weekly Assessment',
      date: 'Jan 20, 2:00 PM',
      duration: '2 hours',
      questions: 60,
      type: 'Weekly Test'
    }
  ];

  const quickActions = [
    {
      title: 'Create Test',
      description: 'Design custom tests for practice',
      icon: Plus,
      colorClass: 'action-icon-blue',
      action: () => setShowCreateTest(true)
    },
    {
      title: 'Create Batch',
      description: 'Build personalized learning paths',
      icon: BookOpen,
      colorClass: 'action-icon-green',
      action: () => setShowCreateBatch(true)
    },
    {
      title: 'AI Tutor',
      description: 'Get instant doubt resolution',
      icon: Brain,
      colorClass: 'action-icon-purple',
      action: () => {}
    },
    {
      title: 'Study Planner',
      description: 'Organize your study schedule',
      icon: Calendar,
      colorClass: 'action-icon-orange',
      action: () => {}
    }
  ];

  const achievements = [
    { title: 'First Steps', icon: BookOpen, unlocked: true },
    { title: 'Quiz Master', icon: Trophy, unlocked: true },
    { title: 'Streak Warrior', icon: Zap, unlocked: true },
    { title: 'Chapter Champion', icon: Star, unlocked: false },
  ];

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-bg-overlay-top-right"></div>
        <div className="welcome-bg-overlay-bottom-left"></div>
        <div className="welcome-content">
          <div className="welcome-header-group">
            <div>
              <h1 className="welcome-title">Welcome back, Rahul! 🎯</h1>
              <p className="welcome-subtitle">Ready to continue your learning journey? You're making excellent progress!</p>
              <div className="welcome-badges">
                <div className="welcome-badge">
                  <Award className="welcome-badge-icon" />
                  <span className="welcome-badge-text">Level 15 Achiever</span>
                </div>
                <div className="welcome-badge">
                  <Users className="welcome-badge-icon" />
                  <span className="welcome-badge-text">Top 3% Learner</span>
                </div>
                <div className="welcome-badge">
                  <Zap className="welcome-badge-icon" />
                  <span className="welcome-badge-text">12-Day Streak</span>
                </div>
              </div>
            </div>
            <div className="total-points-display">
              <div className="total-points-value">3,250</div>
              <div className="total-points-label">Total Points</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <div className={`stat-icon-wrapper ${stat.colorClass}`}>
                  <Icon className="stat-icon" />
                </div>
                <div className="stat-value">{stat.value}</div>
              </div>
              <div className="stat-footer">
                <p className="stat-label">{stat.label}</p>
                <p className="stat-change">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="quick-action-button"
              >
                <div className={`quick-action-icon-wrapper ${action.colorClass}`}>
                  <Icon className="quick-action-icon" />
                </div>
                <h3 className="quick-action-title">{action.title}</h3>
                <p className="quick-action-description">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="main-content-grid">
        {/* Continue Learning */}
        <div className="continue-learning-section">
          <div className="card-header">
            <h2 className="section-title">Continue Learning</h2>
            <button className="view-all-button">View All</button>
          </div>
          <div className="card-body">
            <div className="learning-course-list">
              {continueLearning.map(course => (
                <div key={course.id} className="learning-course-card">
                  <div className="learning-course-content">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="learning-course-thumbnail"
                    />
                    <div className="learning-course-details">
                      <div className="learning-course-info-top">
                        <div>
                          <h3 className="learning-course-title">{course.title}</h3>
                          <p className="learning-course-instructor">{course.instructor}</p>
                        </div>
                        <span className={`difficulty-tag ${
                          course.difficulty === 'Advanced' ? 'difficulty-advanced' :
                          course.difficulty === 'Intermediate' ? 'difficulty-intermediate' :
                          'difficulty-easy'
                        }`}>
                          {course.difficulty}
                        </span>
                      </div>
                      
                      <div className="learning-course-progress-container">
                        <div className="learning-course-progress-header">
                          <span className="learning-course-progress-label">Progress</span>
                          <span className="learning-course-progress-value">{course.progress}%</span>
                        </div>
                        <div className="progress-bar-background">
                          <div 
                            className="progress-bar-fill"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="learning-course-actions">
                        <div>
                          <p className="learning-course-next-chapter">Next: {course.nextChapter}</p>
                          <p className="learning-course-time-left">{course.timeLeft} remaining</p>
                        </div>
                        <button className="continue-button">
                          <Play size={16} />
                          <span>Continue</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar-sections">
          {/* Upcoming Tests */}
          <div className="upcoming-tests-section">
            <div className="card-header">
              <h2 className="section-title-small">Upcoming Tests</h2>
            </div>
            <div className="card-body">
              <div className="test-list">
                {upcomingTests.map(test => (
                  <div key={test.id} className="test-card">
                    <h3 className="test-title">{test.title}</h3>
                    <div className="test-details">
                      <div className="test-detail-item">
                        <Calendar size={14} className="test-detail-icon" />
                        <span>{test.date}</span>
                      </div>
                      <div className="test-detail-item">
                        <Clock size={14} className="test-detail-icon" />
                        <span>{test.duration} • {test.questions} questions</span>
                      </div>
                    </div>
                    <button className="start-test-button">
                      Start Test
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="recent-achievements-section">
            <div className="card-header">
              <h2 className="section-title-small">Recent Achievements</h2>
            </div>
            <div className="card-body">
              <div className="achievements-list">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className={`achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`}>
                      <div className={`achievement-icon-wrapper ${achievement.unlocked ? 'unlocked-icon-bg' : 'locked-icon-bg'}`}>
                        <Icon className={`achievement-item-icon ${achievement.unlocked ? 'unlocked-icon' : 'locked-icon'}`} />
                      </div>
                      <span className={`achievement-title ${achievement.unlocked ? 'unlocked-text' : 'locked-text'}`}>
                        {achievement.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity-section">
        <div className="card-header">
          <h2 className="section-title">Recent Activity</h2>
        </div>
        <div className="card-body">
          <div className="activity-list">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="activity-item">
                  <div className={`activity-icon-wrapper ${activity.colorClass}`}>
                    <Icon className="activity-icon" />
                  </div>
                  <div className="activity-details">
                    <p className="activity-title">{activity.title}</p>
                    <div className="activity-meta">
                      <p className="activity-time">{activity.time}</p>
                      <span className="activity-points">{activity.points}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Create Test Modal */}
      {showCreateTest && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Create Custom Test</h2>
              <button 
                onClick={() => setShowCreateTest(false)}
                className="modal-close-button"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Test Title</label>
                <input
                  type="text"
                  placeholder="Enter test title"
                  className="form-input"
                />
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select className="form-select">
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Mathematics</option>
                    <option>Biology</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Difficulty</label>
                  <select className="form-select">
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Number of Questions</label>
                  <input
                    type="number"
                    placeholder="30"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Duration (minutes)</label>
                  <input
                    type="number"
                    placeholder="60"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Topics (Select multiple)</label>
                <div className="topics-grid">
                  {['Mechanics', 'Thermodynamics', 'Optics', 'Electromagnetism', 'Modern Physics', 'Waves'].map(topic => (
                    <label key={topic} className="checkbox-label">
                      <input type="checkbox" className="checkbox-input" />
                      <span className="checkbox-text">{topic}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  onClick={() => setShowCreateTest(false)}
                  className="button-secondary"
                >
                  Cancel
                </button>
                <button className="button-primary">
                  Create Test
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Batch Modal */}
      {showCreateBatch && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Create Custom Batch</h2>
              <button 
                onClick={() => setShowCreateBatch(false)}
                className="modal-close-button"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Batch Name</label>
                <input
                  type="text"
                  placeholder="My Custom JEE Physics Batch"
                  className="form-input"
                />
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select className="form-select">
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Mathematics</option>
                    <option>Biology</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Target Exam</label>
                  <select className="form-select">
                    <option>JEE Main</option>
                    <option>JEE Advanced</option>
                    <option>NEET</option>
                    <option>UPSC</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Upload Syllabus (Optional)</label>
                <div className="file-upload-area">
                  <FileText className="file-upload-icon" />
                  <p className="file-upload-text">Drag and drop your syllabus PDF here</p>
                  <button className="file-upload-browse-button">
                    Or click to browse files
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Learning Goals</label>
                <textarea
                  rows={4}
                  placeholder="Describe what you want to learn in this batch..."
                  className="form-textarea"
                />
              </div>

              <div className="modal-actions">
                <button 
                  onClick={() => setShowCreateBatch(false)}
                  className="button-secondary"
                >
                  Cancel
                </button>
                <button className="button-primary">
                  Create Batch
                </button>
              </div>
            </div>
          </div>
        </div>
      )} 
    </div>
  );
};