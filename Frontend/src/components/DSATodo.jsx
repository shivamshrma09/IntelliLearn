import React, { useState, useEffect } from 'react';
import { 
  Code, 
  CheckCircle, 
  Circle, 
  Star, 
  Clock, 
  Target, 
  TrendingUp,
  Filter,
  Search,
  Plus,
  Trash2,
  Edit3,
  Calendar,
  Award,
  BarChart3
} from 'lucide-react';
import './LeetCodeTracker.css';

const LeetCodeTracker = () => {
  const [problems, setProblems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);
  const [newProblem, setNewProblem] = useState({
    title: '',
    difficulty: 'Easy',
    category: 'Array',
    url: '',
    notes: '',
    leetcodeId: '',
    timeComplexity: '',
    spaceComplexity: '',
    attempts: 1,
    tags: [],
    timeTaken: 0,
    language: 'JavaScript',
    status: 'Todo'
  });

  const [userProfile, setUserProfile] = useState({
    username: '',
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    currentStreak: 0,
    maxStreak: 0,
    ranking: 0,
    contestRating: 0
  });

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('recent'); // recent, difficulty, status

  // Load problems from localStorage
  useEffect(() => {
    const savedProblems = localStorage.getItem('dsaProblems');
    if (savedProblems) {
      setProblems(JSON.parse(savedProblems));
    } else {
      // Initialize with some default problems
      const defaultProblems = [
        {
          id: 1,
          title: 'Two Sum',
          difficulty: 'Easy',
          category: 'Array',
          completed: true,
          url: 'https://leetcode.com/problems/two-sum/',
          notes: 'HashMap approach for O(n) solution',
          completedAt: new Date().toISOString(),
          timeSpent: 30,
          leetcodeId: '1',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(n)',
          attempts: 2,
          tags: ['Hash Table', 'Array'],
          timeTaken: 25,
          language: 'JavaScript',
          status: 'Solved',
          difficulty_color: 'easy',
          acceptance_rate: 49.5
        },
        {
          id: 2,
          title: 'Add Two Numbers',
          difficulty: 'Medium',
          category: 'Linked List',
          completed: false,
          url: 'https://leetcode.com/problems/add-two-numbers/',
          notes: '',
          completedAt: null,
          timeSpent: 0,
          leetcodeId: '2',
          timeComplexity: '',
          spaceComplexity: '',
          attempts: 0,
          tags: ['Linked List', 'Math']
        },
        {
          id: 3,
          title: 'Longest Substring Without Repeating Characters',
          difficulty: 'Medium',
          category: 'String',
          completed: false,
          url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
          notes: '',
          completedAt: null,
          timeSpent: 0,
          leetcodeId: '3',
          timeComplexity: '',
          spaceComplexity: '',
          attempts: 0,
          tags: ['Hash Table', 'String', 'Sliding Window']
        }
      ];
      setProblems(defaultProblems);
      localStorage.setItem('dsaProblems', JSON.stringify(defaultProblems));
    }
  }, []);

  // Save problems to localStorage
  const saveProblems = (updatedProblems) => {
    setProblems(updatedProblems);
    localStorage.setItem('dsaProblems', JSON.stringify(updatedProblems));
  };

  // Toggle problem completion
  const toggleProblem = (id) => {
    const updatedProblems = problems.map(problem => {
      if (problem.id === id) {
        return {
          ...problem,
          completed: !problem.completed,
          completedAt: !problem.completed ? new Date().toISOString() : null
        };
      }
      return problem;
    });
    saveProblems(updatedProblems);
  };

  // Add new problem
  const addProblem = () => {
    if (!newProblem.title.trim()) return;
    
    const problem = {
      id: Date.now(),
      ...newProblem,
      completed: false,
      completedAt: null,
      timeSpent: 0
    };
    
    saveProblems([...problems, problem]);
    setNewProblem({
      title: '',
      difficulty: 'Easy',
      category: 'Array',
      url: '',
      notes: ''
    });
    setShowAddModal(false);
  };

  // Delete problem
  const deleteProblem = (id) => {
    const updatedProblems = problems.filter(p => p.id !== id);
    saveProblems(updatedProblems);
  };

  // Edit problem
  const editProblem = (problem) => {
    setEditingProblem(problem);
    setNewProblem({
      title: problem.title,
      difficulty: problem.difficulty,
      category: problem.category,
      url: problem.url,
      notes: problem.notes
    });
    setShowAddModal(true);
  };

  // Update problem
  const updateProblem = () => {
    const updatedProblems = problems.map(p => 
      p.id === editingProblem.id 
        ? { ...p, ...newProblem }
        : p
    );
    saveProblems(updatedProblems);
    setEditingProblem(null);
    setNewProblem({
      title: '',
      difficulty: 'Easy',
      category: 'Array',
      url: '',
      notes: ''
    });
    setShowAddModal(false);
  };

  // Filter problems
  const filteredProblems = problems.filter(problem => {
    const matchesFilter = filter === 'all' || 
      (filter === 'completed' && problem.completed) ||
      (filter === 'pending' && !problem.completed) ||
      (filter === problem.difficulty.toLowerCase());
    
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Calculate stats
  const stats = {
    total: problems.length,
    completed: problems.filter(p => p.completed).length,
    easy: problems.filter(p => p.difficulty === 'Easy').length,
    medium: problems.filter(p => p.difficulty === 'Medium').length,
    hard: problems.filter(p => p.difficulty === 'Hard').length,
    completedToday: problems.filter(p => {
      if (!p.completedAt) return false;
      const today = new Date().toDateString();
      const completedDate = new Date(p.completedAt).toDateString();
      return today === completedDate;
    }).length
  };

  const categories = ['Array', 'String', 'Linked List', 'Stack', 'Queue', 'Tree', 'Graph', 'Dynamic Programming', 'Greedy', 'Backtracking'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="dsa-todo-root">
      {/* Header */}
      <div className="dsa-header">
        <div className="dsa-header-content">
          <h1>💻 LeetCode Progress Tracker</h1>
          <p>Master coding interviews with comprehensive problem tracking</p>
          <button 
            className="profile-btn"
            onClick={() => setShowProfileModal(true)}
          >
            👤 Profile
          </button>
        </div>
        <button 
          className="dsa-add-btn"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={20} />
          Add Problem
        </button>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="leetcode-stats-container">
        <div className="main-stats">
          <div className="stat-card primary">
            <div className="stat-icon">
              <Target size={28} />
            </div>
            <div className="stat-content">
              <h2>{stats.completed}</h2>
              <p>Problems Solved</p>
              <div className="stat-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{width: `${(stats.completed / stats.total) * 100}%`}}
                  ></div>
                </div>
                <span>{stats.total} Total</span>
              </div>
            </div>
          </div>
          
          <div className="difficulty-breakdown">
            <div className="difficulty-card easy">
              <h3>{stats.easy}</h3>
              <p>Easy</p>
            </div>
            <div className="difficulty-card medium">
              <h3>{stats.medium}</h3>
              <p>Medium</p>
            </div>
            <div className="difficulty-card hard">
              <h3>{stats.hard}</h3>
              <p>Hard</p>
            </div>
          </div>
        </div>
        
        <div className="secondary-stats">
          <div className="stat-item">
            <Calendar size={20} />
            <div>
              <h4>{stats.completedToday}</h4>
              <p>Solved Today</p>
            </div>
          </div>
          <div className="stat-item">
            <TrendingUp size={20} />
            <div>
              <h4>{Math.round((stats.completed / stats.total) * 100) || 0}%</h4>
              <p>Completion Rate</p>
            </div>
          </div>
          <div className="stat-item">
            <Award size={20} />
            <div>
              <h4>{userProfile.currentStreak}</h4>
              <p>Current Streak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Controls */}
      <div className="leetcode-controls">
        <div className="controls-left">
          <div className="search-container">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by title, tags, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="view-toggle">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
          </div>
        </div>
        
        <div className="controls-right">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="recent">Recently Added</option>
            <option value="difficulty">Difficulty</option>
            <option value="status">Status</option>
            <option value="attempts">Attempts</option>
          </select>
          
          <div className="filter-chips">
            {['all', 'completed', 'pending', 'easy', 'medium', 'hard'].map(filterType => (
              <button 
                key={filterType}
                className={`filter-chip ${filter === filterType ? 'active' : ''}`}
                onClick={() => setFilter(filterType)}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Problems List */}
      <div className="dsa-problems-list">
        {filteredProblems.length === 0 ? (
          <div className="dsa-empty-state">
            <Code size={48} />
            <h3>No problems found</h3>
            <p>Add some problems to start tracking your progress!</p>
          </div>
        ) : (
          filteredProblems.map(problem => (
            <div key={problem.id} className={`dsa-problem-card ${problem.completed ? 'completed' : ''}`}>
              <div className="dsa-problem-main">
                <button 
                  className="dsa-problem-checkbox"
                  onClick={() => toggleProblem(problem.id)}
                >
                  {problem.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
                </button>
                <div className="dsa-problem-content">
                  <h3>{problem.title}</h3>
                  <div className="dsa-problem-meta">
                    <span className={`dsa-difficulty ${problem.difficulty.toLowerCase()}`}>
                      {problem.difficulty}
                    </span>
                    <span className="dsa-category">{problem.category}</span>
                    {problem.completedAt && (
                      <span className="dsa-completed-date">
                        ✅ {new Date(problem.completedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  {problem.notes && (
                    <p className="dsa-problem-notes">💡 {problem.notes}</p>
                  )}
                  {problem.leetcodeId && (
                    <div className="leetcode-info">
                      <span className="leetcode-id">#{problem.leetcodeId}</span>
                      {problem.timeComplexity && (
                        <span className="complexity time">⏱️ {problem.timeComplexity}</span>
                      )}
                      {problem.spaceComplexity && (
                        <span className="complexity space">💾 {problem.spaceComplexity}</span>
                      )}
                      {problem.attempts > 0 && (
                        <span className="attempts">🎯 {problem.attempts} attempts</span>
                      )}
                    </div>
                  )}
                  {problem.tags && problem.tags.length > 0 && (
                    <div className="problem-tags">
                      {problem.tags.map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="dsa-problem-actions">
                {problem.url && (
                  <a 
                    href={problem.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="dsa-problem-link"
                  >
                    View Problem
                  </a>
                )}
                <button 
                  className="dsa-action-btn"
                  onClick={() => editProblem(problem)}
                >
                  <Edit3 size={16} />
                </button>
                <button 
                  className="dsa-action-btn delete"
                  onClick={() => deleteProblem(problem.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="dsa-modal-overlay">
          <div className="profile-modal">
            <div className="modal-header">
              <h2>👤 LeetCode Profile</h2>
              <button onClick={() => setShowProfileModal(false)}>×</button>
            </div>
            <div className="profile-content">
              <div className="profile-input">
                <label>LeetCode Username:</label>
                <input
                  type="text"
                  value={userProfile.username}
                  onChange={(e) => setUserProfile({...userProfile, username: e.target.value})}
                  placeholder="Enter your LeetCode username"
                />
              </div>
              <div className="profile-stats">
                <div className="profile-stat">
                  <h3>{userProfile.totalSolved}</h3>
                  <p>Total Solved</p>
                </div>
                <div className="profile-stat">
                  <h3>{userProfile.currentStreak}</h3>
                  <p>Current Streak</p>
                </div>
                <div className="profile-stat">
                  <h3>{userProfile.contestRating}</h3>
                  <p>Contest Rating</p>
                </div>
              </div>
              <button 
                className="save-profile-btn"
                onClick={() => {
                  localStorage.setItem('leetcodeProfile', JSON.stringify(userProfile));
                  setShowProfileModal(false);
                }}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="dsa-modal-overlay">
          <div className="dsa-modal">
            <h2>{editingProblem ? 'Edit Problem' : 'Add New Problem'}</h2>
            <div className="dsa-form">
              <input
                type="text"
                placeholder="Problem title"
                value={newProblem.title}
                onChange={(e) => setNewProblem({...newProblem, title: e.target.value})}
              />
              <select
                value={newProblem.difficulty}
                onChange={(e) => setNewProblem({...newProblem, difficulty: e.target.value})}
              >
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
              <select
                value={newProblem.category}
                onChange={(e) => setNewProblem({...newProblem, category: e.target.value})}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="LeetCode ID (e.g., 1, 20, 121)"
                value={newProblem.leetcodeId}
                onChange={(e) => setNewProblem({...newProblem, leetcodeId: e.target.value})}
              />
              <input
                type="url"
                placeholder="LeetCode URL (optional)"
                value={newProblem.url}
                onChange={(e) => setNewProblem({...newProblem, url: e.target.value})}
              />
              <div className="complexity-row">
                <input
                  type="text"
                  placeholder="Time: O(n)"
                  value={newProblem.timeComplexity}
                  onChange={(e) => setNewProblem({...newProblem, timeComplexity: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Space: O(1)"
                  value={newProblem.spaceComplexity}
                  onChange={(e) => setNewProblem({...newProblem, spaceComplexity: e.target.value})}
                />
              </div>
              <div className="form-row">
                <input
                  type="number"
                  placeholder="Attempts"
                  value={newProblem.attempts}
                  onChange={(e) => setNewProblem({...newProblem, attempts: parseInt(e.target.value) || 1})}
                  min="1"
                />
                <input
                  type="number"
                  placeholder="Time (minutes)"
                  value={newProblem.timeTaken}
                  onChange={(e) => setNewProblem({...newProblem, timeTaken: parseInt(e.target.value) || 0})}
                  min="0"
                />
              </div>
              <div className="form-row">
                <select
                  value={newProblem.language}
                  onChange={(e) => setNewProblem({...newProblem, language: e.target.value})}
                >
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
                  <option value="C">C</option>
                  <option value="Go">Go</option>
                </select>
                <select
                  value={newProblem.status}
                  onChange={(e) => setNewProblem({...newProblem, status: e.target.value})}
                >
                  <option value="Todo">Todo</option>
                  <option value="Attempted">Attempted</option>
                  <option value="Solved">Solved</option>
                  <option value="Review">Review</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Tags: Array, Hash Table, Two Pointers"
                value={newProblem.tags.join(', ')}
                onChange={(e) => setNewProblem({...newProblem, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
              />
              <textarea
                placeholder="Solution approach & notes"
                value={newProblem.notes}
                onChange={(e) => setNewProblem({...newProblem, notes: e.target.value})}
                rows="3"
              />
              <div className="dsa-modal-actions">
                <button 
                  className="dsa-btn-secondary"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProblem(null);
                    setNewProblem({
                      title: '',
                      difficulty: 'Easy',
                      category: 'Array',
                      url: '',
                      notes: '',
                      leetcodeId: '',
                      timeComplexity: '',
                      spaceComplexity: '',
                      attempts: 1,
                      tags: [],
                      timeTaken: 0,
                      language: 'JavaScript',
                      status: 'Todo'
                    });
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="dsa-btn-primary"
                  onClick={editingProblem ? updateProblem : addProblem}
                >
                  {editingProblem ? 'Update' : 'Add'} Problem
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeetCodeTracker;