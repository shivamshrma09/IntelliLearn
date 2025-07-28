import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Search, BookOpen, FileText, Headphones, Video, Image,
  Download, Share2, Star, Clock, Eye, Bookmark, Plus, Grid, List,
} from 'lucide-react';
import './Library.css';
import { GoogleGenerativeAI } from "@google/generative-ai";

// IMPORTANT: NEVER EXPOSE YOUR API KEY DIRECTLY IN CLIENT-SIDE CODE!
// For a production app, you MUST proxy this through your own backend server.
// For development, you might use an environment variable (e.g., process.env.REACT_APP_GEMINI_API_KEY)
// const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY); // Recommended way
const genAI = new GoogleGenerativeAI("AIzaSyBT9qazHDn2OdwUaAjYFpzbXIsTioc1ovY"); // Using your provided key for demonstration ONLY

const Library = () => {
  // State variables for component functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  // const [selectedTags, setSelectedTags] = useState([]); // Not currently used, can remove if not planned
  const [aiRecommendedResources, setAiRecommendedResources] = useState([]); // Stores parsed AI recommendations
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null); // Stores user data, initialized to null
  const [isFetchingAi, setIsFetchingAi] = useState(false); // Renamed for clarity to avoid conflict with general loading

  // State to store combined library data from user's saved items and AI recommendations
  const [combinedLibrary, setCombinedLibrary] = useState([]);

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

  // Function to save AI resources to student database (memoized)
  const saveToStudentDatabase = useCallback(async (resources) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn("No token found, can't save to student database");
        return;
      }

      const userCourse = user?.course || "Unknown Course";

      // Enrich AI resources with required fields for your backend
      // Ensure 'url' is always present as it's a key for deduplication and often required by the backend
      const enrichedResources = resources.map(item => ({
        ...item,
        url: item.url || '#', // Provide a fallback URL if missing
        course: userCourse,
        content: item.content || item.description || "No content provided", // Prioritize content, then description
        subject: (item.tags && item.tags.length > 0) ? item.tags[0] : "General",
        type: item.type || "document",
        views: parseViews(item.views),
      }));

      for (const resource of enrichedResources) {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:1000'}/students/add-library`, {
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
          // If a resource fails to save, you might want to handle it (e.g., skip or re-attempt)
        } else {
          const result = await res.json();
          console.log("Resource saved:", result.message);
        }
      }
    } catch (error) {
      console.error("Error saving to student database:", error.message);
    }
  }, [user, parseViews]); // Add user and parseViews to dependencies

  // --- Fetch User Data Effect ---
  // Fetches user data on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication token not found. Please log in.');
      // Optionally redirect to login page here
      return;
    }

    setLoading(true); // Indicate loading for user data
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:1000'}/students/user`, {
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
      setError(''); // Clear any previous errors
      // console.log("User data fetched:", data); // For debugging
    })
    .catch(err => {
      setError(err.message);
      console.error("User data fetch error:", err);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []); // Empty dependency array means it runs once on mount

  // AI Prompt (memoized)
  const aiPrompt = useMemo(() => {
    if (!user?.course) return ''; // Ensure user and user.course exist

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
      // Only fetch if user data is loaded, AI prompt is ready,
      // no previous AI recommendations, and not already fetching AI
      if (!user || !aiPrompt || aiRecommendedResources.length > 0 || isFetchingAi) {
        return;
      }

      setIsFetchingAi(true); // Set fetching state to true
      setLoading(true); // Show general loading indicator while AI fetches
      setError('');
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(aiPrompt);
        const responseText = result.response.text();
        // console.log("Raw AI Response:", responseText); // Log raw response for debugging

        try {
          // Clean response: remove markdown backticks (```json and ```)
          const cleanedResponse = responseText.replace(/```json\n?|\n?```/g, '').trim();
          const parsedResources = JSON.parse(cleanedResponse);

          if (Array.isArray(parsedResources) && parsedResources.length > 0) {
            setAiRecommendedResources(parsedResources);
            saveToStudentDatabase(parsedResources); // Save to backend
            setError('');
          } else {
            setError("AI response was not a valid JSON array or was empty. Please try again.");
            console.error("AI parsing error: Expected non-empty array, got", parsedResources);
            setAiRecommendedResources([]); // Clear potential bad data
          }
        } catch (jsonParseError) {
          setError(`Failed to parse AI response: ${jsonParseError.message}. Raw response: "${responseText.substring(0, 200)}..."`);
          console.error("JSON parsing error:", jsonParseError);
          setAiRecommendedResources([]);
        }
      } catch (apiError) {
        setError(`Failed to fetch AI recommendations: ${apiError.message}. Make sure your API key is valid and not exposed!`);
        console.error("Gemini API call error:", apiError);
      } finally {
        setLoading(false); // Hide general loading
        setIsFetchingAi(false); // Reset AI fetching state
      }
    };

    fetchRecommendations();
  }, [user, aiPrompt, aiRecommendedResources.length, isFetchingAi, saveToStudentDatabase]); // Added saveToStudentDatabase to dependencies

  // Merge user's library items and AI recommended resources into combinedLibrary
  useEffect(() => {
    if (!user) return;

    // Ensure user.libraryItems is treated as an array; backend might return null or undefined
    const userLibrary = Array.isArray(user.libraryItems) ? user.libraryItems : [];
    const aiResources = Array.isArray(aiRecommendedResources) ? aiRecommendedResources : [];

    // console.log("Merging: User Library:", userLibrary); // Debugging
    // console.log("Merging: AI Resources:", aiResources); // Debugging

    // Create a Set to keep track of seen URLs for deduplication
    const seenUrls = new Set();
    const merged = [];

    // Add user's existing library items first
    userLibrary.forEach(item => {
      if (item.url && !seenUrls.has(item.url)) {
        merged.push(item);
        seenUrls.add(item.url);
      } else if (!item.url) { // If user's item has no URL, still add it if it's unique by title/description
          // Fallback for items without URLs. Be cautious with this as it's less reliable for deduplication.
          // For simplicity, let's assume URLs are always present and unique for now.
          merged.push(item);
      }
    });

    // Add AI resources, avoiding duplicates by URL
    aiResources.forEach(aiRes => {
      // Only add if it has a URL and that URL hasn't been seen before
      if (aiRes.url && !seenUrls.has(aiRes.url)) {
        merged.push(aiRes);
        seenUrls.add(aiRes.url);
      }
    });

    setCombinedLibrary(merged);
    // console.log("Combined Library:", merged); // Debugging
  }, [user, aiRecommendedResources]); // Re-run when user or AI recommendations change

  // Helper functions for icons and colors (memoized for performance)
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


  // Conditional rendering for initial loading and errors
  if (loading && !user && !error) {
    return <div className="loading-screen">Loading user data...</div>;
  }

  if (error && !user) {
    return (
      <div className="error-screen">
        <h2>Error Loading User Data</h2>
        <p>{error}</p>
        <p>Please ensure you are logged in and the server is running.</p>
      </div>
    );
  }

  // Filter combinedLibrary according to searchTerm and filterType
  const filteredLibrary = combinedLibrary.filter(resource => {
    // Filter by resource type if a specific filter is selected
    if (filterType !== 'all' && resource.type !== filterType) {
      return false;
    }
    // Filter by search term in title, description, tags, or subject
    const search = searchTerm.toLowerCase();
    if (search.length === 0) return true;

    const inTitle = resource.title?.toLowerCase().includes(search);
    const inDescription = resource.description?.toLowerCase().includes(search);
    const inTags = resource.tags?.some(tag => typeof tag === 'string' && tag.toLowerCase().includes(search)); // Added type check for tags
    const inSubject = resource.subject?.toLowerCase().includes(search);

    return inTitle || inDescription || inTags || inSubject;
  });

  return (
    <div className="library-container">
      <div className="library-header">
        <div className="library-header-content">
          <h1 className="library-title">Library</h1>
          <p className="library-subtitle">Access all your saved content and discover new resources!</p>
        </div>
        <button className="library-add-btn" type="button">
          <Plus className="library-add-icon" /> Add Content
        </button>
      </div>

      <div className="library-search-section">
        <div className="library-search-container">
          <div className="library-search-wrapper">
            <Search className="library-search-icon" />
            <input
              type="text"
              placeholder="Search library..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="library-search-input"
              aria-label="Search library"
            />
          </div>

          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="library-filter-select"
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
              <Grid className="library-view-icon" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`library-view-btn ${viewMode === 'list' ? 'active' : ''}`}
              aria-label="List view"
              type="button"
            >
              <List className="library-view-icon" />
            </button>
          </div>
        </div>
      </div>

      <div className="ai-resources-section">
        <h2 className="ai-resources-heading">
          Resources for <span className="highlight-course">{user?.course || 'your course'}</span>
        </h2>

        {loading && <p className="loading-message">Loading resources...</p>}
        {error && <p className="error-message">Error: {error}</p>}
        {!loading && !error && combinedLibrary.length === 0 && (
          <p className="no-resources-message">No resources available yet. Try refreshing or check your user data and API key.</p>
        )}

        {combinedLibrary.length > 0 && (
          <div className={`library-items-display ${viewMode}`}>
            {filteredLibrary.map((item, index) => {
              const TypeIcon = getTypeIcon(item.type);
              return (
                <div
                  key={item.url || `item-${index}`} // Use URL as key if unique, fallback to index
                  className={`library-item-card ${viewMode}`}
                >
                  <div className="item-header">
                    <TypeIcon className={`item-icon ${getTypeColor(item.type)}`} size={24} />
                    <h3 className="item-title">
                      {item.title}
                    </h3>
                  </div>

                  {/* New div to group content for list view flexibility */}
                  <div className="item-details">
                    <p className="item-description">
                      {item.description}
                    </p>

                    <div className="item-tags">
                      <ul>
                        {item.tags && Array.isArray(item.tags) && item.tags.map((tag, tagIndex) => (
                          <li
                            key={tagIndex}
                            className={`item-tag ${getTagBgColor(item.type)}`}
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="item-meta">
                      {item.readingTime && (
                        <div>
                          <Clock size={14} /> {item.readingTime}
                        </div>
                      )}
                      {(item.rating !== null && item.rating !== undefined) && ( // Check for null/undefined
                        <div>
                          <Star size={14} /> {item.rating}/5 Rating
                        </div>
                      )}
                      {(item.views !== null && item.views !== undefined) && ( // Check for null/undefined
                        <div>
                          <Eye size={14} /> {item.views} Views
                        </div>
                      )}
                    </div>

                    <div className="item-footer">
                      {item.url && ( // Only render link if URL exists
                        <a
                          href={item.url}
                          className="item-url-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Go to Resource <Share2 size={14} />
                        </a>
                      )}
                    </div>
                  </div> {/* End item-details */}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;