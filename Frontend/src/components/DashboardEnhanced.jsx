import React, { useState, useEffect } from 'react';
import {
  TrendingUp, Clock, Target, Award, Play, Trophy, Calendar, Users, ArrowRight, Zap, BookOpen,
  CheckSquare, Code, Star, Flame, Brain, Rocket, ChevronRight, Activity, BarChart3
} from 'lucide-react';
import timeTracker from '../utils/timeTracker';
import './DashboardEnhanced.css';

const DashboardEnhanced = ({ onNavigate }) => {
  const [user, setUser] = useState({
    name: "User",
    streak: 0,
    totalPoints: 0,
    numberOfBatchesCompleted: 0
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [realTimeStats, setRealTimeStats] = useState({
    studyTime: 0,
    streak: 0,
    todayPoints: 0
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

    timeTracker.startTracking();

    const interval = setInterval(() => {
      const totalTime = timeTracker.getTotalTimeToday();
      const streak = timeTracker.updateStreak();
      setCurrentTime(totalTime);
      setRealTimeStats({
        studyTime: totalTime,
        streak: streak,
        todayPoints: Math.floor(totalTime / 60000) * 10
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      timeTracker.stopTracking();
      timeTracker.updateWeeklyStats();
    };
  }, []);

  const stats = [
    {
      label: 'Total Points',
      value: user.totalPoints + realTimeStats.todayPoints,
      icon: Star,
      color: 'gold',
      change: `+${realTimeStats.todayPoints} today`,
      trend: 'up',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      label: 'Study Streak',
      value: `${Math.max(user.streak, realTimeStats.streak)}`,
      icon: Flame,
      color: 'fire',
      change: realTimeStats.streak > user.streak ? 'Updated!' : 'Keep going!',
      trend: 'up',
      gradient: 'from-red-400 to-pink-500'
    },
    {
      label: 'Study Time',
      value: timeTracker.getFormattedTime(currentTime),
      icon: Clock,
      color: 'blue',
      change: 'Live tracking',
      trend: 'up',
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      label: 'Completed',
      value: user.numberOfBatchesCompleted,
      icon: Trophy,
      color: 'green',
      change: '+3 this week',
      trend: 'up',
      gradient: 'from-green-400 to-emerald-500'
    }
  ];

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Completed your first lesson', icon: '🎯', unlocked: true },
    { id: 2, title: 'Streak Master', description: '7-day study streak', icon: '🔥', unlocked: realTimeStats.streak >= 7 },
    { id: 3, title: 'Point Collector', description: 'Earned 1000 points', icon: '⭐', unlocked: (user.totalPoints + realTimeStats.todayPoints) >= 1000 },
    { id: 4, title: 'DSA Warrior', description: 'Solved 25 DSA problems', icon: '⚔️', unlocked: false }
  ];

  const quickActions = [
    {
      title: 'DSA Practice',
      description: 'Solve coding problems',
      icon: Code,
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-600',
      action: () => onNavigate('striver-sheet')
    },
    {
      title: 'Study Timer',
      description: 'Focus with Pomodoro',
      icon: Clock,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-600',
      action: () => onNavigate('timer')
    },
    {
      title: 'My Library',
      description: 'Access resources',
      icon: BookOpen,
      color: 'green',
      gradient: 'from-green-500 to-teal-600',
      action: () => onNavigate('library')
    },
    {
      title: 'Take Test',
      description: 'Practice quizzes',
      icon: BarChart3,
      color: 'orange',
      gradient: 'from-orange-500 to-red-600',
      action: () => onNavigate('tests')
    }
  ];

  const recentActivities = [
    {
      type: 'study',
      title: `Studied for ${timeTracker.getFormattedTime(currentTime)} today`,
      time: 'Live',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      type: 'points',
      title: `Earned ${realTimeStats.todayPoints} points today`,
      time: 'Today',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      type: 'achievement',
      title: 'Unlocked "Consistent Learner" badge',
      time: '2 hours ago',
      icon: Trophy,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  const continueLearning = [
    {
      id: '111',
      title: 'Data Structures & Algorithms',
      chapter: 'Arrays & Strings',
      progress: 65,
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      id: '112',
      title: 'System Design Fundamentals',
      chapter: 'Scalability Patterns',
      progress: 40,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-600'
    }
  ];

  return (
    <div className="dashboard-enhanced">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome back, {user.name}! 🚀</h1>
            <p>You're crushing it with a {Math.max(user.streak, realTimeStats.streak)}-day streak!</p>
            <div className="hero-stats">
              <div className="hero-stat">
                <Star className="hero-stat-icon" />
                <span>{user.totalPoints + realTimeStats.todayPoints} Points</span>
              </div>
              <div className="hero-stat">
                <Flame className="hero-stat-icon" />
                <span>{Math.max(user.streak, realTimeStats.streak)} Days</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-elements">
              <div className="floating-element">📚</div>
              <div className="floating-element">💻</div>
              <div className="floating-element">🎯</div>
              <div className="floating-element">⚡</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid-enhanced">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`stat-card-enhanced ${stat.color}`}>
              <div className="stat-header">
                <div className={`stat-icon-wrapper bg-gradient-to-r ${stat.gradient}`}>
                  <Icon className="stat-icon" />
                </div>
                <div className="stat-trend">
                  <TrendingUp className="trend-icon" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="main-content-grid">
        {/* Left Column */}
        <div className="left-column">
          {/* Quick Actions */}
          <div className="section-card">
            <div className="section-header">
              <h2>🚀 Quick Actions</h2>
              <p>Jump into your learning journey</p>
            </div>
            <div className="quick-actions-grid">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <div 
                    key={index} 
                    className="quick-action-card"
                    onClick={action.action}
                  >
                    <div className={`action-icon bg-gradient-to-r ${action.gradient}`}>
                      <Icon />
                    </div>
                    <div className="action-content">
                      <h3>{action.title}</h3>
                      <p>{action.description}</p>
                    </div>
                    <ChevronRight className="action-arrow" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Continue Learning */}
          <div className="section-card">
            <div className="section-header">
              <h2>📚 Continue Learning</h2>
              <button onClick={() => onNavigate('my-batch')} className="view-all-btn">
                View All <ArrowRight size={16} />
              </button>
            </div>
            <div className="learning-cards">
              {continueLearning.map((course, index) => (
                <div key={index} className="learning-card">
                  <div className="learning-header">
                    <div className={`learning-icon bg-gradient-to-r ${course.gradient}`}>
                      <BookOpen />
                    </div>
                    <div className="learning-info">
                      <h3>{course.title}</h3>
                      <p>{course.chapter}</p>
                    </div>
                  </div>
                  <div className="learning-progress">
                    <div className="progress-info">
                      <span>Progress</span>
                      <span className="progress-value">{course.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className={`progress-fill bg-gradient-to-r ${course.gradient}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <button 
                    onClick={() => onNavigate('my-batch')}
                    className={`continue-btn bg-gradient-to-r ${course.gradient}`}
                  >
                    <Play size={16} />
                    Continue
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Achievements */}
          <div className="section-card">
            <div className="section-header">
              <h2>🏆 Achievements</h2>
              <p>Your learning milestones</p>
            </div>
            <div className="achievements-list">
              {achievements.map(achievement => (
                <div 
                  key={achievement.id} 
                  className={`achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                >
                  <div className="achievement-icon">
                    {achievement.unlocked ? achievement.icon : '🔒'}
                  </div>
                  <div className="achievement-content">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <div className="achievement-badge">
                      <Award size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="section-card">
            <div className="section-header">
              <h2>⚡ Recent Activity</h2>
              <p>Your learning journey</p>
            </div>
            <div className="activity-list">
              {recentActivities.map((activity, idx) => {
                const Icon = activity.icon;
                return (
                  <div key={idx} className={`activity-item ${activity.bgColor}`}>
                    <div className={`activity-icon ${activity.color}`}>
                      <Icon size={20} />
                    </div>
                    <div className="activity-content">
                      <p>{activity.title}</p>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEnhanced;