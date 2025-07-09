import React, { useState } from 'react';
import { Search, Filter, BookOpen, FileText, Headphones, Video, Download, Share2, Star, Clock, Tag, Folder } from 'lucide-react';
import './Library.css';

export const Library = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedFolder, setSelectedFolder] = useState('all');

  const folders = [
    { id: 'all', name: 'All Items', count: 18 },
    { id: 'physics', name: 'Physics', count: 6 },
    { id: 'chemistry', name: 'Chemistry', count: 4 },
    { id: 'mathematics', name: 'Mathematics', count: 5 },
    { id: 'favorites', name: 'Favorites', count: 3 }
  ];

  const libraryItems = [
    {
      id: 1,
      title: 'Electromagnetic Induction Complete Guide',
      type: 'chapter',
      category: 'physics',
      format: 'text',
      subject: 'Physics',
      dateAdded: '2024-01-15',
      size: '2.4 MB',
      duration: '45 min read',
      isBookmarked: true,
      tags: ['JEE', 'NEET', 'Advanced'],
      thumbnail: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Comprehensive guide covering all aspects of electromagnetic induction including Faraday\'s law, Lenz\'s law, and applications.'
    },
    {
      id: 2,
      title: 'Organic Chemistry Reactions Audio Summary',
      type: 'audio',
      category: 'chemistry',
      format: 'audio',
      subject: 'Chemistry',
      dateAdded: '2024-01-14',
      size: '15.2 MB',
      duration: '25 min',
      isBookmarked: false,
      tags: ['NEET', 'Organic', 'Reactions'],
      thumbnail: 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Audio summary of important organic chemistry reactions with mechanisms and examples.'
    },
    {
      id: 3,
      title: 'Calculus Integration Techniques Video',
      type: 'video',
      category: 'mathematics',
      format: 'video',
      subject: 'Mathematics',
      dateAdded: '2024-01-13',
      size: '85.6 MB',
      duration: '18 min',
      isBookmarked: true,
      tags: ['JEE', 'Integration', 'Advanced'],
      thumbnail: 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Video tutorial covering advanced integration techniques including substitution, parts, and partial fractions.'
    },
    {
      id: 4,
      title: 'My Custom Notes - Modern History',
      type: 'notes',
      category: 'history',
      format: 'text',
      subject: 'History',
      dateAdded: '2024-01-12',
      size: '1.8 MB',
      duration: '30 min read',
      isBookmarked: false,
      tags: ['UPSC', 'Modern', 'Custom'],
      thumbnail: 'https://images.pexels.com/photos/1910225/pexels-photo-1910225.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Personal notes on modern Indian history covering major events, movements, and personalities.'
    },
    {
      id: 5,
      title: 'Thermodynamics Problem Solving Guide',
      type: 'chapter',
      category: 'physics',
      format: 'text',
      subject: 'Physics',
      dateAdded: '2024-01-11',
      size: '3.2 MB',
      duration: '55 min read',
      isBookmarked: true,
      tags: ['JEE', 'Thermodynamics', 'Problems'],
      thumbnail: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Step-by-step guide to solving thermodynamics problems with worked examples and practice questions.'
    },
    {
      id: 6,
      title: 'Biology Cell Structure Video Lecture',
      type: 'video',
      category: 'biology',
      format: 'video',
      subject: 'Biology',
      dateAdded: '2024-01-10',
      size: '120.4 MB',
      duration: '32 min',
      isBookmarked: false,
      tags: ['NEET', 'Cell', 'Structure'],
      thumbnail: 'https://images.pexels.com/photos/3585047/pexels-photo-3585047.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Detailed video lecture on cell structure covering organelles, functions, and cellular processes.'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'mathematics', name: 'Mathematics' },
    { id: 'biology', name: 'Biology' },
    { id: 'history', name: 'History' }
  ];

  const types = [
    { id: 'all', name: 'All Types' },
    { id: 'chapter', name: 'Chapters' },
    { id: 'notes', name: 'Notes' },
    { id: 'audio', name: 'Audio' },
    { id: 'video', name: 'Video' }
  ];

  const filteredItems = libraryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesFolder = selectedFolder === 'all' || 
                         (selectedFolder === 'favorites' && item.isBookmarked) ||
                         item.category === selectedFolder;
    return matchesSearch && matchesCategory && matchesType && matchesFolder;
  });

  const getFormatIcon = (format) => {
    switch (format) {
      case 'text': return <FileText size={16} className="icon-blue" />;
      case 'audio': return <Headphones size={16} className="icon-green" />;
      case 'video': return <Video size={16} className="icon-red" />;
      default: return <BookOpen size={16} className="icon-gray" />;
    }
  };

  return (
    <div className="library-root">
      {/* Header */}
      <div className="library-header">
        <div>
          <h1 className="library-title">My Library</h1>
          <p className="library-desc">Organize and access all your learning materials</p>
        </div>
        <div className="library-header-actions">
          <button className="library-filter-btn">
            <Filter size={20} className="mr-2" />
            Filter
          </button>
          <button className="library-newfolder-btn">
            <Folder size={20} className="mr-2" />
            New Folder
          </button>
        </div>
      </div>

      <div className="library-layout">
        {/* Sidebar */}
        <aside className="library-sidebar">
          <div className="library-sidebar-content">
            <h3 className="library-sidebar-title">Folders</h3>
            <div className="library-folder-list">
              {folders.map(folder => (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`library-folder-btn${selectedFolder === folder.id ? ' active' : ''}`}
                >
                  <div className="library-folder-btn-main">
                    <Folder size={16} className="mr-2" />
                    <span>{folder.name}</span>
                  </div>
                  <span className="library-folder-count">{folder.count}</span>
                </button>
              ))}
            </div>
            <div className="library-sidebar-quick">
              <h4>Quick Filters</h4>
              <div>
                <button className="library-quick-btn">
                  <Star size={14} className="icon-yellow mr-2" />
                  Bookmarked
                </button>
                <button className="library-quick-btn">
                  <Clock size={14} className="icon-blue mr-2" />
                  Recently Added
                </button>
                <button className="library-quick-btn">
                  <Download size={14} className="icon-green mr-2" />
                  Downloaded
                </button>
              </div>
            </div>
          </div>
        </aside>
        {/* Main Content */}
        <main className="library-main">
          {/* Search and Filters */}
          <div className="library-searchbar">
            <div className="library-searchbar-row">
              <div className="library-searchbar-search">
                <Search className="library-searchbar-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search your library..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="library-searchbar-input"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="library-searchbar-select"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="library-searchbar-select"
              >
                {types.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Library Items */}
          <div className="library-items-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="library-item-card">
                <div className="library-item-img-wrap">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="library-item-img"
                  />
                  <div className="library-item-format">
                    {getFormatIcon(item.format)}
                  </div>
                  <div className="library-item-duration">
                    {item.duration}
                  </div>
                </div>
                <div className="library-item-body">
                  <div className="library-item-title-row">
                    <h3 className="library-item-title">{item.title}</h3>
                    <button className="library-item-star">
                      <Star size={16} fill={item.isBookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <p className="library-item-desc">{item.description}</p>
                  <div className="library-item-tags">
                    {item.tags.map(tag => (
                      <span key={tag} className="library-item-tag">
                        <Tag size={10} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="library-item-meta">
                    <span>{item.subject}</span>
                    <span>{item.size}</span>
                  </div>
                  <div className="library-item-actions">
                    <span>{item.dateAdded}</span>
                    <div>
                      <button className="library-item-action-btn">
                        <Download size={16} />
                      </button>
                      <button className="library-item-action-btn">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="library-empty">
              <BookOpen size={48} className="icon-gray" />
              <h3>No items found</h3>
              <p>
                {searchQuery ? 'Try adjusting your search terms or filters' : 'Your library is empty. Start creating content to see it here.'}
              </p>
              <button className="library-empty-btn">
                Browse Courses
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
