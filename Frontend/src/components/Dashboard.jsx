import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Clock,
  Target,
  Award,
  Play,
  Trophy,
  ArrowRight,
  BookOpen,
  CheckSquare,
  Code,
  BarChart3,
  Calendar,
  Flame
} from 'lucide-react';
import timeTracker from '../utils/timeTracker';
import './Dashboard.css';

const Dashboard = ({ onNavigate }) => {
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
    
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:1000'}/students/user`, {
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

    // Start time tracking
    timeTracker.startTracking();

    // Update real-time stats every second
    const interval = setInterval(() => {
      const totalTime = timeTracker.getTotalTimeToday();
      const streak = timeTracker.updateStreak();
      setCurrentTime(totalTime);
      setRealTimeStats({
        studyTime: totalTime,
        streak: streak,
        todayPoints: Math.floor(totalTime / 60000) * 10 // 10 points per minute
      });
    }, 1000);

    // Cleanup on unmount
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
      icon: Target,
      color: 'dashboard-stat-blue',
      change: `+${realTimeStats.todayPoints} today`,
      trend: 'up',
    },
    {
      label: 'Current Streak',
      value: `${Math.max(user.streak, realTimeStats.streak)} days`,
      icon: TrendingUp,
      color: 'dashboard-stat-orange',
      change: realTimeStats.streak > user.streak ? 'Updated!' : 'Keep going!',
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
      label: 'Study Time Today',
      value: timeTracker.getFormattedTime(currentTime),
      icon: Clock,
      color: 'dashboard-stat-purple',
      change: 'Live tracking',
      trend: 'up',
    },
  ];

  const recentActivities = [
    {
      type: 'study',
      title: `Studied for ${timeTracker.getFormattedTime(currentTime)} today`,
      time: 'Live',
      icon: Clock,
      color: 'dashboard-activity-blue',
      bgColor: 'dashboard-activity-bg-blue'
    },
    {
      type: 'points',
      title: `Earned ${realTimeStats.todayPoints} points today`,
      time: 'Today',
      icon: Target,
      color: 'dashboard-activity-green',
      bgColor: 'dashboard-activity-bg-green'
    },
    {
      type: 'test',
      title: 'Scored 90% in Algebra Test',
      time: 'Yesterday',
      icon: Trophy,
      color: 'dashboard-activity-purple',
      bgColor: 'dashboard-activity-bg-purple'
    },
    {
      type: 'achievement',
      title: 'Joined IntelliLearn Platform',
      time: 'Today',
      icon: Award,
      color: 'dashboard-activity-yellow',
      bgColor: 'dashboard-activity-bg-yellow'
    },
  ];





  // Quick action cards for new features
  const quickActions = [
    {
      title: '💻 LeetCode',
      description: 'Track LeetCode problem solving',
      icon: Code,
      color: 'blue',
      action: () => onNavigate('leetcode')
    },
    {
      title: '✅ My Tasks',
      description: 'Manage your daily todo list',
      icon: CheckSquare,
      color: 'blue',
      action: () => onNavigate('todo')
    },
    {
      title: '📊 Analytics',
      description: 'View your learning progress',
      icon: BarChart3,
      color: 'blue',
      action: () => onNavigate('analytics')
    },
    {
      title: '🔥 Study Streak',
      description: 'Maintain your daily streak',
      icon: Flame,
      color: 'blue',
      action: () => onNavigate('streak')
    }
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
        <div className="dashboard-welcome">
          <h1>Welcome back, {user.name}! 🚀</h1>
          <p>You're on a <span className="streak-highlight">{Math.max(user.streak, realTimeStats.streak)}-day streak</span>! Keep up the amazing work.</p>
        </div>
        <div className="dashboard-points-card">
          <div className="points-main">
            <Target size={24} />
            <span>{user.totalPoints + realTimeStats.todayPoints}</span>
          </div>
          <div className="points-today">+{realTimeStats.todayPoints} today</div>
        </div>
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
        
        <div className="dashboard-main-right">
          <div className="dashboard-section-card">
            <h2>Quick Actions</h2>
            <div className="quick-actions-grid">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <div 
                    key={index} 
                    className={`quick-action-card quick-action-${action.color}`}
                    onClick={action.action}
                  >
                    <Icon className="quick-action-icon" />
                    <h3>{action.title}</h3>
                    <p>{action.description}</p>
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

export default Dashboard;