import React, { useState } from 'react';
import { ShoppingCart, Star, Crown, Zap, BookOpen, Award, Filter, Search } from 'lucide-react';
import './Store.css';

export const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

   const products = [
    {
      id: 1,
      title: 'Premium Chapter Pack - Physics',
      description: 'Get 50 additional AI-generated physics chapters covering advanced topics',
      price: 299,
      originalPrice: 399,
      category: 'chapters',
      rating: 4.8,
      reviews: 156,
      image: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=300',
      badge: 'Popular',
      features: ['50 AI Chapters', 'Advanced Topics', 'Instant Access', 'Quiz Integration']
    },
    {
      id: 2,
      title: 'JEE Main Complete Course',
      description: 'Comprehensive JEE Main preparation with 200+ chapters and practice tests',
      price: 1999,
      originalPrice: 2999,
      category: 'courses',
      rating: 4.9,
      reviews: 342,
      image: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=300',
      badge: 'Best Seller',
      features: ['200+ Chapters', 'Mock Tests', 'Performance Analytics', '1 Year Access']
    },
    {
      id: 3,
      title: 'Premium Subscription',
      description: 'Unlock unlimited AI chapters, advanced features, and priority support',
      price: 599,
      originalPrice: null,
      category: 'subscription',
      rating: 4.7,
      reviews: 89,
      image: 'https://images.pexels.com/photos/3758104/pexels-photo-3758104.jpeg?auto=compress&cs=tinysrgb&w=300',
      badge: 'Premium',
      features: ['Unlimited Chapters', 'Advanced Analytics', 'Priority Support', 'All Features']
    },
    {
      id: 4,
      title: 'NEET Biology Master Pack',
      description: 'Complete NEET Biology preparation with detailed chapters and illustrations',
      price: 799,
      originalPrice: 999,
      category: 'courses',
      rating: 4.6,
      reviews: 78,
      image: 'https://images.pexels.com/photos/3585047/pexels-photo-3585047.jpeg?auto=compress&cs=tinysrgb&w=300',
      badge: 'New',
      features: ['Biology Focus', 'Detailed Illustrations', 'NEET Specific', 'Regular Updates']
    },
    {
      id: 5,
      title: 'Extra Quiz Attempts',
      description: 'Get 100 additional quiz attempts for unlimited practice',
      price: 99,
      originalPrice: null,
      category: 'features',
      rating: 4.4,
      reviews: 234,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
      badge: null,
      features: ['100 Quiz Attempts', 'Instant Activation', 'All Subjects', 'Valid for 30 Days']
    },
    {
      id: 6,
      title: 'AI Study Assistant',
      description: 'Get personalized study recommendations and doubt clearing',
      price: 499,
      originalPrice: 699,
      category: 'features',
      rating: 4.5,
      reviews: 67,
      image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=300',
      badge: 'AI Powered',
      features: ['Personalized Recommendations', 'Doubt Clearing', 'Study Schedule', 'Progress Tracking']
    }
  ];


  const categories = [
    { id: 'all', name: 'All Items', icon: ShoppingCart },
    { id: 'chapters', name: 'Chapters', icon: BookOpen },
    { id: 'courses', name: 'Courses', icon: Award },
    { id: 'subscription', name: 'Subscriptions', icon: Crown },
    { id: 'features', name: 'Features', icon: Zap }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getBadgeColor = (badge) => {
    if (!badge) return '';
    switch (badge) {
      case 'Popular': return 'store-badge-blue';
      case 'Best Seller': return 'store-badge-green';
      case 'Premium': return 'store-badge-purple';
      case 'New': return 'store-badge-orange';
      case 'AI Powered': return 'store-badge-gradient';
      default: return 'store-badge-gray';
    }
  };

  return (
    <div className="store-root">
      {/* Header */}
      <div className="store-header">
        <div>
          <h1 className="store-title">Store</h1>
          <p className="store-desc">Enhance your learning with premium content and features</p>
        </div>
        <div className="store-header-actions">
          <div className="store-search-wrap">
            <Search className="store-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="store-search-input"
            />
          </div>
          <button className="store-filter-btn">
            <Filter size={20} className="mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="store-categories">
        {categories.map(category => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`store-category-btn${selectedCategory === category.id ? ' active' : ''}`}
            >
              <Icon size={16} />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="store-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="store-card">
            <div className="store-card-img-wrap">
              <img 
                src={product.image} 
                alt={product.title}
                className="store-card-img"
              />
              {product.badge && (
                <div className={`store-card-badge ${getBadgeColor(product.badge)}`}>
                  {product.badge}
                </div>
              )}
            </div>
            
            <div className="store-card-body">
              <h3 className="store-card-title">{product.title}</h3>
              <p className="store-card-desc">{product.description}</p>
              
              <div className="store-card-rating-row">
                <div className="store-card-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < Math.floor(product.rating) ? 'store-star-filled' : 'store-star-empty'} 
                    />
                  ))}
                </div>
                <span className="store-card-reviews">({product.reviews})</span>
              </div>

              <div className="store-card-features">
                <ul>
                  {product.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="store-card-feature">
                      <div className="store-card-feature-dot"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="store-card-footer">
                <div className="store-card-price-row">
                  <span className="store-card-price">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="store-card-original-price">₹{product.originalPrice}</span>
                  )}
                </div>
                <button className="store-buy-btn">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="store-empty">
          <ShoppingCart size={48} className="store-empty-icon" />
          <h3>No products found</h3>
          <p>
            {searchQuery ? 'Try adjusting your search terms' : 'No products available in this category'}
          </p>
          <button 
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="store-viewall-btn"
          >
            View All Products
          </button>
        </div>
      )}

      {/* Subscription Banner */}
      <div className="store-subscription-banner">
        <div className="store-subscription-row">
          <div>
            <h2>Upgrade to Premium</h2>
            <p>Get unlimited access to all features and content</p>
            <ul>
              <li>• Unlimited AI-generated chapters</li>
              <li>• Advanced analytics and insights</li>
              <li>• Priority customer support</li>
              <li>• Custom batch creation</li>
            </ul>
          </div>
          <div className="store-subscription-price-col">
            <div className="store-subscription-price">₹599/month</div>
            <button className="store-subscription-btn">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
