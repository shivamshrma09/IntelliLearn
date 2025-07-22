import React from 'react';
import {
  TrendingUp,
  Clock,
  Target,
  Award,
  Brain,
  CheckCircle,
  Play,
  Trophy,
  Calendar,
  Users,
  ArrowRight,
  Zap,
  BookOpen, // जरूरी है, क्योंकि आपका कोड इसे यूज करता है
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ currentUser = {}, onNavigate }) => {
  const {
    name = "User",
    streak = 0,
    totalPoints = 0,
    numberOfBatchesCompleted = 0
  } = currentUser;

  const stats = [
    {
      label: 'Total Points',
      value: totalPoints,
      icon: Target,
      color: 'dashboard-stat-blue',
      change: '+12%',
      trend: 'up',
    },
    {
      label: 'Current Streak',
      value: `${streak} days`,
      icon: TrendingUp,
      color: 'dashboard-stat-orange',
      change: '+2 days',
      trend: 'up',
    },
    {
      label: 'Batches Completed',
      value: numberOfBatchesCompleted,
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

  const [recentActivities, setRecentActivities] = React.useState([]);
  const [upcomingTests, setUpcomingTests] = React.useState([]);
  const [weeklyProgress, setWeeklyProgress] = React.useState([]);
  const [subjectProgress, setSubjectProgress] = React.useState([]);
  const [continueLearning, setContinueLearning] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch real data
  React.useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch user's batches
        const batchesResponse = await fetch('/api/batches', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (batchesResponse.ok) {
          const batchesData = await batchesResponse.json();
          
          // Set continue learning data
          setContinueLearning(batchesData.slice(0, 2).map(batch => ({
            id: batch.id,
            title: batch.title,
            chapter: batch.chapters?.[0]?.title || 'Chapter 1',
            progress: batch.progress || 0,
            color: Math.random() > 0.5 ? 'blue' : 'green'
          })));
          
          // Set subject progress
          const subjects = {};
          batchesData.forEach(batch => {
            if (!subjects[batch.subject]) {
              subjects[batch.subject] = {
                subject: batch.subject,
                progress: 0,
                count: 0
              };
            }
            subjects[batch.subject].progress += batch.progress || 0;
            subjects[batch.subject].count += 1;
          });
          
          const colors = ['dashboard-subject-blue', 'dashboard-subject-green', 'dashboard-subject-purple', 'dashboard-subject-red'];
          setSubjectProgress(Object.values(subjects).map((subject, index) => ({
            subject: subject.subject,
            progress: Math.round(subject.progress / subject.count) || 0,
            color: colors[index % colors.length]
          })));
        }
        
        // Fetch test attempts
        const testAttemptsResponse = await fetch('/api/tests/attempts/student', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (testAttemptsResponse.ok) {
          const testAttemptsData = await testAttemptsResponse.json();
          
          if (testAttemptsData.success && testAttemptsData.testAttempts.length > 0) {
            // Add test activities
            const testActivities = testAttemptsData.testAttempts.slice(0, 2).map(attempt => ({
              type: 'test',
              title: `Scored ${Math.round((attempt.score / attempt.totalQuestions) * 100)}% in ${attempt.testId?.title || 'Test'}`,
              time: new Date(attempt.createdAt).toLocaleDateString(),
              icon: Target,
              color: 'dashboard-activity-purple',
              bgColor: 'dashboard-activity-bg-purple',
            }));
            
            setRecentActivities(prev => [...testActivities, ...prev]);
          }
        }
        
        // Fetch upcoming tests
        const testsResponse = await fetch('/api/tests', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (testsResponse.ok) {
          const testsData = await testsResponse.json();
          
          if (testsData.success && testsData.tests.length > 0) {
            setUpcomingTests(testsData.tests.slice(0, 3).map(test => ({
              id: test._id,
              title: test.title,
              date: new Date().toLocaleDateString() + ', ' + new Date().toLocaleTimeString(),
              duration: test.duration + ' minutes',
              subjects: [test.subject],
              difficulty: test.difficulty,
              participants: Math.floor(Math.random() * 10000) + 1000
            })));
          }
        }
        
        // Generate weekly progress data
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date().getDay();
        const weekData = [];
        
        for (let i = 0; i < 7; i++) {
          const dayIndex = (today - 6 + i + 7) % 7;
          weekData.push({
            day: days[dayIndex],
            hours: Math.floor(Math.random() * 8) + 1
          });
        }
        
        setWeeklyProgress(weekData);
        
        // Add default activities if none exist
        if (recentActivities.length === 0) {
          setRecentActivities([
            {
              type: 'started',
              title: `Started ${currentUser.course || 'Learning'} Course`,
              time: 'Today',
              icon: Play,
              color: 'dashboard-activity-blue',
              bgColor: 'dashboard-activity-bg-blue',
            },
            {
              type: 'achievement',
              title: 'Joined IntelliLearn Platform',
              time: 'Today',
              icon: Trophy,
              color: 'dashboard-activity-yellow',
              bgColor: 'dashboard-activity-bg-yellow',
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [currentUser]);

  return (
     
   
<div className="dashboard-root">
      <div className="dashboard-header">
        <h1>Welcome back, {name}! 🚀</h1>
        <p>You're on a {streak}-day streak! Keep up the amazing work.</p>
        <p>Total Points: {totalPoints}</p>
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





      {/* Recent Activities */}
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
              {isLoading ? (
                <div className="dashboard-loading">Loading your courses...</div>
              ) : continueLearning.length > 0 ? (
                continueLearning.map((course, index) => (
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
                            <span className={`dashboard-continue-progress-value-${course.color}`}>{course.progress}%</span>
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
                ))
              ) : (
                <div className="dashboard-empty-state">
                  <p>No courses in progress. Start a new course!</p>
                  <button 
                    onClick={() => onNavigate('batch-creation')}
                    className="dashboard-continue-btn dashboard-continue-btn-blue"
                  >
                    <Zap className="dashboard-continue-btn-icon" />
                    <span>Create New Course</span>
                  </button>
                </div>
              )}
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

export default Dashboard;
