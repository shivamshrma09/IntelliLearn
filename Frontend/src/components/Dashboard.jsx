import React from 'react';
import {
  TrendingUp, Clock, Target, Award, BookOpen, Users, Calendar,
  ArrowRight, Play, CheckCircle, Brain, Zap, Trophy, Star
} from 'lucide-react';
import './Dashboard.css';

export const Dashboard = ({ currentUser, onContinueLearning, onStartTest, onNavigate }) => {
  // User data props से लें, fallback वैल्यू के साथ
  const user = currentUser || { name: "User", points: 0, streak: 0 };

  // Stats array, डाइनामिक यूजर डेटा के साथ
  const stats = [
    {
      label: 'Total Points',
      value: user.points,
      icon: Target,
      color: 'dashboard-stat-blue',
      change: '+12%',
      trend: 'up',
    },
    {
      label: 'Current Streak',
      value: `${user.streak} days`,
      icon: TrendingUp,
      color: 'dashboard-stat-orange',
      change: '+2 days',
      trend: 'up',
    },
    {
      label: 'Batches Completed',
      value: '12',
      icon: Award,
      color: 'dashboard-stat-green',
      change: '+3 this week',
      trend: 'up',
    },
    {
      label: 'Study Hours',
      value: '156h',
      icon: Clock,
      color: 'dashboard-stat-purple',
      change: '+15h this week',
      trend: 'up',
    },
  ];

  // Example Recent Activities (static for demo)
  const recentActivities = [
    {
      type: 'completed',
      title: 'Completed JEE Physics Chapter 12: Optics',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'dashboard-activity-green',
      bgColor: 'dashboard-activity-bg-green',
    },
    {
      type: 'started',
      title: 'Started NEET Chemistry Batch',
      time: '1 day ago',
      icon: Play,
      color: 'dashboard-activity-blue',
      bgColor: 'dashboard-activity-bg-blue',
    },
    {
      type: 'test',
      title: 'Scored 92% in Math Mock Test',
      time: '2 days ago',
      icon: Target,
      color: 'dashboard-activity-purple',
      bgColor: 'dashboard-activity-bg-purple',
    },
    {
      type: 'achievement',
      title: 'Earned "Physics Master" Badge',
      time: '3 days ago',
      icon: Trophy,
      color: 'dashboard-activity-yellow',
      bgColor: 'dashboard-activity-bg-yellow',
    },
  ];

  // Example Upcoming Tests
  const upcomingTests = [
    {
      title: 'JEE Main Mock Test #4',
      date: 'Tomorrow, 10:00 AM',
      duration: '3 hours',
      subjects: ['Physics', 'Chemistry', 'Math'],
      difficulty: 'Advanced',
      participants: 15420,
    },
    {
      title: 'NEET Biology Chapter Test',
      date: 'Dec 28, 2:00 PM',
      duration: '1 hour',
      subjects: ['Biology'],
      difficulty: 'Intermediate',
      participants: 8934,
    },
    {
      title: 'Chemistry Organic Reactions Quiz',
      date: 'Dec 30, 4:00 PM',
      duration: '30 minutes',
      subjects: ['Chemistry'],
      difficulty: 'Beginner',
      participants: 5621,
    },
  ];

  // Weekly Progress sample
  const weeklyProgress = [
    { day: 'Mon', hours: 4 },
    { day: 'Tue', hours: 6 },
    { day: 'Wed', hours: 3 },
    { day: 'Thu', hours: 8 },
    { day: 'Fri', hours: 5 },
    { day: 'Sat', hours: 7 },
    { day: 'Sun', hours: 4 },
  ];

  // Subject Progress sample
  const subjectProgress = [
    { subject: 'Physics', progress: 85, color: 'dashboard-subject-blue' },
    { subject: 'Chemistry', progress: 72, color: 'dashboard-subject-green' },
    { subject: 'Mathematics', progress: 90, color: 'dashboard-subject-purple' },
    { subject: 'Biology', progress: 68, color: 'dashboard-subject-red' },
  ];

  return (
    <div className="dashboard-root">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-overlay"></div>
        <div className="dashboard-header-content">
          <div className="dashboard-header-row">
            <div>
              <h1 className="dashboard-header-title">
                Welcome back, {currentUser.name}! 🚀
              </h1>
              <p className="dashboard-header-desc">
                You're on a {user.streak}-day streak! Keep up the amazing work.
              </p>
            </div>
            <div className="dashboard-header-points">
              <div className="dashboard-header-points-row">
                <Brain className="dashboard-header-points-icon" />
                <span className="dashboard-header-points-value">{user.points}</span>
              </div>
              <p className="dashboard-header-points-label">Total Points Earned</p>
            </div>
          </div>
        </div>
        <div className="dashboard-header-bg1"></div>
        <div className="dashboard-header-bg2"></div>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="dashboard-stat-card">
              <div className="dashboard-stat-card-top">
                <div className={`dashboard-stat-icon ${stat.color}`}>
                  <Icon className="dashboard-stat-icon-svg" />
                </div>
                <div className="dashboard-stat-trend">
                  <TrendingUp className="dashboard-stat-trend-icon" />
                  <span className="dashboard-stat-trend-value">{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="dashboard-stat-label">{stat.label}</p>
                <p className="dashboard-stat-value">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-main-grid">
        {/* Continue Learning */}
        <div className="dashboard-main-left">
          <div className="dashboard-section-card">
            <div className="dashboard-section-header">
              <h2>Continue Learning</h2>
              <button 
                onClick={() => onNavigate('my-batch')}
                className="dashboard-link"
              >
                <span>View All</span>
                <ArrowRight className="dashboard-link-icon" />
              </button>
            </div>
            <div className="dashboard-continue-list">
              {/* Example batch cards */}
              <div className="dashboard-continue-card dashboard-continue-blue">
                <div className="dashboard-continue-row">
                  <div className="dashboard-continue-main">
                    <div className="dashboard-continue-main-row">
                      <div className="dashboard-continue-icon dashboard-subject-blue">
                        <BookOpen className="dashboard-continue-icon-svg" />
                      </div>
                      <div>
                        <h3>JEE Main 2024 Physics</h3>
                        <p>Chapter 12: Optics</p>
                      </div>
                    </div>
                    <div className="dashboard-continue-progress">
                      <div className="dashboard-continue-progress-row">
                        <span>Progress</span>
                        <span className="dashboard-continue-progress-value-blue">75%</span>
                      </div>
                      <div className="dashboard-continue-progress-bar-bg dashboard-subject-blue-bg">
                        <div className="dashboard-continue-progress-bar-fill dashboard-subject-blue" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => onNavigate('my-batch')}
                    className="dashboard-continue-btn dashboard-continue-btn-blue"
                  >
                    <Play className="dashboard-continue-btn-icon" />
                    <span>Continue</span>
                  </button>
                </div>
              </div>
              <div className="dashboard-continue-card dashboard-continue-green">
                <div className="dashboard-continue-row">
                  <div className="dashboard-continue-main">
                    <div className="dashboard-continue-main-row">
                      <div className="dashboard-continue-icon dashboard-subject-green">
                        <BookOpen className="dashboard-continue-icon-svg" />
                      </div>
                      <div>
                        <h3>NEET Biology Complete</h3>
                        <p>Chapter 8: Genetics</p>
                      </div>
                    </div>
                    <div className="dashboard-continue-progress">
                      <div className="dashboard-continue-progress-row">
                        <span>Progress</span>
                        <span className="dashboard-continue-progress-value-green">45%</span>
                      </div>
                      <div className="dashboard-continue-progress-bar-bg dashboard-subject-green-bg">
                        <div className="dashboard-continue-progress-bar-fill dashboard-subject-green" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => onNavigate('my-batch')}
                    className="dashboard-continue-btn dashboard-continue-btn-green"
                  >
                    <Play className="dashboard-continue-btn-icon" />
                    <span>Continue</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="dashboard-section-card">
            <h2 className="dashboard-section-title">Weekly Progress</h2>
            <div className="dashboard-weekly-progress-grid">
              {weeklyProgress.map((day, index) => (
                <div key={index} className="dashboard-weekly-progress-col">
                  <div className="dashboard-weekly-progress-bar-bg">
                    <div 
                      className="dashboard-weekly-progress-bar-fill"
                      style={{ height: `${(day.hours / 8) * 100}%` }}
                    ></div>
                  </div>
                  <p className="dashboard-weekly-progress-day">{day.day}</p>
                  <p className="dashboard-weekly-progress-hours">{day.hours}h</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-section-card">
            <h2 className="dashboard-section-title">Recent Activity</h2>
            <div className="dashboard-activity-list">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className={`dashboard-activity-row ${activity.bgColor}`}>
                    <div className="dashboard-activity-icon-bg">
                      <Icon className={`dashboard-activity-icon ${activity.color}`} />
                    </div>
                    <div className="dashboard-activity-content">
                      <p>{activity.title}</p>
                      <p className="dashboard-activity-time">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="dashboard-main-right">
          {/* Subject Progress */}
          <div className="dashboard-section-card">
            <h2 className="dashboard-section-title">Subject Progress</h2>
            <div className="dashboard-subject-progress-list">
              {subjectProgress.map((subject, index) => (
                <div key={index} className="dashboard-subject-progress-row">
                  <span className="dashboard-subject-progress-label">{subject.subject}</span>
                  <span className="dashboard-subject-progress-value">{subject.progress}%</span>
                  <div className="dashboard-subject-progress-bar-bg">
                    <div 
                      className={`dashboard-subject-progress-bar-fill ${subject.color}`}
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tests */}
          <div className="dashboard-section-card">
            <div className="dashboard-section-header">
              <h2>Upcoming Tests</h2>
              <button 
                onClick={() => onNavigate('tests')}
                className="dashboard-link dashboard-link-sm"
              >
                View All
              </button>
            </div>
            <div className="dashboard-upcoming-list">
              {upcomingTests.map((test, index) => (
                <div key={index} className="dashboard-upcoming-row">
                  <h3>{test.title}</h3>
                  <div className="dashboard-upcoming-meta">
                    <span><Calendar className="dashboard-upcoming-meta-icon" />{test.date}</span>
                    <span><Clock className="dashboard-upcoming-meta-icon" />{test.duration}</span>
                    <span><Users className="dashboard-upcoming-meta-icon" />{test.participants} participants</span>
                  </div>
                  <div className="dashboard-upcoming-bottom">
                    <div className="dashboard-upcoming-tags">
                      {test.subjects.map((subject, idx) => (
                        <span key={idx} className="dashboard-upcoming-tag">{subject}</span>
                      ))}
                    </div>
                    <span className={`dashboard-upcoming-difficulty ${
                      test.difficulty === 'Advanced' ? 'dashboard-upcoming-difficulty-adv' :
                      test.difficulty === 'Intermediate' ? 'dashboard-upcoming-difficulty-int' :
                      'dashboard-upcoming-difficulty-beg'
                    }`}>
                      {test.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-section-card">
            <h2 className="dashboard-section-title">Quick Actions</h2>
            <div className="dashboard-quickactions-list">
              <button 
                onClick={() => onNavigate('batch-creation')}
                className="dashboard-quickaction-btn dashboard-quickaction-btn-blue"
              >
                <Zap className="dashboard-quickaction-icon" />
                <span>Create AI Batch</span>
              </button>
              <button 
                onClick={() => onNavigate('tests')}
                className="dashboard-quickaction-btn dashboard-quickaction-btn-green"
              >
                <Target className="dashboard-quickaction-icon" />
                <span>Take Practice Test</span>
              </button>
              <button 
                onClick={() => onNavigate('library')}
                className="dashboard-quickaction-btn dashboard-quickaction-btn-purple"
              >
                <BookOpen className="dashboard-quickaction-icon" />
                <span>Browse Library</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

