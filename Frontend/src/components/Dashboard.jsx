// // Dashboard.jsx
// import React, { useState } from 'react';
// import './Dashboard.css';
// import { BookOpen, Trophy, Clock, TrendingUp, Users, Award, Plus, Play, Target, Brain, Zap, Calendar, ChevronRight, Star, BarChart3, FileText, Video, Headphones, Download, Share2 } from 'lucide-react';

// export const Dashboard = ({ onContinueLearning, onStartTest }) => {
//   const [showCreateTest, setShowCreateTest] = useState(false);
//   const [showCreateBatch, setShowCreateBatch] = useState(false);

//   const stats = [
//     {
//       label: 'Active Courses',
//       value: '12',
//       icon: BookOpen,
//       colorClass: 'stat-icon-blue',
//       change: '+3 this week',
//       trend: 'up'
//     },
//     {
//       label: 'Tests Completed',
//       value: '47',
//       icon: Trophy,
//       colorClass: 'stat-icon-green',
//       change: '+8 this week',
//       trend: 'up'
//     },
//     {
//       label: 'Study Hours',
//       value: '156',
//       icon: Clock,
//       colorClass: 'stat-icon-purple',
//       change: '+24 this week',
//       trend: 'up'
//     },
//     {
//       label: 'Current Streak',
//       value: '12 days',
//       icon: Zap,
//       colorClass: 'stat-icon-orange',
//       change: 'Personal best!',
//       trend: 'up'
//     },
//     {
//       label: 'Average Score',
//       value: '87%',
//       icon: Target,
//       colorClass: 'stat-icon-indigo',
//       change: '+5% this month',
//       trend: 'up'
//     },
//     {
//       label: 'Rank',
//       value: '#127',
//       icon: Award,
//       colorClass: 'stat-icon-pink',
//       change: 'Top 5%',
//       trend: 'up'
//     }
//   ];

//   const recentActivity = [
//     { 
//       type: 'completed', 
//       title: 'Completed Physics Chapter: Electromagnetic Induction', 
//       time: '2 hours ago',
//       points: '+50 points',
//       icon: BookOpen,
//       colorClass: 'activity-icon-green'
//     },
//     { 
//       type: 'quiz', 
//       title: 'Scored 94% in Chemistry Quiz: Organic Reactions', 
//       time: '4 hours ago',
//       points: '+75 points',
//       icon: Trophy,
//       colorClass: 'activity-icon-blue'
//     },
//     { 
//       type: 'certificate', 
//       title: 'Earned Mathematics Mastery Certificate', 
//       time: '1 day ago',
//       points: '+200 points',
//       icon: Award,
//       colorClass: 'activity-icon-yellow'
//     },
//     { 
//       type: 'streak', 
//       title: 'Achieved 12-day study streak milestone', 
//       time: '2 days ago',
//       points: '+100 points',
//       icon: Zap,
//       colorClass: 'activity-icon-orange'
//     },
//     { 
//       type: 'batch', 
//       title: 'Started new batch: Advanced Calculus', 
//       time: '3 days ago',
//       points: '+25 points',
//       icon: Play,
//       colorClass: 'activity-icon-purple'
//     }
//   ];

//   const continueLearning = [
//     {
//       id: 1,
//       title: 'JEE Main 2024 Physics',
//       subject: 'Physics',
//       progress: 68,
//       nextChapter: 'Electromagnetic Induction - Part 2',
//       timeLeft: '45 min',
//       difficulty: 'Advanced',
//       instructor: 'Dr. Amit Sharma',
//       thumbnail: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=300'
//     },
//     {
//       id: 2,
//       title: 'NEET Chemistry Complete',
//       subject: 'Chemistry',
//       progress: 45,
//       nextChapter: 'Organic Chemistry Basics',
//       timeLeft: '60 min',
//       difficulty: 'Intermediate',
//       instructor: 'Prof. Priya Patel',
//       thumbnail: 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=300'
//     },
//     {
//       id: 3,
//       title: 'Mathematics Foundation',
//       subject: 'Mathematics',
//       progress: 82,
//       nextChapter: 'Differential Equations',
//       timeLeft: '30 min',
//       difficulty: 'Advanced',
//       instructor: 'Dr. Suresh Kumar',
//       thumbnail: 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=300'
//     }
//   ];

