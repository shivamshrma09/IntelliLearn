import React, { useState } from 'react';
import { Plus, Search, Clock, BookOpen, Users, ChevronRight } from 'lucide-react';
import './MyBatch.css';

export const MyBatch = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const batches = [
    {
      id: 1,
      name: 'JEE Main 2024 Physics',
      subject: 'Physics',
      progress: 75,
      totalChapters: 24,
      completedChapters: 18,
      nextChapter: 'Electromagnetic Induction',
      instructor: 'Dr. Amit Sharma',
      students: 1247,
      lastAccessed: '2 hours ago',
      type: 'enrolled',
      difficulty: 'Advanced'
    },
    {
      id: 2,
      name: 'NEET Chemistry Complete',
      subject: 'Chemistry',
      progress: 45,
      totalChapters: 30,
      completedChapters: 14,
      nextChapter: 'Organic Chemistry Basics',
      instructor: 'Prof. Priya Patel',
      students: 892,
      lastAccessed: '1 day ago',
      type: 'enrolled',
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      name: 'My Custom UPSC History',
      subject: 'History',
      progress: 30,
      totalChapters: 15,
      completedChapters: 5,
      nextChapter: 'Medieval Indian History',
      instructor: 'AI Generated',
      students: 1,
      lastAccessed: '3 days ago',
      type: 'custom',
      difficulty: 'Beginner'
    },
    {
      id: 4,
      name: 'Mathematics Foundation',
      subject: 'Mathematics',
      progress: 100,
      totalChapters: 20,
      completedChapters: 20,
      nextChapter: 'Course Completed',
      instructor: 'Dr. Suresh Kumar',
      students: 2156,
      lastAccessed: '1 week ago',
      type: 'completed',
      difficulty: 'Intermediate'
    }
  ];

  const filteredBatches = batches.filter(batch => {
    const matchesFilter = filter === 'all' || batch.type === filter;
    const matchesSearch = batch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         batch.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="mybatch-root">
      {/* Header */}
      <div className="mybatch-header">
        <div>
          <h1 className="mybatch-title">My Batch</h1>
          <p className="mybatch-desc">Manage your learning courses and track progress</p>
        </div>
        <button className="mybatch-create-btn">
          <Plus size={20} />
          <span>Create Custom Batch</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="mybatch-filter-row">
        <div className="mybatch-filter-btns">
          {['all', 'enrolled', 'custom', 'completed'].map(filterType => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`mybatch-filter-btn${filter === filterType ? ' active' : ''}`}
            >
              {filterType === 'all' ? 'All Batches' : filterType}
            </button>
          ))}
        </div>
        <div className="mybatch-search-wrap">
          <Search className="mybatch-search-icon" size={20} />
          <input
            type="text"
            placeholder="Search batches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mybatch-search-input"
          />
        </div>
      </div>

      {/* Batch Cards */}
      <div className="mybatch-cards-grid">
        {filteredBatches.map(batch => (
          <div key={batch.id} className="mybatch-card">
            <div className="mybatch-card-body">
              {/* Header */}
              <div className="mybatch-card-header">
                <div>
                  <h3 className="mybatch-card-title">{batch.name}</h3>
                  <p className="mybatch-card-subject">{batch.subject}</p>
                </div>
                <span className={`mybatch-card-type${batch.type === 'custom' ? ' custom' : batch.type === 'completed' ? ' completed' : ' enrolled'}`}>
                  {batch.type === 'custom' ? 'Custom' : 
                   batch.type === 'completed' ? 'Completed' : 'Enrolled'}
                </span>
              </div>

              {/* Progress */}
              <div className="mybatch-progress">
                <div className="mybatch-progress-labels">
                  <span>Progress</span>
                  <span className="mybatch-progress-value">{batch.progress}%</span>
                </div>
                <div className="mybatch-progress-bar-bg">
                  <div 
                    className="mybatch-progress-bar-fill"
                    style={{ width: `${batch.progress}%` }}
                  />
                </div>
                <p className="mybatch-progress-caption">
                  {batch.completedChapters} of {batch.totalChapters} chapters completed
                </p>
              </div>

              {/* Next Chapter */}
              <div className="mybatch-next">
                <p className="mybatch-next-label">
                  {batch.progress === 100 ? 'Status' : 'Next up'}
                </p>
                <p className="mybatch-next-value">{batch.nextChapter}</p>
              </div>

              {/* Stats */}
              <div className="mybatch-stats">
                <div>
                  <Users size={14} className="mr-1" />
                  <span>{batch.students.toLocaleString()} students</span>
                </div>
                <div>
                  <Clock size={14} className="mr-1" />
                  <span>{batch.lastAccessed}</span>
                </div>
              </div>

              {/* Action Button */}
              <button className="mybatch-action-btn">
                <BookOpen size={16} />
                <span>{batch.progress === 100 ? 'Review Course' : 'Continue Learning'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBatches.length === 0 && (
        <div className="mybatch-empty">
          <BookOpen size={48} className="mybatch-empty-icon" />
          <h3>No batches found</h3>
          <p>
            {searchQuery ? 'Try adjusting your search terms' : 'Create your first custom batch to get started'}
          </p>
          <button className="mybatch-create-btn">
            Create Custom Batch
          </button>
        </div>
      )}
    </div>
  );
};
