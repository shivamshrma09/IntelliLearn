import React, { useState } from 'react';
import { Gift, Calendar, MapPin, Users, Clock, ExternalLink, Filter, Search, Star } from 'lucide-react';
import './Opportunities.css';

export const Opportunities = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const opportunities = [
    {
      id: 1,
      title: 'National Science Scholarship 2024',
      description: 'Merit-based scholarship for students pursuing science education',
      type: 'scholarship',
      amount: '₹50,000',
      deadline: '2024-03-15',
      eligibility: 'Class 12 Science students',
      location: 'National',
      provider: 'Government of India',
      applicants: 2500,
      image: 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=300',
      featured: true
    },
    {
      id: 2,
      title: 'JEE Main 2024 Registration',
      description: 'Register for JEE Main 2024 - India\'s premier engineering entrance exam',
      type: 'exam',
      amount: 'Free',
      deadline: '2024-02-28',
      eligibility: 'Class 12 passed/appearing',
      location: 'National',
      provider: 'NTA',
      applicants: 1200000,
      image: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=300',
      featured: true
    },
    {
      id: 3,
      title: 'KVPY Research Fellowship',
      description: 'Kishore Vaigyanik Protsahan Yojana for science research aptitude',
      type: 'fellowship',
      amount: '₹7,000/month',
      deadline: '2024-02-20',
      eligibility: 'Class 11, 12 & B.Sc students',
      location: 'National',
      provider: 'IISC Bangalore',
      applicants: 85000,
      image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=300',
      featured: false
    },
    {
      id: 4,
      title: 'NEET 2024 Registration',
      description: 'National medical entrance exam registration now open',
      type: 'exam',
      amount: '₹1,700',
      deadline: '2024-03-10',
      eligibility: 'Class 12 with Biology',
      location: 'National',
      provider: 'NTA',
      applicants: 1800000,
      image: 'https://images.pexels.com/photos/3585047/pexels-photo-3585047.jpeg?auto=compress&cs=tinysrgb&w=300',
      featured: true
    },
    {
      id: 5,
      title: 'State Merit Scholarship',
      description: 'State government scholarship for academically excellent students',
      type: 'scholarship',
      amount: '₹25,000',
      deadline: '2024-04-01',
      eligibility: 'State board toppers',
      location: 'State Level',
      provider: 'State Government',
      applicants: 15000,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
      featured: false
    },
    {
      id: 6,
      title: 'UPSC CSE Notification',
      description: 'Civil Services Examination notification released',
      type: 'exam',
      amount: '₹200',
      deadline: '2024-03-25',
      eligibility: 'Graduate degree',
      location: 'National',
      provider: 'UPSC',
      applicants: 950000,
      image: 'https://images.pexels.com/photos/1910225/pexels-photo-1910225.jpeg?auto=compress&cs=tinysrgb&w=300',
      featured: false
    }
  ];
  const categories = [
    { id: 'all', name: 'All Opportunities' },
    { id: 'scholarship', name: 'Scholarships' },
    { id: 'exam', name: 'Exams' },
    { id: 'fellowship', name: 'Fellowships' },
    { id: 'internship', name: 'Internships' }
  ];

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesCategory = selectedCategory === 'all' || opportunity.type === selectedCategory;
    const matchesSearch = opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opportunity.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTypeColor = (type) => {
    switch (type) {
      case 'scholarship': return 'opportunity-scholarship';
      case 'exam': return 'opportunity-exam';
      case 'fellowship': return 'opportunity-fellowship';
      case 'internship': return 'opportunity-internship';
      default: return 'opportunity-default';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'scholarship': return <Gift size={16} />;
      case 'exam': return <Calendar size={16} />;
      case 'fellowship': return <Star size={16} />;
      case 'internship': return <Users size={16} />;
      default: return <Gift size={16} />;
    }
  };

  const getDaysRemaining = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="opportunities-root">
      {/* Header */}
      <div className="opportunities-header">
        <div>
          <h1 className="opportunities-title">Opportunities</h1>
          <p className="opportunities-desc">Discover scholarships, exams, and career opportunities</p>
        </div>
        <div className="opportunities-header-actions">
          <div className="opportunities-search-wrap">
            <Search className="opportunities-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="opportunities-search-input"
            />
          </div>
          <button className="opportunities-filter-btn">
            <Filter size={20} className="mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="opportunities-categories">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`opportunities-category-btn${selectedCategory === category.id ? ' active' : ''}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Featured Opportunities Banner */}
      <div className="opportunities-featured-banner">
        <h2>🎯 Featured Opportunities</h2>
        <p>Don't miss out on these high-value opportunities with approaching deadlines</p>
        <div className="opportunities-featured-grid">
          {opportunities.filter(op => op.featured).slice(0, 2).map(opportunity => (
            <div key={opportunity.id} className="opportunities-featured-card">
              <h3>{opportunity.title}</h3>
              <p>{opportunity.description}</p>
              <div className="opportunities-featured-info">
                <span>{opportunity.amount}</span>
                <span>{getDaysRemaining(opportunity.deadline)} days left</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="opportunities-grid">
        {filteredOpportunities.map(opportunity => (
          <div key={opportunity.id} className="opportunities-card">
            <div className="opportunities-card-img-wrap">
              <img 
                src={opportunity.image} 
                alt={opportunity.title}
                className="opportunities-card-img"
              />
              {opportunity.featured && (
                <div className="opportunities-card-featured-badge">
                  Featured
                </div>
              )}
              <div className="opportunities-card-typeicon">
                <div className={`opportunities-typeicon ${getTypeColor(opportunity.type)}`}>
                  {getTypeIcon(opportunity.type)}
                </div>
              </div>
            </div>
            <div className="opportunities-card-body">
              <div className="opportunities-card-type-row">
                <span className={`opportunities-typebadge ${getTypeColor(opportunity.type)}`}>
                  {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
                </span>
                <span className="opportunities-amount">{opportunity.amount}</span>
              </div>
              <h3 className="opportunities-card-title">{opportunity.title}</h3>
              <p className="opportunities-card-desc">{opportunity.description}</p>
              <div className="opportunities-card-meta">
                <div><Calendar size={14} className="mr-2" />Deadline: {opportunity.deadline}</div>
                <div><MapPin size={14} className="mr-2" />{opportunity.location}</div>
                <div><Users size={14} className="mr-2" />{opportunity.applicants.toLocaleString()} applicants</div>
              </div>
              <div className="opportunities-card-eligibility">
                <p><span>Eligibility:</span> {opportunity.eligibility}</p>
                <p><span>Provider:</span> {opportunity.provider}</p>
              </div>
              <div className="opportunities-card-footer">
                <div className="opportunities-card-daysleft">
                  <Clock size={14} className="mr-1" />
                  <span>{getDaysRemaining(opportunity.deadline)} days left</span>
                </div>
                <button className="opportunities-apply-btn">
                  <span>Apply Now</span>
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOpportunities.length === 0 && (
        <div className="opportunities-empty">
          <Gift size={48} className="opportunities-empty-icon" />
          <h3>No opportunities found</h3>
          <p>
            {searchQuery ? 'Try adjusting your search terms' : 'No opportunities available in this category'}
          </p>
          <button 
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="opportunities-viewall-btn"
          >
            View All Opportunities
          </button>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="opportunities-newsletter">
        <div className="opportunities-newsletter-inner">
          <h3>Never Miss an Opportunity</h3>
          <p>Get notified about new scholarships, exams, and career opportunities</p>
          <div className="opportunities-newsletter-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="opportunities-newsletter-input"
            />
            <button className="opportunities-newsletter-btn">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