//   const upcomingTests = [
//     {
//       id: 1,
//       title: 'Physics Mock Test - Waves & Optics',
//       date: 'Today, 6:00 PM',
//       duration: '3 hours',
//       questions: 90,
//       type: 'Mock Test'
//     },
//     {
//       id: 2,
//       title: 'Chemistry Chapter Test - Thermodynamics',
//       date: 'Tomorrow, 4:00 PM',
//       duration: '1 hour',
//       questions: 30,
//       type: 'Chapter Test'
//     },
//     {
//       id: 3,
//       title: 'Mathematics Weekly Assessment',
//       date: 'Jan 20, 2:00 PM',
//       duration: '2 hours',
//       questions: 60,
//       type: 'Weekly Test'
//     }
//   ];

//   const quickActions = [
//     {
//       title: 'Create Test',
//       description: 'Design custom tests for practice',
//       icon: Plus,
//       colorClass: 'action-icon-blue',
//       action: () => setShowCreateTest(true)
//     },
//     {
//       title: 'Create Batch',
//       description: 'Build personalized learning paths',
//       icon: BookOpen,
//       colorClass: 'action-icon-green',
//       action: () => setShowCreateBatch(true)
//     },
//     {
//       title: 'AI Tutor',
//       description: 'Get instant doubt resolution',
//       icon: Brain,
//       colorClass: 'action-icon-purple',
//       action: () => {}
//     },
//     {
//       title: 'Study Planner',
//       description: 'Organize your study schedule',
//       icon: Calendar,
//       colorClass: 'action-icon-orange',
//       action: () => {}
//     }
//   ];

//   const achievements = [
//     { title: 'First Steps', icon: BookOpen, unlocked: true },
//     { title: 'Quiz Master', icon: Trophy, unlocked: true },
//     { title: 'Streak Warrior', icon: Zap, unlocked: true },
//     { title: 'Chapter Champion', icon: Star, unlocked: false },
//   ];

//   return (
//     <div className="dashboard-container">
//       {/* Welcome Section */}
//       <div className="welcome-section">
//         <div className="welcome-bg-overlay-top-right"></div>
//         <div className="welcome-bg-overlay-bottom-left"></div>
//         <div className="welcome-content">
//           <div className="welcome-header-group">
//             <div>
//               <h1 className="welcome-title">Welcome back, Rahul! 🎯</h1>
//               <p className="welcome-subtitle">Ready to continue your learning journey? You're making excellent progress!</p>
//               <div className="welcome-badges">
//                 <div className="welcome-badge">
//                   <Award className="welcome-badge-icon" />
//                   <span className="welcome-badge-text">Level 15 Achiever</span>
//                 </div>
//                 <div className="welcome-badge">
//                   <Users className="welcome-badge-icon" />
//                   <span className="welcome-badge-text">Top 3% Learner</span>
//                 </div>
//                 <div className="welcome-badge">
//                   <Zap className="welcome-badge-icon" />
//                   <span className="welcome-badge-text">12-Day Streak</span>
//                 </div>
//               </div>
//             </div>
//             <div className="total-points-display">
//               <div className="total-points-value">3,250</div>
//               <div className="total-points-label">Total Points</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="stats-grid">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon;
//           return (
//             <div key={index} className="stat-card">
//               <div className="stat-header">
//                 <div className={`stat-icon-wrapper ${stat.colorClass}`}>
//                   <Icon className="stat-icon" />
//                 </div>
//                 <div className="stat-value">{stat.value}</div>
//               </div>
//               <div className="stat-footer">
//                 <p className="stat-label">{stat.label}</p>
//                 <p className="stat-change">{stat.change}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Quick Actions */}
//       <div className="quick-actions-section">
//         <h2 className="section-title">Quick Actions</h2>
//         <div className="quick-actions-grid">
//           {quickActions.map((action, index) => {
//             const Icon = action.icon;
//             return (
//               <button
//                 key={index}
//                 onClick={action.action}
//                 className="quick-action-button"
//               >
//                 <div className={`quick-action-icon-wrapper ${action.colorClass}`}>
//                   <Icon className="quick-action-icon" />
//                 </div>
//                 <h3 className="quick-action-title">{action.title}</h3>
//                 <p className="quick-action-description">{action.description}</p>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       <div className="main-content-grid">
//         {/* Continue Learning */}
//         <div className="continue-learning-section">
//           <div className="card-header">
//             <h2 className="section-title">Continue Learning</h2>
//             <button className="view-all-button">View All</button>
//           </div>
//           <div className="card-body">
//             <div className="learning-course-list">
//               {continueLearning.map(course => (
//                 <div key={course.id} className="learning-course-card">
//                   <div className="learning-course-content">
//                     <img 
//                       src={course.thumbnail} 
//                       alt={course.title}
//                       className="learning-course-thumbnail"
//                     />
//                     <div className="learning-course-details">
//                       <div className="learning-course-info-top">
//                         <div>
//                           <h3 className="learning-course-title">{course.title}</h3>
//                           <p className="learning-course-instructor">{course.instructor}</p>
//                         </div>
//                         <span className={`difficulty-tag ${
//                           course.difficulty === 'Advanced' ? 'difficulty-advanced' :
//                           course.difficulty === 'Intermediate' ? 'difficulty-intermediate' :
//                           'difficulty-easy'
//                         }`}>
//                           {course.difficulty}
//                         </span>
//                       </div>
                      
