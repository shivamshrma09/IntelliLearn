import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Search, BookOpen, FileText, Headphones, Video, Image,
  Download, Share2, Star, Clock, Eye, Bookmark, Plus, Grid, List,
  Filter, ChevronDown, ChevronUp, ExternalLink, Award, Zap
} from 'lucide-react';
import './Library.css';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBT9qazHDn2OdwUaAjYFpzbXIsTioc1ovY");

const Library = () => {
  // State variables
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [aiRecommendedResources, setAiRecommendedResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [isFetchingAi, setIsFetchingAi] = useState(false);
  const [combinedLibrary, setCombinedLibrary] = useState([]);
  
  // Test related states
  const [showTestModal, setShowTestModal] = useState(false);
  const [testQuestions, setTestQuestions] = useState([]);
  const [testAnswers, setTestAnswers] = useState({});
  const [testResults, setTestResults] = useState(null);
  const [showTestResults, setShowTestResults] = useState(false);
  const [currentTestResource, setCurrentTestResource] = useState(null);

  // Helper to parse views string to number
  const parseViews = useCallback((views) => {
    if (typeof views === "number") return views;
    if (!views) return null;
    const str = views.toString().toUpperCase().trim();
    if (str.endsWith("M")) return parseFloat(str) * 1000000;
    if (str.endsWith("K")) return parseFloat(str) * 1000;
    const n = parseInt(str, 10);
    return isNaN(n) ? null : n;
  }, []);

  // Function to save AI resources to student database
  const saveToStudentDatabase = useCallback(async (resources) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn("No token found, can't save to student database");
        return;
      }

      const userCourse = user?.course || "Unknown Course";
      const enrichedResources = resources.map(item => ({
        ...item,
        url: item.url || '#',
        course: userCourse,
        content: item.content || item.description || "No content provided",
        subject: (item.tags && item.tags.length > 0) ? item.tags[0] : "General",
        type: item.type || "document",
        views: parseViews(item.views),
      }));

      for (const resource of enrichedResources) {
        const res = await fetch("http://localhost:1000/students/add-library", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(resource),
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error("Failed to save resource:", errorData.message);
        } else {
          const result = await res.json();
          console.log("Resource saved:", result.message);
        }
      }
    } catch (error) {
      console.error("Error saving to student database:", error.message);
    }
  }, [user, parseViews]);

  // Fetch User Data Effect
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication token not found. Please log in.');
      return;
    }

    setLoading(true);
    fetch('http://localhost:1000/students/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Please log in again.');
        }
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      setUser(data);
      setError('');
    })
    .catch(err => {
      setError(err.message);
      console.error("User data fetch error:", err);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  // AI Prompt
  const aiPrompt = useMemo(() => {
    if (!user?.course) return '';

    return `
You are an expert educational resource recommender. I am a student currently pursuing the course "${user.course}".

Please provide exactly 10 free, high-quality educational resources in JSON array format, with these properties:
- title (string)
- description (string)
- tags (array of strings, include resource's type)
- type (string) — resource type such as 'chapter', 'notes', 'audio', 'video', 'image', 'document', or 'tutorial'
- url (string) - response a valid and real url (crucial for deduplication)
- readingTime (string or null)
- rating (number or null)
- views (number or string)
- subject (string) — subject or category of the resource
- content (string) — brief summary or content description
- course (string) — the course name "${user.course}"

Return only JSON array, strictly without extra text or comments.
`;
  }, [user]);

  // Fetch AI recommendations effect
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user || !aiPrompt || aiRecommendedResources.length > 0 || isFetchingAi) {
        return;
      }

      setIsFetchingAi(true);
      setLoading(true);
      setError('');
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(aiPrompt);
        const responseText = result.response.text();

        try {
          const cleanedResponse = responseText.replace(/```json\n?|\n?```/g, '').trim();
          const parsedResources = JSON.parse(cleanedResponse);

          if (Array.isArray(parsedResources) && parsedResources.length > 0) {
            setAiRecommendedResources(parsedResources);
            saveToStudentDatabase(parsedResources);
            setError('');
          } else {
            setError("AI response was not a valid JSON array or was empty. Please try again.");
            setAiRecommendedResources([]);
          }
        } catch (jsonParseError) {
          setError(`Failed to parse AI response: ${jsonParseError.message}`);
          setAiRecommendedResources([]);
        }
      } catch (apiError) {
        setError(`Failed to fetch AI recommendations: ${apiError.message}`);
      } finally {
        setLoading(false);
        setIsFetchingAi(false);
      }
    };

    fetchRecommendations();
  }, [user, aiPrompt, aiRecommendedResources.length, isFetchingAi, saveToStudentDatabase]);

  // Merge user's library items and AI recommended resources
  useEffect(() => {
    if (!user) return;

    const userLibrary = Array.isArray(user.libraryItems) ? user.libraryItems : [];
    const aiResources = Array.isArray(aiRecommendedResources) ? aiRecommendedResources : [];

    const seenUrls = new Set();
    const merged = [];

    userLibrary.forEach(item => {
      if (item.url && !seenUrls.has(item.url)) {
        merged.push(item);
        seenUrls.add(item.url);
      } else if (!item.url) {
        merged.push(item);
      }
    });

    aiResources.forEach(aiRes => {
      if (aiRes.url && !seenUrls.has(aiRes.url)) {
        merged.push(aiRes);
        seenUrls.add(aiRes.url);
      }
    });

    setCombinedLibrary(merged);
  }, [user, aiRecommendedResources]);

  // Helper functions for icons and colors
  const getTypeIcon = useMemo(() => (type) => ({
    chapter: BookOpen,
    notes: FileText,
    audio: Headphones,
    video: Video,
    image: Image,
    document: FileText,
    tutorial: BookOpen
  }[type] || BookOpen), []);

  const getTypeColor = useMemo(() => (type) => ({
    chapter: 'text-blue-500',
    notes: 'text-green-500',
    audio: 'text-purple-500',
    video: 'text-red-500',
    image: 'text-yellow-500',
    document: 'text-indigo-500',
    tutorial: 'text-orange-500'
  }[type] || 'text-gray-500'), []);

  const getTagBgColor = useMemo(() => (type) => ({
    chapter: 'bg-blue-500',
    notes: 'bg-green-500',
    audio: 'bg-purple-500',
    video: 'bg-red-500',
    image: 'bg-yellow-500',
    document: 'bg-indigo-500',
    tutorial: 'bg-orange-500'
  }[type] || 'bg-gray-500'), []);

  // Generate test questions for a resource
  const generateTestQuestions = async (resource) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `
Generate 5 multiple-choice questions based on the following resource:
Title: ${resource.title}
Description: ${resource.description}
Subject: ${resource.subject}
Type: ${resource.type}

For each question, provide:
- question (string)
- options (array of 4 strings)
- correct (number, index of correct answer 0-3)
- explanation (string)

Return only JSON array format, no extra text.
`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      const cleanedResponse = responseText.replace(/```json\n?|\n?```/g, '').trim();
      const questions = JSON.parse(cleanedResponse);

      return Array.isArray(questions) ? questions : [];
    } catch (error) {
      console.error('Error generating test questions:', error);
      return [];
    }
  };

  // Handle test start
  const handleStartTest = async (resource) => {
    setCurrentTestResource(resource);
    setShowTestModal(true);
    setTestAnswers({});
    setTestResults(null);
    
    const questions = await generateTestQuestions(resource);
    setTestQuestions(questions);
  };

  // Handle test submission
  const handleSubmitTest = () => {
    if (!testQuestions.length) return;

    let correctCount = 0;
    const results = testQuestions.map((question, index) => {
      const userAnswer = testAnswers[index];
      const isCorrect = userAnswer === question.correct;
      if (isCorrect) correctCount++;

      return {
        question: question.question,
        userAnswer: userAnswer !== undefined ? question.options[userAnswer] : 'Not answered',
        correctAnswer: question.options[question.correct],
        isCorrect,
        explanation: question.explanation
      };
    });

    const score = Math.round((correctCount / testQuestions.length) * 100);
    
    setTestResults({
      score,
      correctCount,
      totalQuestions: testQuestions.length,
      results,
      resource: currentTestResource
    });

    setShowTestModal(false);
    setShowTestResults(true);
  };

  // Filter library
  const filteredLibrary = combinedLibrary.filter(resource => {
    if (filterType !== 'all' && resource.type !== filterType) {
      return false;
    }
    
    const search = searchTerm.toLowerCase();
    if (search.length === 0) return true;

    const inTitle = resource.title?.toLowerCase().includes(search);
    const inDescription = resource.description?.toLowerCase().includes(search);
    const inTags = resource.tags?.some(tag => typeof tag === 'string' && tag.toLowerCase().includes(search));
    const inSubject = resource.subject?.toLowerCase().includes(search);

    return inTitle || inDescription || inTags || inSubject;
  });

  // Conditional rendering for loading and errors
  if (loading && !user && !error) {
    return (
      <div className="library-loading">
        <div className="library-spinner"></div>
        <p>Loading user data...</p>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="library-error">
        <h2>Error Loading User Data</h2>
        <p>{error}</p>
        <p>Please ensure you are logged in and the server is running.</p>
      </div>
    );
  }

  return (
    <div className="library-root">
      {/* Header Section - MyBatch Style */}
      <div className="library-header">
        <div className="library-header-content">
          <h1 className="library-title">Digital Library</h1>
          <p className="library-subtitle">Discover and manage your learning resources</p>
        </div>
        <button className="library-btn library-btn-create" type="button">
          <Plus size={18} /> Add Resource
        </button>
      </div>

      {/* Search and Filter Section - MyBatch Style */}
      <div className="library-searchfilter">
        <div className="library-searchbox">
          <Search className="library-searchicon" size={18} />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="library-input"
            aria-label="Search library"
          />
        </div>

        <div className="library-filterbox">
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="library-select"
            aria-label="Filter library by type"
          >
            <option value="all">All Types</option>
            <option value="chapter">Chapters</option>
            <option value="notes">Notes</option>
            <option value="audio">Audio</option>
            <option value="video">Videos</option>
            <option value="image">Images</option>
            <option value="document">Documents</option>
            <option value="tutorial">Tutorials</option>
          </select>

          <div className="library-view-toggle">
            <button
              onClick={() => setViewMode('grid')}
              className={`library-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              aria-label="Grid view"
              type="button"
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`library-view-btn ${viewMode === 'list' ? 'active' : ''}`}
              aria-label="List view"
              type="button"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="library-content">
        <div className="library-section-header">
          <h2 className="library-section-title">
            Resources for <span className="highlight-course">{user?.course || 'your course'}</span>
          </h2>
          <div className="library-stats">
            <span>{filteredLibrary.length} resources found</span>
          </div>
        </div>

        {loading && (
          <div className="library-loading-state">
            <div className="library-spinner"></div>
            <p>Loading resources...</p>
          </div>
        )}

        {error && (
          <div className="library-error-state">
            <p>Error: {error}</p>
          </div>
        )}

        {!loading && !error && combinedLibrary.length === 0 && (
          <div className="library-empty-state">
            <BookOpen size={48} />
            <h3>No resources available</h3>
            <p>Try refreshing or check your user data and API key.</p>
          </div>
        )}

        {combinedLibrary.length > 0 && (
          <div className={`library-grid ${viewMode}`}>
            {filteredLibrary.map((item, index) => {
              const TypeIcon = getTypeIcon(item.type);
              return (
                <div
                  key={item.url || `item-${index}`}
                  className={`library-card ${viewMode}`}
                >
                  {/* Card Badge */}
                  <div className="library-card-badge">
                    {item.type}
                  </div>

                  {/* Card Header */}
                  <div className="library-card-header">
                    <div className="library-card-icon-title">
                      <TypeIcon className={`library-card-icon ${getTypeColor(item.type)}`} size={24} />
                      <h3 className="library-card-title">{item.title}</h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="library-card-content">
                    <p className="library-card-description">{item.description}</p>

                    {/* Tags */}
                    {item.tags && Array.isArray(item.tags) && (
                      <div className="library-card-tags">
                        {item.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`library-card-tag ${getTagBgColor(item.type)}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Meta Information */}
                    <div className="library-card-meta">
                      {item.readingTime && (
                        <div className="library-meta-item">
                          <Clock size={14} />
                          <span>{item.readingTime}</span>
                        </div>
                      )}
                      {(item.rating !== null && item.rating !== undefined) && (
                        <div className="library-meta-item">
                          <Star size={14} />
                          <span>{item.rating}/5</span>
                        </div>
                      )}
                      {(item.views !== null && item.views !== undefined) && (
                        <div className="library-meta-item">
                          <Eye size={14} />
                          <span>{item.views} views</span>
                        </div>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="library-card-actions">
                      {item.url && (
                        <a
                          href={item.url}
                          className="library-btn library-btn-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={14} />
                          View Resource
                        </a>
                      )}
                      
                      <button
                        className="library-btn library-btn-secondary"
                        onClick={() => handleStartTest(item)}
                        type="button"
                      >
                        <Award size={14} />
                        Take Test
                      </button>
                      
                      <button
                        className="library-btn library-btn-bookmark"
                        type="button"
                      >
                        <Bookmark size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Test Modal */}
      {showTestModal && currentTestResource && (
        <div className="library-modal-overlay">
          <div className="library-modal-content library-test-modal">
            <div className="library-modal-header">
              <h2>Test: {currentTestResource.title}</h2>
              <button
                className="library-modal-close"
                onClick={() => setShowTestModal(false)}
                type="button"
              >
                ×
              </button>
            </div>

            <div className="library-test-content">
              {testQuestions.length === 0 ? (
                <div className="library-test-loading">
                  <div className="library-spinner"></div>
                  <p>Generating test questions...</p>
                </div>
              ) : (
                <>
                  <p className="library-test-instruction">
                    Answer the following questions based on the resource content.
                  </p>

                  {testQuestions.map((question, qIndex) => (
                    <div className="library-test-question" key={qIndex}>
                      <h4 className="library-question-text">
                        {qIndex + 1}. {question.question}
                      </h4>
                      
                      <div className="library-options-grid">
                        {question.options.map((option, oIndex) => (
                          <label
                            className={`library-option-label ${testAnswers[qIndex] === oIndex ? 'selected' : ''}`}
                            key={oIndex}
                          >
                            <input
                              type="radio"
                              name={`q${qIndex}`}
                              value={oIndex}
                              checked={testAnswers[qIndex] === oIndex}
                              onChange={() => setTestAnswers({...testAnswers, [qIndex]: oIndex})}
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="library-test-actions">
                    <button
                      className="library-btn library-btn-secondary"
                      onClick={() => setShowTestModal(false)}
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      className="library-btn library-btn-primary"
                      onClick={handleSubmitTest}
                      disabled={Object.keys(testAnswers).length < testQuestions.length}
                      type="button"
                    >
                      Submit Test
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Test Results Modal */}
      {showTestResults && testResults && (
        <div className="library-modal-overlay">
          <div className="library-modal-content library-results-modal">
            <div className="library-modal-header">
              <h2>Test Results</h2>
              <button
                className="library-modal-close"
                onClick={() => setShowTestResults(false)}
                type="button"
              >
                ×
              </button>
            </div>

            <div className="library-results-content">
              {/* Score Display */}
              <div className="library-score-display">
                <div className="library-score-circle">
                  <span className="library-score-value">{testResults.score}%</span>
                </div>
                <p className="library-score-label">
                  {testResults.score >= 70 ? 'Great Job!' : 'Keep Learning!'}
                </p>
              </div>

              {/* Stats */}
              <div className="library-results-stats">
                <div className="library-stat-item">
                  <span className="library-stat-label">Questions</span>
                  <span className="library-stat-value">{testResults.totalQuestions}</span>
                </div>
                <div className="library-stat-item">
                  <span className="library-stat-label">Correct</span>
                  <span className="library-stat-value">{testResults.correctCount}</span>
                </div>
                <div className="library-stat-item">
                  <span className="library-stat-label">Score</span>
                  <span className="library-stat-value">{testResults.score}%</span>
                </div>
              </div>

              {/* Detailed Results */}
              <div className="library-detailed-results">
                <h3>Question Review</h3>
                {testResults.results.map((result, index) => (
                  <div
                    key={index}
                    className={`library-result-item ${result.isCorrect ? 'correct' : 'incorrect'}`}
                  >
                    <div className="library-result-question">
                      <strong>Q{index + 1}:</strong> {result.question}
                    </div>
                    <div className="library-result-answers">
                      <div className="library-result-answer">
                        <span className="library-answer-label">Your answer:</span>
                        <span className={`library-answer-value ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                          {result.userAnswer}
                        </span>
                      </div>
                      {!result.isCorrect && (
                        <div className="library-result-answer">
                          <span className="library-answer-label">Correct answer:</span>
                          <span className="library-answer-value correct">
                            {result.correctAnswer}
                          </span>
                        </div>
                      )}
                    </div>
                    {result.explanation && (
                      <div className="library-result-explanation">
                        <strong>Explanation:</strong> {result.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="library-results-actions">
                <button
                  className="library-btn library-btn-secondary"
                  onClick={() => setShowTestResults(false)}
                  type="button"
                >
                  Close
                </button>
                <button
                  className="library-btn library-btn-primary"
                  onClick={() => handleStartTest(testResults.resource)}
                  type="button"
                >
                  Retake Test
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;