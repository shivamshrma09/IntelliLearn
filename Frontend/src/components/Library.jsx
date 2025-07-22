import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  BookOpen,
  FileText,
  Headphones,
  Video,
  Image,
  Download,
  Share2,
  Star,
  Clock,
  Eye,
  Bookmark,
  Plus,
  Grid,
  List,
  Tag,
  Calendar,
  ThumbsUp
} from 'lucide-react';
import './Library.css';

const Library = ({ onNavigate, currentUser = {} }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTags, setSelectedTags] = useState([]);
  const [libraryItems, setLibraryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const { streak = 0, points = 0, avatar = '', name = 'User', course = 'Computer Science' } = currentUser;

  // Fetch library items from API
  useEffect(() => {
    const fetchLibraryItems = async () => {
      try {
        setIsLoading(true);
        
        // Fetch from API
        const response = await fetch('/api/library/items', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch library items');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setLibraryItems(data.items);
        } else {
          throw new Error(data.message || 'Failed to fetch library items');
        }
      } catch (error) {
        console.error('Error fetching library items:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLibraryItems();
  }, []);
  
  // Handle loading more items
  const handleLoadMore = async () => {
    try {
      setIsLoadingMore(true);
      
      // Call API to generate more items
      const response = await fetch('/api/library/items/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ count: 10 })
      });
      
      if (!response.ok) {
        throw new Error('Failed to load more items');
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Add new items to existing ones
        setLibraryItems(prevItems => [...prevItems, ...data.items]);
      } else {
        throw new Error(data.message || 'Failed to load more items');
      }
    } catch (error) {
      console.error('Error loading more items:', error);
      setError(error.message);
    } finally {
      setIsLoadingMore(false);
    }
  };
  
  // Handle like functionality
  const handleLikeItem = async (itemId) => {
    try {
      // Call API to like/unlike item
      const response = await fetch(`/api/library/items/${itemId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to like item');
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Update local state
        setLibraryItems(prevItems => 
          prevItems.map(item => 
            item._id === itemId 
              ? { ...item, likes: data.likes, likedBy: data.likedBy }
              : item
          )
        );
      }
    } catch (error) {
      console.error('Error liking item:', error);
    }
  };

  // Extract all unique tags from library items
  const tags = [...new Set(libraryItems.flatMap(item => item.tags || []))];

  const filteredItems = libraryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === 'all' || item.type === filterType;

    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => item.tags?.includes(tag));

    return matchesSearch && matchesFilter && matchesTags;
  });

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'chapter': return BookOpen;
      case 'notes': return FileText;
      case 'audio': return Headphones;
      case 'video': return Video;
      case 'image': return Image;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'chapter': return 'bg-blue-500';
      case 'notes': return 'bg-green-500';
      case 'audio': return 'bg-purple-500';
      case 'video': return 'bg-red-500';
      case 'image': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="library-container">
      <div className="library-header">
        <div className="library-header-content">
          <h1 className="library-title">Library</h1>
          <p className="library-subtitle">
            Access all your saved content, notes, and learning materials
          </p>
        </div>
        <button 
          className="library-add-btn"
          onClick={handleLoadMore}
          disabled={isLoadingMore}
        >
          <Plus className="library-add-icon" />
          <span>{isLoadingMore ? 'Loading...' : 'Load More Content'}</span>
        </button>
      </div>
      
      {isLoading && (
        <div className="library-loading">
          <div className="library-loading-spinner"></div>
          <p>Loading library items...</p>
        </div>
      )}
      
      {error && (
        <div className="library-error">
          <p>Error loading library items: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      <div className="library-search-section">
        <div className="library-search-container">
          <div className="library-search-wrapper">
            <Search className="library-search-icon" />
            <input
              type="text"
              placeholder="Search library..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="library-search-input"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="library-filter-select"
          >
            <option value="all">All Types</option>
            <option value="chapter">Chapters</option>
            <option value="notes">Notes</option>
            <option value="audio">Audio</option>
            <option value="video">Videos</option>
            <option value="image">Images</option>
          </select>
          
          <div className="library-view-toggle">
            <button
              onClick={() => setViewMode('grid')}
              className={`library-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            >
              <Grid className="library-view-icon" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`library-view-btn ${viewMode === 'list' ? 'active' : ''}`}
            >
              <List className="library-view-icon" />
            </button>
          </div>
        </div>
        
        <div className="library-tags">
          <div className="library-tags-container">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`library-tag ${selectedTags.includes(tag) ? 'active' : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="library-grid">
          {filteredItems.map(item => {
            const Icon = getTypeIcon(item.type);
            return (
              <div key={item._id} className="library-card">
                <div className="library-card-content">
                  <div className="library-card-header">
                    <div className={`library-card-icon ${getTypeColor(item.type)}`}>
                      <Icon className="library-icon" />
                    </div>
                    <button className="library-bookmark-btn">
                      <Bookmark className={`library-bookmark-icon ${item.bookmarked ? 'bookmarked' : ''}`} />
                    </button>
                  </div>
                  
                  <h3 className="library-card-title">{item.title}</h3>
                  <p className="library-card-description">{item.content}</p>
                  
                  <div className="library-card-meta">
                    <div className="library-meta-item">
                      <Clock className="library-meta-icon" />
                      <span>{item.readTime}</span>
                    </div>
                    <div className="library-meta-item">
                      <Eye className="library-meta-icon" />
                      <span>{item.views}</span>
                    </div>
                  </div>
                  
                  <div className="library-card-footer">
                    <div className="library-rating">
                      <Star className="library-rating-icon" />
                      <span className="library-rating-text">{item.rating}</span>
                    </div>
                    <div className="library-actions">
                      <button 
                        className={`library-action-btn ${item.likedBy?.includes(currentUser?._id) ? 'active' : ''}`}
                        onClick={() => handleLikeItem(item._id)}
                      >
                        <ThumbsUp className="library-action-icon" />
                        <span className="library-like-count">{item.likes || 0}</span>
                      </button>
                      <button className="library-action-btn">
                        <Share2 className="library-action-icon" />
                      </button>
                      <button className="library-action-btn">
                        <Download className="library-action-icon" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="library-card-tags">
                    {item.tags?.slice(0, 3).map(tag => (
                      <span key={tag} className="library-card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="library-open-btn"
                  >
                    Open
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="library-list">
          <div className="library-list-container">
            {filteredItems.map(item => {
              const Icon = getTypeIcon(item.type);
              return (
                <div key={item._id} className="library-list-item">
                  <div className="library-list-content">
                    <div className={`library-list-icon ${getTypeColor(item.type)}`}>
                      <Icon className="library-icon" />
                    </div>
                    
                    <div className="library-list-details">
                      <div className="library-list-header">
                        <h3 className="library-list-title">{item.title}</h3>
                        <div className="library-list-actions">
                          <button className="library-bookmark-btn">
                            <Bookmark className={`library-bookmark-icon ${item.bookmarked ? 'bookmarked' : ''}`} />
                          </button>
                          <button 
                            className={`library-action-btn ${item.likedBy?.includes(currentUser?._id) ? 'active' : ''}`}
                            onClick={() => handleLikeItem(item._id)}
                          >
                            <ThumbsUp className="library-action-icon" />
                            <span className="library-like-count">{item.likes || 0}</span>
                          </button>
                          <button className="library-action-btn">
                            <Share2 className="library-action-icon" />
                          </button>
                          <button className="library-action-btn">
                            <Download className="library-action-icon" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="library-list-description">{item.content}</p>
                      
                      <div className="library-list-footer">
                        <div className="library-list-meta">
                          <div className="library-meta-item">
                            <Clock className="library-meta-icon" />
                            <span>{item.readTime}</span>
                          </div>
                          <div className="library-meta-item">
                            <Eye className="library-meta-icon" />
                            <span>{item.views}</span>
                          </div>
                          <div className="library-meta-item">
                            <Star className="library-rating-icon" />
                            <span>{item.rating}</span>
                          </div>
                          <div className="library-meta-item">
                            <Calendar className="library-meta-icon" />
                            <span>{item.lastAccessed}</span>
                          </div>
                        </div>
                        
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="library-open-btn"
                        >
                          Open
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {filteredItems.length === 0 && !isLoading && (
        <div className="library-empty-state">
          <BookOpen className="library-empty-icon" />
          <h3 className="library-empty-title">No content found</h3>
          <p className="library-empty-text">Try adjusting your search or filter criteria</p>
        </div>
      )}
      
      {filteredItems.length > 0 && !isLoading && (
        <div className="library-load-more">
          <button 
            className="library-load-more-btn"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? 'Loading more content...' : 'Load More Content'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Library;