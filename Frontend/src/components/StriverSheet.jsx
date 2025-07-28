import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, ExternalLink, Trophy, Target, TrendingUp } from 'lucide-react';
import './StriverSheet.css';

const StriverSheet = () => {
  const [progress, setProgress] = useState({});
  const [filter, setFilter] = useState('all');

  const dsaTopics = [
    {
      id: 'arrays',
      title: 'Step 1: Learn the basics',
      problems: [
        { id: 1, name: 'Largest Element in Array', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/find-the-largest-element-in-an-array/' },
        { id: 2, name: 'Second Largest Element', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/find-second-smallest-and-second-largest-element-in-an-array/' },
        { id: 3, name: 'Check if Array is Sorted', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/check-if-an-array-is-sorted/' },
        { id: 4, name: 'Remove Duplicates from Sorted Array', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/remove-duplicates-in-place-from-sorted-array/' },
        { id: 5, name: 'Left Rotate Array by One', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/left-rotate-the-array-by-one/' }
      ]
    },
    {
      id: 'sorting',
      title: 'Step 2: Learn Important Sorting Techniques',
      problems: [
        { id: 6, name: 'Selection Sort', difficulty: 'Easy', url: 'https://takeuforward.org/sorting/selection-sort-algorithm/' },
        { id: 7, name: 'Bubble Sort', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/bubble-sort-algorithm/' },
        { id: 8, name: 'Insertion Sort', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/insertion-sort-algorithm/' },
        { id: 9, name: 'Merge Sort', difficulty: 'Medium', url: 'https://takeuforward.org/data-structure/merge-sort-algorithm/' },
        { id: 10, name: 'Quick Sort', difficulty: 'Medium', url: 'https://takeuforward.org/data-structure/quick-sort-algorithm/' }
      ]
    },
    {
      id: 'arrays-hard',
      title: 'Step 3: Solve Problems on Arrays [Easy -> Medium -> Hard]',
      problems: [
        { id: 11, name: 'Two Sum', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/two-sum-check-if-a-pair-with-given-sum-exists-in-array/' },
        { id: 12, name: 'Sort Colors', difficulty: 'Medium', url: 'https://takeuforward.org/data-structure/sort-an-array-of-0s-1s-and-2s/' },
        { id: 13, name: 'Majority Element', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/find-the-majority-element-that-occurs-more-than-n-2-times/' },
        { id: 14, name: 'Maximum Subarray', difficulty: 'Medium', url: 'https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array/' },
        { id: 15, name: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/stock-buy-and-sell/' }
      ]
    },
    {
      id: 'binary-search',
      title: 'Step 4: Binary Search [1D, 2D Arrays, Search Space]',
      problems: [
        { id: 16, name: 'Binary Search', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/binary-search-explained/' },
        { id: 17, name: 'Search Insert Position', difficulty: 'Easy', url: 'https://takeuforward.org/arrays/search-insert-position/' },
        { id: 18, name: 'Find First and Last Position', difficulty: 'Medium', url: 'https://takeuforward.org/data-structure/first-and-last-occurrences-in-array/' },
        { id: 19, name: 'Search in Rotated Sorted Array', difficulty: 'Medium', url: 'https://takeuforward.org/data-structure/search-element-in-a-rotated-sorted-array/' },
        { id: 20, name: 'Find Peak Element', difficulty: 'Medium', url: 'https://takeuforward.org/data-structure/peak-element-in-array/' }
      ]
    },
    {
      id: 'strings',
      title: 'Step 5: Strings [Basic and Medium]',
      problems: [
        { id: 21, name: 'Valid Palindrome', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/check-if-the-given-string-is-palindrome-or-not/' },
        { id: 22, name: 'Reverse Words in String', difficulty: 'Medium', url: 'https://takeuforward.org/data-structure/reverse-words-in-a-string/' },
        { id: 23, name: 'Longest Common Prefix', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/longest-common-prefix-using-sorting/' },
        { id: 24, name: 'Valid Anagram', difficulty: 'Easy', url: 'https://takeuforward.org/data-structure/check-whether-one-string-is-an-anagram-of-another/' },
        { id: 25, name: 'Group Anagrams', difficulty: 'Medium', url: 'https://takeuforward.org/data-structure/group-anagrams-together/' }
      ]
    }
  ];

  useEffect(() => {
    const savedProgress = localStorage.getItem('striverProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('striverProgress', JSON.stringify(progress));
  }, [progress]);

  const toggleProblem = (problemId) => {
    setProgress(prev => ({
      ...prev,
      [problemId]: !prev[problemId]
    }));
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

  return (
    <div className="striver-sheet">
      <div className="striver-header">
        <div className="header-content">
          <h1>Striver's A2Z DSA Course/Sheet</h1>
          <p>Master Data Structures & Algorithms with structured practice</p>
          <a 
            href="https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="original-link"
          >
            <ExternalLink size={16} />
            View Original Sheet
          </a>
        </div>
        
        <div className="progress-stats">
          <div className="stat-card">
            <Trophy className="stat-icon" />
            <div>
              <div className="stat-number">{totalStats.completed}</div>
              <div className="stat-label">Solved</div>
            </div>
          </div>
          <div className="stat-card">
            <Target className="stat-icon" />
            <div>
              <div className="stat-number">{totalStats.total}</div>
              <div className="stat-label">Total</div>
            </div>
          </div>
          <div className="stat-card">
            <TrendingUp className="stat-icon" />
            <div>
              <div className="stat-number">{completionPercentage}%</div>
              <div className="stat-label">Progress</div>
            </div>
          </div>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <span className="progress-text">{totalStats.completed} of {totalStats.total} problems solved</span>
      </div>

      <div className="filters">
        {['all', 'completed', 'pending', 'easy', 'medium', 'hard'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="topics-container">
        {filteredTopics.map(topic => {
          const topicProgress = getTopicProgress(topic);
          const topicPercentage = Math.round((topicProgress.completed / topicProgress.total) * 100);
          
          return (
            <div key={topic.id} className="topic-section">
              <div className="topic-header">
                <h2>{topic.title}</h2>
                <div className="topic-progress">
                  <span>{topicProgress.completed}/{topicProgress.total}</span>
                  <div className="mini-progress-bar">
                    <div 
                      className="mini-progress-fill" 
                      style={{ width: `${topicPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="problems-list">
                {topic.problems.map(problem => (
                  <div 
                    key={problem.id} 
                    className={`problem-item ${progress[problem.id] ? 'completed' : ''}`}
                  >
                    <button
                      onClick={() => toggleProblem(problem.id)}
                      className="problem-checkbox"
                    >
                      {progress[problem.id] ? 
                        <CheckCircle className="check-icon completed" /> : 
                        <Circle className="check-icon" />
                      }
                    </button>
                    
                    <div className="problem-info">
                      <h3>{problem.name}</h3>
                      <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    
                    <a 
                      href={problem.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="problem-link"
                    >
                      <ExternalLink size={16} />
                    </a>
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

export default StriverSheet;