//                       <div className="learning-course-progress-container">
//                         <div className="learning-course-progress-header">
//                           <span className="learning-course-progress-label">Progress</span>
//                           <span className="learning-course-progress-value">{course.progress}%</span>
//                         </div>
//                         <div className="progress-bar-background">
//                           <div 
//                             className="progress-bar-fill"
//                             style={{ width: `${course.progress}%` }}
//                           />
//                         </div>
//                       </div>

//                       <div className="learning-course-actions">
//                         <div>
//                           <p className="learning-course-next-chapter">Next: {course.nextChapter}</p>
//                           <p className="learning-course-time-left">{course.timeLeft} remaining</p>
//                         </div>
//                         <button className="continue-button">
//                           <Play size={16} />
//                           <span>Continue</span>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Sidebar */}
//         <div className="sidebar-sections">
//           {/* Upcoming Tests */}
//           <div className="upcoming-tests-section">
//             <div className="card-header">
//               <h2 className="section-title-small">Upcoming Tests</h2>
//             </div>
//             <div className="card-body">
//               <div className="test-list">
//                 {upcomingTests.map(test => (
//                   <div key={test.id} className="test-card">
//                     <h3 className="test-title">{test.title}</h3>
//                     <div className="test-details">
//                       <div className="test-detail-item">
//                         <Calendar size={14} className="test-detail-icon" />
//                         <span>{test.date}</span>
//                       </div>
//                       <div className="test-detail-item">
//                         <Clock size={14} className="test-detail-icon" />
//                         <span>{test.duration} • {test.questions} questions</span>
//                       </div>
//                     </div>
//                     <button className="start-test-button">
//                       Start Test
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Recent Achievements */}
//           <div className="recent-achievements-section">
//             <div className="card-header">
//               <h2 className="section-title-small">Recent Achievements</h2>
//             </div>
//             <div className="card-body">
//               <div className="achievements-list">
//                 {achievements.map((achievement, index) => {
//                   const Icon = achievement.icon;
//                   return (
//                     <div key={index} className={`achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`}>
//                       <div className={`achievement-icon-wrapper ${achievement.unlocked ? 'unlocked-icon-bg' : 'locked-icon-bg'}`}>
//                         <Icon className={`achievement-item-icon ${achievement.unlocked ? 'unlocked-icon' : 'locked-icon'}`} />
//                       </div>
//                       <span className={`achievement-title ${achievement.unlocked ? 'unlocked-text' : 'locked-text'}`}>
//                         {achievement.title}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Activity */}
//       <div className="recent-activity-section">
//         <div className="card-header">
//           <h2 className="section-title">Recent Activity</h2>
//         </div>
//         <div className="card-body">
//           <div className="activity-list">
//             {recentActivity.map((activity, index) => {
//               const Icon = activity.icon;
//               return (
//                 <div key={index} className="activity-item">
//                   <div className={`activity-icon-wrapper ${activity.colorClass}`}>
//                     <Icon className="activity-icon" />
//                   </div>
//                   <div className="activity-details">
//                     <p className="activity-title">{activity.title}</p>
//                     <div className="activity-meta">
//                       <p className="activity-time">{activity.time}</p>
//                       <span className="activity-points">{activity.points}</span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Create Test Modal */}
//       {showCreateTest && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2 className="modal-title">Create Custom Test</h2>
//               <button 
//                 onClick={() => setShowCreateTest(false)}
//                 className="modal-close-button"
//               >
//                 ✕
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="form-group">
//                 <label className="form-label">Test Title</label>
//                 <input
//                   type="text"
//                   placeholder="Enter test title"
//                   className="form-input"
//                 />
//               </div>
              
