import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Clock,
  Target,
  Award,
  Play,
  Trophy,
  Calendar,
  Users,
  ArrowRight,
  Zap,
  BookOpen,
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ onNavigate }) => {
  const [user, setUser] = useState({
    name: "User",
    streak: 0,
    totalPoints: 0,
    numberOfBatchesCompleted: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    fetch('http://localhost:1000/students/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Unauthorized or other error');
      }
      return response.json();
    })
    .then(data => {
      setUser(data);
    })
    .catch(error => {
      console.error('Error fetching user:', error);
    });
  }, []);

  const stats = [
    {
      label: 'Total Points',
      value: user.totalPoints,
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
      value: user.numberOfBatchesCompleted,
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

  const recentActivities = [
    {
      type: 'test',
      title: 'Scored 90% in Algebra Test',
      time: 'Yesterday',
      icon: Target,
      color: 'dashboard-activity-purple',
      bgColor: 'dashboard-activity-bg-purple'
    },
    {
      type: 'achievement',
      title: 'Joined IntelliLearn Platform',
      time: 'Today',
      icon: Trophy,
      color: 'dashboard-activity-yellow',
      bgColor: 'dashboard-activity-bg-yellow'
    },
  ];

  const continueLearning = [
    {
      id: '111',
      title: 'Math Batch',
      chapter: 'Chapter 1',
      progress: 60,
      color: 'blue'
    },
    {
      id: '112',
      title: 'Science Batch',
      chapter: 'Chapter 2',
      progress: 80,
      color: 'green'
    },
  ];

  return (
    <div className="dashboard-root">
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}! 🚀</h1>
        <p>You're on a {user.streak}-day streak! Keep up the amazing work.</p>
        <p>Total Points: {user.totalPoints}</p>
      </div>

      <div className="dashboard-stats-grid">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`dashboard-stat-card ${stat.color}`}>
              <div className="dashboard-stat-icon"><Icon size={32} /></div>
              <div>
                <p>{stat.label}</p>
                <p>{stat.value}</p>
                <small>{stat.change}</small>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-section">
        <h2>Recent Activity</h2>
        {recentActivities.map((activity, idx) => {
          const Icon = activity.icon;
          return (
            <div key={idx} className={`dashboard-activity-row ${activity.bgColor}`}>
              <Icon size={20} className={activity.color} />
              <div>
                <p>{activity.title}</p>
                <small>{activity.time}</small>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-main-grid">
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
              {continueLearning.map((course, index) => (
                <div key={index} className={`dashboard-continue-card dashboard-continue-${course.color}`}>
                  <div className="dashboard-continue-row">
                    <div className="dashboard-continue-main">
                      <div className="dashboard-continue-main-row">
                        <div className={`dashboard-continue-icon dashboard-subject-${course.color}`}>
                          <BookOpen className="dashboard-continue-icon-svg" />
                        </div>
                        <div>
                          <h3>{course.title}</h3>
                          <p>{course.chapter}</p>
                        </div>
                      </div>
                      <div className="dashboard-continue-progress">
                        <div className="dashboard-continue-progress-row">
                          <span>Progress</span>
                          <span className={`dashboard-continue-progress-value-${course.color}`}>
                            {course.progress}%
                          </span>
                        </div>
                        <div className={`dashboard-continue-progress-bar-bg dashboard-subject-${course.color}-bg`}>
                          <div className={`dashboard-continue-progress-bar-fill dashboard-subject-${course.color}`} style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigate('my-batch')}
                      className={`dashboard-continue-btn dashboard-continue-btn-${course.color}`}
                    >
                      <Play className="dashboard-continue-btn-icon" />
                      <span>Continue</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;