import React, { useState } from 'react';
import {
  ShoppingCart,
  Star,
  Download,
  Search,
  Filter,
  BookOpen,
  Video,
  Headphones,
  FileText,
  Award,
  Users,
  Clock,
  Check,
  Zap,
  Gift,
  Package,
  Heart,
  Share2
} from 'lucide-react';
import './Store.css';

 const Store = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const user = {
    points: 3250
  };

  const products = [
    {
      id: 1,
      title: 'JEE Advanced Physics Complete Course',
      type: 'course',
      category: 'free',
      originalPrice: 2999,
      rating: 4.8,
      reviews: 1247,
      students: 15432,
      duration: '120 hours',
      instructor: 'Dr. Rajesh Sharma',
      description: 'Complete JEE Advanced Physics course with advanced problem-solving techniques',
      features: ['200+ Video Lectures', 'Interactive Quizzes', 'Detailed Solutions', 'Mock Tests'],
      image: 'https://images.pexels.com/photos/159832/science-formula-physics-school-159832.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
      badge: 'Most Popular',
      badgeColor: 'bg-green-500'
    },
    {
      id: 2,
      title: 'NEET Biology Video Lectures Bundle',
      type: 'video',
      category: 'free',
      originalPrice: 2199,
      rating: 4.9,
      reviews: 987,
      students: 12456,
      duration: '85 hours',
      instructor: 'Dr. Priya Patel',
      description: 'High-quality video lectures covering all NEET biology topics',
      features: ['HD Video Quality', 'Downloadable Content', 'Chapter-wise Tests', 'Mobile App Access'],
      image: 'https://images.pexels.com/photos/1242348/pexels-photo-1242348.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
      badge: 'New',
      badgeColor: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'AI Chapter Generator',
      type: 'tool',
      category: 'free',
      originalPrice: 199,
      rating: 4.7,
      reviews: 567,
      students: 8934,
      duration: 'Lifetime',
      instructor: 'IntelliLearn AI',
      description: 'AI-generated chapters for any topic or subject',
      features: ['Unlimited Chapters', 'Multi-language Support', 'Custom Difficulty', 'Export Options'],
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
      badge: 'Hot',
      badgeColor: 'bg-red-500'
    },
    {
      id: 4,
      title: 'Mathematics Formula Handbook',
      type: 'ebook',
      category: 'free',
      originalPrice: 299,
      rating: 4.6,
      reviews: 1834,
      students: 25678,
      duration: '150 pages',
      instructor: 'Prof. Kumar',
      description: 'Complete collection of important mathematical formulas and theorems',
      features: ['Searchable PDF', 'Quick Reference', 'Examples Included', 'Print Friendly'],
      image: 'https://images.pexels.com/photos/1496154/pexels-photo-1496154.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
      badge: 'Free',
      badgeColor: 'bg-green-500'
    },
    {
      id: 5,
      title: 'Chemistry Lab Simulation Software',
      type: 'software',
      category: 'free',
      originalPrice: 1199,
      rating: 4.5,
      reviews: 423,
      students: 5678,
      duration: '1 year license',
      instructor: 'ChemSoft Inc.',
      description: 'Interactive chemistry lab simulations for safe virtual experiments',
      features: ['50+ Experiments', 'Safety Guidelines', 'Result Analysis', 'Lab Reports'],
      image: 'https://images.pexels.com/photos/1366909/pexels-photo-1366909.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
      badge: 'Popular',
      badgeColor: 'bg-purple-500'
    },
    {
      id: 6,
      title: 'Study Planner & Goal Tracker',
      type: 'tool',
      category: 'free',
      originalPrice: 99,
      rating: 4.4,
      reviews: 2341,
      students: 45678,
      duration: 'Forever',
      instructor: 'ProductivityPro',
      description: 'Smart study planner with goal tracking and progress analytics',
      features: ['Custom Schedules', 'Progress Tracking', 'Reminders', 'Analytics'],
      image: 'https://images.pexels.com/photos/1366922/pexels-photo-1366922.jpeg?auto=compress&cs=tinysrgb&w=400&h=250',
      badge: 'Free',
      badgeColor: 'bg-green-500'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesType = filterType === 'all' || product.type === filterType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleDownload = (product) => {
    alert(`✅ ${product.title} added to your library! You earned 50 points.`);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'course': return BookOpen;
      case 'video': return Video;
      case 'ebook': return FileText;
      case 'software': return Package;
      case 'tool': return Zap;
      default: return BookOpen;
    }
  };

  return (
    <div className="store-container">
      <div className="store-header">
        <h1 className="store-title">Resource Library</h1>
        <p className="store-subtitle">
          Access thousands of educational resources, tools, and materials - all completely free!
        </p>
      </div>

      <div className="store-points-section">
        <div className="store-points-content">
          <div className="store-points-left">
            <h2 className="store-points-title">Your Points Balance</h2>
            <div className="store-points-display">
              <Star className="store-points-icon" />
              <span className="store-points-value">{user.points} Points</span>
            </div>
          </div>
          <div className="store-points-right">
            <p className="store-points-earn-title">Earn points by:</p>
            <ul className="store-points-earn-list">
              <li>• Downloading resources (+50 points)</li>
              <li>• Completing chapters (+25 points)</li>
              <li>• Taking quizzes (+15 points)</li>
              <li>• Daily login streak (+10 points)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="store-search-section">
        <div className="store-search-container">
          <div className="store-search-wrapper">
            <Search className="store-search-icon" />
            <input
              type="text"
              placeholder="Search courses, tools, and resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="store-search-input"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="store-filter-select"
          >
            <option value="all">All Types</option>
            <option value="course">Courses</option>
            <option value="video">Videos</option>
            <option value="ebook">E-books</option>
            <option value="software">Software</option>
            <option value="tool">Tools</option>
          </select>
        </div>
      </div>

      <div className="store-grid">
        {filteredProducts.map(product => {
          const TypeIcon = getTypeIcon(product.type);
          return (
            <div key={product.id} className="store-card">
              <div className="store-card-image-container">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="store-card-image"
                />
                <div className="store-card-badges">
                  <span className={`store-card-badge ${product.badgeColor}`}>
                    {product.badge}
                  </span>
                </div>
                <div className="store-card-type-icon">
                  <TypeIcon className="store-type-icon" />
                </div>
                <div className="store-card-free-badge">
                  FREE
                </div>
              </div>
              
              <div className="store-card-content">
                <h3 className="store-card-title">{product.title}</h3>
                <p className="store-card-description">{product.description}</p>
                
                <div className="store-card-rating">
                  <div className="store-rating-stars">
                    <Star className="store-star-icon" />
                    <span className="store-rating-value">{product.rating}</span>
                    <span className="store-rating-reviews">({product.reviews})</span>
                  </div>
                  <span className="store-instructor">{product.instructor}</span>
                </div>
                
                <div className="store-card-stats">
                  <div className="store-stat-item">
                    <Users className="store-stat-icon" />
                    <span>{product.students} students</span>
                  </div>
                  <div className="store-stat-item">
                    <Clock className="store-stat-icon" />
                    <span>{product.duration}</span>
                  </div>
                </div>
                
                <div className="store-card-features">
                  <ul className="store-features-list">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="store-feature-item">
                        <Check className="store-feature-check" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="store-card-price">
                  <div className="store-price-section">
                    <span className="store-price-free">FREE</span>
                    <span className="store-price-original">₹{product.originalPrice}</span>
                  </div>
                  
                  <div className="store-card-actions">
                    <button className="store-action-btn">
                      <Heart className="store-action-icon" />
                    </button>
                    <button className="store-action-btn">
                      <Share2 className="store-action-icon" />
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDownload(product)}
                  className="store-download-btn"
                >
                  <Download className="store-download-icon" />
                  <span>Download Free</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="store-empty-state">
          <Package className="store-empty-icon" />
          <h3 className="store-empty-title">No resources found</h3>
          <p className="store-empty-text">Try adjusting your search or filter criteria</p>
        </div>
      )}

      <div className="store-features-section">
        <h2 className="store-features-title">Why Choose IntelliLearn?</h2>
        <div className="store-features-grid">
          <div className="store-feature-card">
            <div className="store-feature-icon-wrapper blue">
              <Gift className="store-feature-icon" />
            </div>
            <h3 className="store-feature-card-title">100% Free</h3>
            <p className="store-feature-card-text">All resources are completely free. No hidden charges, no subscriptions.</p>
          </div>
          <div className="store-feature-card">
            <div className="store-feature-icon-wrapper green">
              <Award className="store-feature-icon" />
            </div>
            <h3 className="store-feature-card-title">High Quality</h3>
            <p className="store-feature-card-text">Curated content from expert educators and industry professionals.</p>
          </div>
          <div className="store-feature-card">
            <div className="store-feature-icon-wrapper purple">
              <Zap className="store-feature-icon" />
            </div>
            <h3 className="store-feature-card-title">AI-Powered</h3>
            <p className="store-feature-card-text">Personalized recommendations and AI-generated content tailored for you.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store; 
