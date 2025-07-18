import React, { useState } from 'react';
import {
  ArrowLeft, Play, Download, Share2, Clock, Users, Star, BookOpen, CheckCircle,
  Lock, Video, FileText, Headphones, Target, Calendar
} from 'lucide-react';
import './BatchOverview.css'; // Import CSS

  const BatchOverview = ({ onBack ,  onNavigate  }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const batchData = {
    title: 'JEE Main 2024 Physics Complete',
    instructor: 'Dr. Amit Sharma',
    rating: 4.8,
    students: 12547,
    duration: '120 hours',
    chapters: 24,
    completedChapters: 16,
    progress: 67,
    nextClass: 'Electromagnetic Induction - Part 2',
    nextClassTime: 'Today, 6:00 PM',
    description: 'Complete JEE Main Physics preparation covering all topics with detailed explanations, practice problems, and mock tests.',
    thumbnail: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800'
  };

  const chapters = [
    { id: 1, title: 'Mechanics', lessons: 8, duration: '12 hours', completed: true, progress: 100, type: 'video' },
    { id: 2, title: 'Thermodynamics', lessons: 6, duration: '8 hours', completed: true, progress: 100, type: 'video' },
    { id: 3, title: 'Waves and Sound', lessons: 5, duration: '7 hours', completed: true, progress: 100, type: 'video' },
    { id: 4, title: 'Electromagnetic Induction', lessons: 7, duration: '10 hours', completed: false, progress: 60, type: 'video', current: true },
    { id: 5, title: 'Optics', lessons: 6, duration: '9 hours', completed: false, progress: 0, type: 'video' },
    { id: 6, title: 'Modern Physics', lessons: 8, duration: '12 hours', completed: false, progress: 0, type: 'video' }
  ];

  const tests = [
    { id: 1, title: 'Mechanics Mock Test', questions: 30, duration: '60 min', score: 85, completed: true },
    { id: 2, title: 'Thermodynamics Quiz', questions: 20, duration: '30 min', score: 92, completed: true },
    { id: 3, title: 'Electromagnetic Induction Test', questions: 25, duration: '45 min', score: null, completed: false }
  ];

  const announcements = [
    { id: 1, title: 'New Chapter Added: Modern Physics', date: '2 days ago', content: 'We have added a comprehensive chapter on Modern Physics covering photoelectric effect, atomic structure, and nuclear physics.' },
    { id: 2, title: 'Mock Test Schedule', date: '1 week ago', content: 'Weekly mock tests will be conducted every Sunday at 2:00 PM. Make sure to participate for better preparation.' }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return <Video size={16} className="icon-red" />;
      case 'text': return <FileText size={16} className="icon-blue" />;
      case 'audio': return <Headphones size={16} className="icon-green" />;
      default: return <BookOpen size={16} className="icon-gray" />;
    }
  };

  return (
    <div className="batchoverview-bg">
      {/* Header */}
      <div className="batchoverview-header">
        <div className="batchoverview-header-inner">
          <button onClick={onBack} className="batchoverview-backbtn">
            <ArrowLeft size={20} style={{ marginRight: 8 }} />
            Back to Dashboard
          </button>
          <div className="batchoverview-header-actions">
            <button><Share2 size={20} /></button>
            <button><Download size={20} /></button>
          </div>
        </div>
      </div>

      <div className="batchoverview-main">
        {/* Batch Header */}
        <div className="batchoverview-batchcard">
          <div className="batchoverview-batchcard-inner">
            <img
              src={batchData.thumbnail}
              alt={batchData.title}
              className="batchoverview-batchcard-img"
            />
            <div className="batchoverview-batchcard-content">
              <div style={{ marginBottom: 16 }}>
                <h1 className="batchoverview-batchcard-title">{batchData.title}</h1>
                <p className="batchoverview-batchcard-desc">{batchData.description}</p>
                <div className="batchoverview-batchcard-meta">
                  <div><Users size={16} /> {batchData.students.toLocaleString()} students</div>
                  <div><Clock size={16} /> {batchData.duration}</div>
                  <div><BookOpen size={16} /> {batchData.chapters} chapters</div>
                  <div><Star size={16} className="icon-yellow" /> {batchData.rating} rating</div>
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <div className="batchoverview-progress-labels">
                  <span>Course Progress</span>
                  <span style={{ color: '#2563eb', fontWeight: 500 }}>{batchData.progress}%</span>
                </div>
                <div className="batchoverview-progress-bar-bg">
                  <div
                    className="batchoverview-progress-bar-fill"
                    style={{ width: `${batchData.progress}%` }}
                  />
                </div>
                <div className="batchoverview-progress-caption">
                  {batchData.completedChapters} of {batchData.chapters} chapters completed
                </div>
              </div>
              <div className="batchoverview-nextclass">
                <div className="batchoverview-nextclass-title">Next Live Class</div>
                <div className="batchoverview-nextclass-topic">{batchData.nextClass}</div>
                <div className="batchoverview-nextclass-time">{batchData.nextClassTime}</div>
              </div>
              <div className="batchoverview-actions">
                <button className="primary"><Play size={20} /> Continue Learning</button>
                <button className="secondary">Download Materials</button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="batchoverview-tabs">
          <div className="batchoverview-tabs-nav">
            {[
              { id: 'overview', name: 'Overview', icon: BookOpen },
              { id: 'chapters', name: 'Chapters', icon: Video },
              { id: 'tests', name: 'Tests', icon: Target },
              { id: 'announcements', name: 'Announcements', icon: Calendar }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`batchoverview-tabs-btn${activeTab === tab.id ? ' active' : ''}`}
                >
                  <Icon size={16} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          <div className="batchoverview-tabs-content">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="batchoverview-overview-tab">
                <div>
                  <h2 className="batchoverview-section-title">About This Course</h2>
                  <p>
                    This comprehensive JEE Main Physics course covers all essential topics required for the examination.
                    The course is designed by experienced faculty and includes detailed video lectures, practice problems,
                    and regular assessments to ensure thorough understanding of concepts.
                  </p>
                </div>
                <div>
                  <h2 className="batchoverview-section-title">What You'll Learn</h2>
                  <div className="batchoverview-learn-list">
                    {[
                      'Complete Mechanics with problem-solving techniques',
                      'Thermodynamics and kinetic theory',
                      'Wave motion and sound phenomena',
                      'Electromagnetic induction and applications',
                      'Geometric and wave optics',
                      'Modern physics including atomic structure'
                    ].map((item, index) => (
                      <div key={index} className="batchoverview-learn-item">
                        <CheckCircle size={20} className="icon-green" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="batchoverview-section-title">Instructor</h2>
                  <div className="batchoverview-instructor">
                    <img
                      src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100"
                      alt={batchData.instructor}
                      className="batchoverview-instructor-img"
                    />
                    <div className="batchoverview-instructor-details">
                      <h3>{batchData.instructor}</h3>
                      <p>Physics Expert • 15+ years experience</p>
                      <div className="batchoverview-instructor-rating">
                        <Star size={16} className="icon-yellow" />
                        <span>4.9 instructor rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Chapters Tab */}
            {activeTab === 'chapters' && (
              <div>
                <div className="batchoverview-section-title" style={{ marginBottom: 0 }}>
                  Course Content
                  <span style={{ fontWeight: 400, fontSize: '1rem', color: '#6b7280', marginLeft: 12 }}>
                    {chapters.length} chapters • {batchData.duration}
                  </span>
                </div>
                <div className="batchoverview-chapters-list">
                  {chapters.map(chapter => (
                    <div key={chapter.id} className={`batchoverview-chapter-card${chapter.current ? ' current' : ''}`}>
                      <div className="batchoverview-chapter-left">
                        <div className={`batchoverview-chapter-icon${chapter.completed ? ' completed' : chapter.current ? ' current' : ' locked'}`}>
                          {chapter.completed ? (
                            <CheckCircle size={20} style={{ color: '#fff' }} />
                          ) : chapter.current ? (
                            <Play size={20} style={{ color: '#fff' }} />
                          ) : (
                            <Lock size={20} style={{ color: '#6b7280' }} />
                          )}
                        </div>
                        <div className="batchoverview-chapter-info">
                          <h3>{chapter.title}</h3>
                          <div className="batchoverview-chapter-meta">
                            <span>{getTypeIcon(chapter.type)} {chapter.lessons} lessons</span>
                            <span><Clock size={14} /> {chapter.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        {chapter.progress > 0 && (
                          <div className="batchoverview-chapter-progress">
                            <div className="batchoverview-chapter-progress-label">{chapter.progress}%</div>
                            <div className="batchoverview-chapter-progress-bar-bg">
                              <div
                                className="batchoverview-chapter-progress-bar-fill"
                                style={{ width: `${chapter.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                        <button
                          className={`batchoverview-chapter-btn${chapter.completed || chapter.current ? ' active' : ' locked'}`}
                          disabled={!(chapter.completed || chapter.current)}
                        >
                          {chapter.completed ? 'Review' : chapter.current ? 'Continue' : 'Locked'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tests Tab */}
            {activeTab === 'tests' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                  <div className="batchoverview-section-title" style={{ marginBottom: 0 }}>Assessments</div>
                  <button className="primary" style={{ padding: '8px 16px', fontSize: '1rem' }}>
                    Create Test
                  </button>
                </div>
                <div className="batchoverview-tests-list">
                  {tests.map(test => (
                    <div key={test.id} className="batchoverview-test-card">
                      <div className="batchoverview-test-title">{test.title}</div>
                      <div className="batchoverview-test-meta">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Target size={14} /> {test.questions} questions
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Clock size={14} /> {test.duration}
                        </div>
                      </div>
                      {test.completed && (
                        <div style={{ marginBottom: 16 }}>
                          <div className="batchoverview-test-score-labels">
                            <span>Score</span>
                            <span style={{
                              color: test.score >= 80 ? '#22c55e' : test.score >= 60 ? '#eab308' : '#ef4444',
                              fontWeight: 700
                            }}>
                              {test.score}%
                            </span>
                          </div>
                          <div className="batchoverview-test-score-bar-bg">
                            <div
                              className={`batchoverview-test-score-bar-fill ${test.score >= 80 ? 'green' : test.score >= 60 ? 'yellow' : 'red'}`}
                              style={{ width: `${test.score}%` }}
                            />
                          </div>
                        </div>
                      )}
                      <button
                        className={`batchoverview-test-btn${test.completed ? ' completed' : ' active'}`}
                      >
                        {test.completed ? 'Review Test' : 'Start Test'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Announcements Tab */}
            {activeTab === 'announcements' && (
              <div>
                <div className="batchoverview-section-title" style={{ marginBottom: 24 }}>Latest Announcements</div>
                <div className="batchoverview-announcements-list">
                  {announcements.map(announcement => (
                    <div key={announcement.id} className="batchoverview-announcement-card">
                      <div className="batchoverview-announcement-header">
                        <div className="batchoverview-announcement-title">{announcement.title}</div>
                        <div className="batchoverview-announcement-date">{announcement.date}</div>
                      </div>
                      <div className="batchoverview-announcement-content">{announcement.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};


export default BatchOverview;