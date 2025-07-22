import React, { useState } from 'react';
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
  Calendar
} from 'lucide-react';
import './Library.css';
import { GoogleGenerativeAI } from "@google/generative-ai";


 const Library = ({ onNavigate ,  currentUser = {}  }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTags, setSelectedTags] = useState([]);
  const { streak = 0, points = 0, avatar = '', name = 'User' ,cource = 'Electric engineering' } = currentUser;






  //librery links 
  const GOOGLE_API_KEY = "AIzaSyB2G1eKOy_4iwK8oiBVzsvkS9kjT20L0-U"; // <-- **IMPORTANT: REPLACE THIS WITH YOUR ACTUAL API KEY**
  const getGeminiModel = (modelName = "gemini-1.5-flash") => { // Using 1.5-flash for faster responses
    const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
    return genAI.getGenerativeModel({ model: modelName });
  };
  


  const prompt = `
I am a student currently pursuing a course in "${cource}". I have study batches or topics related to the following subjects and topics: ${libraryItems
  .map(item => `${item.subject}: ${item.tags.join(', ')}`)
  .join('; ')}.

Can you recommend me a list of the top 10 high-quality, free online resources (like articles, videos, PDFs, lectures, tutorials etc.) for these subjects and topics?

Make sure the resources are:
- Educational and trustworthy (published by universities, educators, or learning websites)
- Free to access
- Include a variety of formats (videos, PDFs, articles etc.)
- Include the title and the full URL of each item 

Return the recommendations in markdown format, like this:
1. **[Title of Resource](https://link.to/resource)** - A brief 1-line description.

Please retrieve and give me only free, publicly available resources.
`;


























  const libraryItems = [
    {
      id: 1,
      title: 'Mechanics - Chapter 1',
      type: 'chapter',
      subject: 'Physics',
      batch: 'JEE Main 2024 Physics',
      icon: BookOpen,
      color: 'bg-blue-500',
      content: 'Comprehensive chapter on classical mechanics covering Newton\'s laws, motion, and forces.',
      readTime: '45 min',
      lastAccessed: '2 days ago',
      bookmarked: true,
      tags: ['JEE', 'Physics', 'Mechanics'],
      rating: 4.8,
      views: 1247
    },
    {
      id: 2,
      title: 'Thermodynamics Notes',
      type: 'notes',
      subject: 'Physics',
      batch: 'JEE Main 2024 Physics',
      icon: FileText,
      color: 'bg-green-500',
      content: 'Personal notes on thermodynamics with key formulas and problem-solving strategies.',
      readTime: '30 min',
      lastAccessed: '1 day ago',
      bookmarked: false,
      tags: ['JEE', 'Physics', 'Thermodynamics'],
      rating: 4.6,
      views: 892
    },
    {
      id: 3,
      title: 'Optics Audio Summary',
      type: 'audio',
      subject: 'Physics',
      batch: 'JEE Main 2024 Physics',
      icon: Headphones,
      color: 'bg-purple-500',
      content: 'Audio summary of optics chapter covering reflection, refraction, and interference.',
      readTime: '25 min',
      lastAccessed: '3 days ago',
      bookmarked: true,
      tags: ['JEE', 'Physics', 'Optics'],
      rating: 4.7,
      views: 634
    },
    {
      id: 4,
      title: 'Organic Chemistry Video',
      type: 'video',
      subject: 'Chemistry',
      batch: 'NEET Chemistry',
      icon: Video,
      color: 'bg-red-500',
      content: 'Video explanation of organic chemistry reactions and mechanisms.',
      readTime: '60 min',
      lastAccessed: '1 week ago',
      bookmarked: false,
      tags: ['NEET', 'Chemistry', 'Organic'],
      rating: 4.9,
      views: 2341
    },
    {
      id: 5,
      title: 'Cell Biology Diagrams',
      type: 'image',
      subject: 'Biology',
      batch: 'NEET Biology',
      icon: Image,
      color: 'bg-yellow-500',
      content: 'Collection of detailed cell biology diagrams and illustrations.',
      readTime: '15 min',
      lastAccessed: '5 days ago',
      bookmarked: true,
      tags: ['NEET', 'Biology', 'Cell'],
      rating: 4.5,
      views: 1523
    },
    {
      id: 6,
      title: 'Calculus Problem Sets',
      type: 'chapter',
      subject: 'Mathematics',
      batch: 'JEE Mathematics',
      icon: BookOpen,
      color: 'bg-indigo-500',
      content: 'Advanced calculus problems with detailed solutions and explanations.',
      readTime: '90 min',
      lastAccessed: '2 weeks ago',
      bookmarked: false,
      tags: ['JEE', 'Mathematics', 'Calculus'],
      rating: 4.8,
      views: 987
    }
  ];

  const tags = ['JEE', 'NEET', 'Physics', 'Chemistry', 'Biology', 'Mathematics', 'Mechanics', 'Thermodynamics', 'Optics', 'Organic', 'Cell', 'Calculus'];

  const filteredItems = libraryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === 'all' || item.type === filterType;

    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => item.tags.includes(tag));

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
        <button className="library-add-btn">
          <Plus className="library-add-icon" />
          <span>Add Content</span>
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
              <div key={item.id} className="library-card">
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
                      <button className="library-action-btn">
                        <Share2 className="library-action-icon" />
                      </button>
                      <button className="library-action-btn">
                        <Download className="library-action-icon" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="library-card-tags">
                    {item.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="library-card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="library-open-btn">
                    Open
                  </button>
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
                <div key={item.id} className="library-list-item">
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
                        
                        <button className="library-open-btn">
                          Open
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {filteredItems.length === 0 && (
        <div className="library-empty-state">
          <BookOpen className="library-empty-icon" />
          <h3 className="library-empty-title">No content found</h3>
          <p className="library-empty-text">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Library;