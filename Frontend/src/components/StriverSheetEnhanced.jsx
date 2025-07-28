import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, ExternalLink, Trophy, Target, TrendingUp, Star, Zap, Award } from 'lucide-react';
import './StriverSheetEnhanced.css';

const StriverSheetEnhanced = () => {
  const [progress, setProgress] = useState({});
  const [filter, setFilter] = useState('all');
  const [streak, setStreak] = useState(0);

  const dsaTopics = [
    {
      id: 'arrays',
      title: 'Step 1: Learn the basics',
      icon: '📊',
      color: 'blue',
      problems: [
        { id: 1, name: 'Largest Element in Array', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/find-the-largest-element-in-an-array/', points: 10, companies: ['Google', 'Amazon'] },
        { id: 2, name: 'Second Largest Element', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/find-second-smallest-and-second-largest-element-in-an-array/', points: 10, companies: ['Microsoft', 'Facebook'] },
        { id: 3, name: 'Check if Array is Sorted', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/check-if-an-array-is-sorted/', points: 10, companies: ['Apple', 'Netflix'] },
        { id: 4, name: 'Remove Duplicates from Sorted Array', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/remove-duplicates-in-place-from-sorted-array/', points: 15, companies: ['Google', 'Uber'] },
        { id: 5, name: 'Left Rotate Array by One', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/left-rotate-the-array-by-one/', points: 15, companies: ['Amazon', 'Tesla'] }
      ]
    },
    {
      id: 'sorting',
      title: 'Step 2: Learn Important Sorting Techniques',
      icon: '🔄',
      color: 'green',
      problems: [
        { id: 6, name: 'Selection Sort', difficulty: 'Easy', url: 'https://takeuforward.org/sorting/selection-sort-algorithm/', points: 20, companies: ['Microsoft', 'Adobe'] },
        { id: 7, name: 'Bubble Sort', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/bubble-sort-algorithm/', points: 20, companies: ['IBM', 'Oracle'] },
        { id: 8, name: 'Insertion Sort', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/insertion-sort-algorithm/', points: 20, companies: ['Salesforce', 'Spotify'] },
        { id: 9, name: 'Merge Sort', difficulty: 'Medium', url: 'https://takeuforward.org/data-structure/merge-sort-algorithm/', points: 30, companies: ['Google', 'Facebook'] },
        { id: 10, name: 'Quick Sort', difficulty: 'Medium', url: 'https://takeuforward.org/data-structure/quick-sort-algorithm/', points: 30, companies: ['Amazon', 'Apple'] }
      ]
    },
    {
      id: 'arrays-hard',
      title: 'Step 3: Solve Problems on Arrays [Easy -> Medium -> Hard]',
      icon: '🎯',
      color: 'purple',
      problems: [
        { id: 11, name: 'Two Sum', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/two-sum-check-if-a-pair-with-given-sum-exists-in-array/', points: 25, companies: ['Google', 'Facebook', 'Amazon'] },
        { id: 12, name: 'Sort Colors', difficulty: 'Medium', url: 'https://takeuforward.org/data-structure/sort-an-array-of-0s-1s-and-2s/', points: 35, companies: ['Microsoft', 'Netflix'] },
        { id: 13, name: 'Majority Element', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/find-the-majority-element-that-occurs-more-than-n-2-times/', points: 25, companies: ['Apple', 'Uber'] },
        { id: 14, name: 'Maximum Subarray', difficulty: 'Medium', url: 'https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array/', points: 40, companies: ['Google', 'Amazon', 'Microsoft'] },
        { id: 15, name: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/stock-buy-and-sell/', points: 30, companies: ['Facebook', 'Tesla'] }
      ]
    },
    {
      id: 'binary-search',
      title: 'Step 4: Binary Search [1D, 2D Arrays, Search Space]',
      icon: '🔍',
      color: 'orange',
      problems: [
        { id: 16, name: 'Binary Search', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/binary-search-explained/', points: 20, companies: ['Google', 'Microsoft'] },
        { id: 17, name: 'Search Insert Position', difficulty: 'Easy', url: 'https://takeuforward.org/arrays/search-insert-position/', points: 20, companies: ['Amazon', 'Apple'] },
        { id: 18, name: 'Find First and Last Position', difficulty: 'Medium', url: 'https://takeuforward.org/data-structure/first-and-last-occurrences-in-array/', points: 35, companies: ['Facebook', 'Netflix'] },
        { id: 19, name: 'Search in Rotated Sorted Array', difficulty: 'Medium', url: 'https://takeuforward.org/data-structure/search-element-in-a-rotated-sorted-array/', points: 40, companies: ['Google', 'Uber'] },
        { id: 20, name: 'Find Peak Element', difficulty: 'Medium', url: 'https://takeuforward.org/data-structure/peak-element-in-array/', points: 35, companies: ['Microsoft', 'Adobe'] }
      ]
    },
    {
      id: 'strings',
      title: 'Step 5: Strings [Basic and Medium]',
      icon: '📝',
      color: 'red',
      problems: [
        { id: 21, name: 'Valid Palindrome', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/check-if-the-given-string-is-palindrome-or-not/', points: 15, companies: ['Apple', 'Spotify'] },
        { id: 22, name: 'Reverse Words in String', difficulty: 'Medium', url: 'https://takeuforward.org/data-structure/reverse-words-in-a-string/', points: 30, companies: ['Google', 'Amazon'] },
        { id: 23, name: 'Longest Common Prefix', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/longest-common-prefix-using-sorting/', points: 20, companies: ['Microsoft', 'Facebook'] },
        { id: 24, name: 'Valid Anagram', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/check-whether-one-string-is-an-anagram-of-another/', points: 15, companies: ['Netflix', 'Tesla'] },
        { id: 25, name: 'Group Anagrams', difficulty: 'Medium', url: 'https://takeuforward.org/data-structure/group-anagrams-together/', points: 35, companies: ['Google', 'Uber', 'Adobe'] }
      ]
    },
    {
      id: 'linked-list',
      title: 'Step 6: Learn LinkedList [Single/Double LL, Medium, Hard Problems]',
      icon: '🔗',
      color: 'teal',
      problems: [
        { id: 26, name: 'Reverse Linked List', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/reverse-a-linked-list/', points: 25, companies: ['Google', 'Amazon', 'Microsoft'] },
        { id: 27, name: 'Middle of Linked List', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/find-middle-element-in-a-linked-list/', points: 20, companies: ['Facebook', 'Apple'] },
        { id: 28, name: 'Merge Two Sorted Lists', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/merge-two-sorted-linked-lists/', points: 30, companies: ['Google', 'Netflix'] },
        { id: 29, name: 'Remove Nth Node From End', difficulty: 'Medium', url: 'https://takeuforward.org/data-structure/remove-n-th-node-from-the-end-of-a-linked-list/', points: 35, companies: ['Amazon', 'Uber'] },
        { id: 30, name: 'Detect Cycle in Linked List', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/detect-a-cycle-in-a-linked-list/', points: 25, companies: ['Microsoft', 'Adobe'] }
      ]
    }
  ];

  useEffect(() => {
    const savedProgress = localStorage.getItem('striverProgress');
    const savedStreak = localStorage.getItem('dsaStreak');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('striverProgress', JSON.stringify(progress));
  }, [progress]);

  const toggleProblem = (problemId) => {
    const problem = dsaTopics.flatMap(topic => topic.problems).find(p => p.id === problemId);
    const wasCompleted = progress[problemId];
    
    setProgress(prev => ({
      ...prev,
      [problemId]: !prev[problemId]
    }));
    
    if (!wasCompleted && problem) {
      const currentPoints = parseInt(localStorage.getItem('dsaPoints') || '0');
      localStorage.setItem('dsaPoints', (currentPoints + problem.points).toString());
      
      // Update streak
      const today = new Date().toDateString();
      const lastSolvedDate = localStorage.getItem('lastDSASolvedDate');
      if (lastSolvedDate !== today) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem('dsaStreak', newStreak.toString());
        localStorage.setItem('lastDSASolvedDate', today);
      }
      
      showCelebration(problem.points);
    }
  };
  
  const showCelebration = (points) => {
    const celebration = document.createElement('div');
    celebration.innerHTML = `+${points} points! 🎉`;
    celebration.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      padding: 1rem 2rem;
      border-radius: 1rem;
      font-weight: bold;
      z-index: 10000;
      animation: celebrationPop 2s ease-out forwards;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes celebrationPop {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(celebration);
    setTimeout(() => {
      celebration.remove();
      style.remove();
    }, 2000);
  };

  const getTopicProgress = (topic) => {
    const completed = topic.problems.filter(p => progress[p.id]).length;
    return { completed, total: topic.problems.length };
  };

  const getTotalProgress = () => {
    const total = dsaTopics.reduce((sum, topic) => sum + topic.problems.length, 0);
    const completed = Object.values(progress).filter(Boolean).length;
    return { completed, total };
  };

  const filteredTopics = dsaTopics.map(topic => ({
    ...topic,
    problems: topic.problems.filter(problem => {
      if (filter === 'completed') return progress[problem.id];
      if (filter === 'pending') return !progress[problem.id];
      if (filter === 'easy') return problem.difficulty === 'Easy';
      if (filter === 'medium') return problem.difficulty === 'Medium';
      if (filter === 'hard') return problem.difficulty === 'Hard';
      return true;
    })
  })).filter(topic => topic.problems.length > 0);

  const totalStats = getTotalProgress();
  const completionPercentage = Math.round((totalStats.completed / totalStats.total) * 100);
  const earnedPoints = dsaTopics.flatMap(topic => topic.problems)
    .filter(problem => progress[problem.id])
    .reduce((sum, problem) => sum + problem.points, 0);

  return (
    <div className="striver-sheet-enhanced">
      <div className="striver-header-enhanced">
        <div className="header-content">
          <div className="title-section">
            <h1>🚀 Striver's A2Z DSA Mastery</h1>
            <p>Your journey to coding excellence starts here</p>
          </div>
          <a 
            href="https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="original-link"
          >
            <ExternalLink size={16} />
            Original Sheet
          </a>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card solved">
            <Trophy className="stat-icon" />
            <div className="stat-info">
              <div className="stat-number">{totalStats.completed}</div>
              <div className="stat-label">Problems Solved</div>
            </div>
          </div>
          <div className="stat-card points">
            <Star className="stat-icon" />
            <div className="stat-info">
              <div className="stat-number">{earnedPoints}</div>
              <div className="stat-label">Points Earned</div>
            </div>
          </div>
          <div className="stat-card streak">
            <Zap className="stat-icon" />
            <div className="stat-info">
              <div className="stat-number">{streak}</div>
              <div className="stat-label">Day Streak</div>
            </div>
          </div>
          <div className="stat-card progress">
            <TrendingUp className="stat-icon" />
            <div className="stat-info">
              <div className="stat-number">{completionPercentage}%</div>
              <div className="stat-label">Complete</div>
            </div>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-bar-enhanced">
          <div 
            className="progress-fill-enhanced" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <div className="progress-info">
          <span>{totalStats.completed} of {totalStats.total} problems solved</span>
          <span className="next-milestone">
            {totalStats.completed < 10 ? 'Next: Solve 10 problems 🎯' : 
             totalStats.completed < 25 ? 'Next: Solve 25 problems 🏆' :
             totalStats.completed < 50 ? 'Next: Solve 50 problems 🌟' : 'DSA Master! 👑'}
          </span>
        </div>
      </div>

      <div className="filters-enhanced">
        {['all', 'completed', 'pending', 'easy', 'medium', 'hard'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`filter-btn-enhanced ${filter === f ? 'active' : ''}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="topics-grid">
        {filteredTopics.map(topic => {
          const topicProgress = getTopicProgress(topic);
          const topicPercentage = Math.round((topicProgress.completed / topicProgress.total) * 100);
          
          return (
            <div key={topic.id} className={`topic-card topic-${topic.color}`}>
              <div className="topic-header-enhanced">
                <div className="topic-title-section">
                  <span className="topic-icon-enhanced">{topic.icon}</span>
                  <h3>{topic.title}</h3>
                </div>
                <div className="topic-progress-enhanced">
                  <div className="progress-circle">
                    <span>{topicPercentage}%</span>
                  </div>
                  <span className="progress-text">{topicProgress.completed}/{topicProgress.total}</span>
                </div>
              </div>
              
              <div className="problems-grid">
                {topic.problems.map(problem => (
                  <div 
                    key={problem.id} 
                    className={`problem-card ${progress[problem.id] ? 'completed' : ''}`}
                  >
                    <div className="problem-header">
                      <button
                        onClick={() => toggleProblem(problem.id)}
                        className="problem-checkbox-enhanced"
                      >
                        {progress[problem.id] ? 
                          <CheckCircle className="check-icon completed" /> : 
                          <Circle className="check-icon" />
                        }
                      </button>
                      <a 
                        href={problem.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="problem-link-enhanced"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                    
                    <div className="problem-content">
                      <h4>{problem.name}</h4>
                      <div className="problem-meta">
                        <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
                          {problem.difficulty}
                        </span>
                        <span className="points-badge">+{problem.points}</span>
                      </div>
                      <div className="companies-list">
                        {problem.companies.slice(0, 2).map(company => (
                          <span key={company} className="company-badge">{company}</span>
                        ))}
                        {problem.companies.length > 2 && (
                          <span className="company-more">+{problem.companies.length - 2}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StriverSheetEnhanced;