//               <div className="form-grid">
//                 <div className="form-group">
//                   <label className="form-label">Subject</label>
//                   <select className="form-select">
//                     <option>Physics</option>
//                     <option>Chemistry</option>
//                     <option>Mathematics</option>
//                     <option>Biology</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Difficulty</label>
//                   <select className="form-select">
//                     <option>Easy</option>
//                     <option>Medium</option>
//                     <option>Hard</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="form-grid">
//                 <div className="form-group">
//                   <label className="form-label">Number of Questions</label>
//                   <input
//                     type="number"
//                     placeholder="30"
//                     className="form-input"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Duration (minutes)</label>
//                   <input
//                     type="number"
//                     placeholder="60"
//                     className="form-input"
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Topics (Select multiple)</label>
//                 <div className="topics-grid">
//                   {['Mechanics', 'Thermodynamics', 'Optics', 'Electromagnetism', 'Modern Physics', 'Waves'].map(topic => (
//                     <label key={topic} className="checkbox-label">
//                       <input type="checkbox" className="checkbox-input" />
//                       <span className="checkbox-text">{topic}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <div className="modal-actions">
//                 <button 
//                   onClick={() => setShowCreateTest(false)}
//                   className="button-secondary"
//                 >
//                   Cancel
//                 </button>
//                 <button className="button-primary">
//                   Create Test
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Create Batch Modal */}
//       {showCreateBatch && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2 className="modal-title">Create Custom Batch</h2>
//               <button 
//                 onClick={() => setShowCreateBatch(false)}
//                 className="modal-close-button"
//               >
//                 ✕
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="form-group">
//                 <label className="form-label">Batch Name</label>
//                 <input
//                   type="text"
//                   placeholder="My Custom JEE Physics Batch"
//                   className="form-input"
//                 />
//               </div>
              
//               <div className="form-grid">
//                 <div className="form-group">
//                   <label className="form-label">Subject</label>
//                   <select className="form-select">
//                     <option>Physics</option>
//                     <option>Chemistry</option>
//                     <option>Mathematics</option>
//                     <option>Biology</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Target Exam</label>
//                   <select className="form-select">
//                     <option>JEE Main</option>
//                     <option>JEE Advanced</option>
//                     <option>NEET</option>
//                     <option>UPSC</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Upload Syllabus (Optional)</label>
//                 <div className="file-upload-area">
//                   <FileText className="file-upload-icon" />
//                   <p className="file-upload-text">Drag and drop your syllabus PDF here</p>
//                   <button className="file-upload-browse-button">
//                     Or click to browse files
//                   </button>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Learning Goals</label>
//                 <textarea
//                   rows={4}
//                   placeholder="Describe what you want to learn in this batch..."
//                   className="form-textarea"
//                 />
//               </div>

//               <div className="modal-actions">
//                 <button 
//                   onClick={() => setShowCreateBatch(false)}
//                   className="button-secondary"
//                 >
//                   Cancel
//                 </button>
//                 <button className="button-primary">
//                   Create Batch
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )} 
//     </div>
//   );
// };







import React from 'react';
import {
  TrendingUp, Clock, Target, Award, BookOpen, Users, Calendar, ArrowRight, Play, CheckCircle, Brain, Zap, Trophy, Star
} from 'lucide-react';
import './Dashboard.css';

export const Dashboard = ({ onContinueLearning, onStartTest }) => {
  const user = {
    name: 'Rahul',
    points: 3250,
    streak: 12
  };

  const stats = [
    {
      label: 'Total Points',
      value: user.points,
      icon: Target,
      color: 'dashboard-stat-blue',
      change: '+12%',
      trend: 'up'
    },
    {
      label: 'Current Streak',
      value: `${user.streak} days`,
      icon: TrendingUp,
      color: 'dashboard-stat-orange',
      change: '+2 days',
      trend: 'up'
    },
    {
      label: 'Batches Completed',
      value: '12',
      icon: Award,
      color: 'dashboard-stat-green',
      change: '+3 this week',
      trend: 'up'
    },
    {
      label: 'Study Hours',
      value: '156h',
      icon: Clock,
      color: 'dashboard-stat-purple',
      change: '+15h this week',
      trend: 'up'
    }
  ];

  const recentActivities = [
    {
      type: 'completed',
      title: 'Completed JEE Physics Chapter 12: Optics',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'dashboard-activity-green',
      bgColor: 'dashboard-activity-bg-green'
    },
    {
      type: 'started',
      title: 'Started NEET Chemistry Batch',
      time: '1 day ago',
      icon: Play,
      color: 'dashboard-activity-blue',
      bgColor: 'dashboard-activity-bg-blue'
    },
    {
      type: 'test',
      title: 'Scored 92% in Math Mock Test',
      time: '2 days ago',
      icon: Target,
      color: 'dashboard-activity-purple',
      bgColor: 'dashboard-activity-bg-purple'
    },
    {
      type: 'achievement',
      title: 'Earned "Physics Master" Badge',
      time: '3 days ago',
      icon: Trophy,
      color: 'dashboard-activity-yellow',
      bgColor: 'dashboard-activity-bg-yellow'
    }
  ];

  const upcomingTests = [
    {
      title: 'JEE Main Mock Test #4',
      date: 'Tomorrow, 10:00 AM',
      duration: '3 hours',
      subjects: ['Physics', 'Chemistry', 'Math'],
      difficulty: 'Advanced',
      participants: 15420
    },
    {
      title: 'NEET Biology Chapter Test',
      date: 'Dec 28, 2:00 PM',
      duration: '1 hour',
      subjects: ['Biology'],
      difficulty: 'Intermediate',
      participants: 8934
    },
    {
      title: 'Chemistry Organic Reactions Quiz',
      date: 'Dec 30, 4:00 PM',
      duration: '30 minutes',
      subjects: ['Chemistry'],
      difficulty: 'Beginner',
      participants: 5621
    }
  ];

  const weeklyProgress = [
    { day: 'Mon', hours: 4, completed: 3 },
    { day: 'Tue', hours: 6, completed: 4 },
    { day: 'Wed', hours: 3, completed: 2 },
    { day: 'Thu', hours: 8, completed: 6 },
    { day: 'Fri', hours: 5, completed: 4 },
    { day: 'Sat', hours: 7, completed: 5 },
    { day: 'Sun', hours: 4, completed: 3 }
  ];

  const subjectProgress = [
    { subject: 'Physics', progress: 85, color: 'dashboard-subject-blue' },
    { subject: 'Chemistry', progress: 72, color: 'dashboard-subject-green' },
    { subject: 'Mathematics', progress: 90, color: 'dashboard-subject-purple' },
    { subject: 'Biology', progress: 68, color: 'dashboard-subject-red' }
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
                Welcome back, {user.name}! 🚀
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


