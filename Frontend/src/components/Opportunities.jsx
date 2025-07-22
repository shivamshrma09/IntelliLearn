import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Calendar,
  MapPin,
  Users,
  ExternalLink,
  Search,
  Filter,
  Star,
  Clock,
  Award,
  GraduationCap,
  BookOpen,
  Target,
  AlertCircle,
  CheckCircle,
  Bell,
  Code,
  Zap,
  Globe,
  Briefcase,
  School,
  Loader
} from 'lucide-react';
import './Opportunities.css';


 const Opportunities = ({ onNavigate, currentUser = {} }) => {
  const [activeTab, setActiveTab] = useState('scholarships');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  
  // Handle loading more opportunities
  const handleLoadMore = async () => {
    try {
      setIsLoadingMore(true);
      
      // Call API to generate more opportunities
      const response = await fetch('/api/opportunities/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ count: 5 })
      });
      
      if (!response.ok) {
        throw new Error('Failed to load more opportunities');
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Add new opportunities to existing ones
        setOpportunities(prevItems => [...prevItems, ...data.opportunities]);
      } else {
        throw new Error(data.message || 'Failed to load more opportunities');
      }
    } catch (error) {
      console.error('Error loading more opportunities:', error);
      setError(error.message);
    } finally {
      setIsLoadingMore(false);
    }
  };
  
  // Fetch opportunities from API
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setIsLoading(true);
        
        // Fetch from API
        const response = await fetch('/api/opportunities', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch opportunities');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setOpportunities(data.opportunities);
        } else {
          throw new Error(data.message || 'Failed to fetch opportunities');
        }
      } catch (error) {
        console.error('Error fetching opportunities:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOpportunities();
  }, []);
  
  // Define opportunity counts by type
  const [opportunityCounts, setOpportunityCounts] = useState({
    scholarships: 0,
    competitions: 0,
    exams: 0,
    internships: 0,
    hackathons: 0
  });
  
  // Update opportunity counts when opportunities change
  useEffect(() => {
    if (opportunities.length > 0) {
      const counts = {
        scholarships: 0,
        competitions: 0,
        exams: 0,
        internships: 0,
        hackathons: 0
      };
      
      opportunities.forEach(item => {
        switch (item.type) {
          case 'Scholarship': counts.scholarships++; break;
          case 'Competition': counts.competitions++; break;
          case 'Exam': counts.exams++; break;
          case 'Internship': counts.internships++; break;
          case 'Hackathon': counts.hackathons++; break;
          default: break;
        }
      });
      
      setOpportunityCounts(counts);
    }
  }, [opportunities]);

  const getCurrentData = () => {
    // Filter by type based on active tab
    return opportunities.filter(item => {
      switch (activeTab) {
        case 'scholarships': return item.type === 'Scholarship';
        case 'competitions': return item.type === 'Competition';
        case 'exams': return item.type === 'Exam';
        case 'internships': return item.type === 'Internship';
        case 'hackathons': return item.type === 'Hackathon';
        default: return true;
      }
    });
  };

  const filteredData = getCurrentData().filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-green-600 bg-green-100';
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'closed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const isDeadlineNear = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const getTabIcon = (tabId) => {
    switch (tabId) {
      case 'scholarships': return GraduationCap;
      case 'competitions': return Trophy;
      case 'exams': return BookOpen;
      case 'internships': return Briefcase;
      case 'hackathons': return Code;
      default: return BookOpen;
    }
  };

  return (
    <div className="opportunities-container">
      <div className="opportunities-header">
        <h1 className="opportunities-title">Opportunities Hub</h1>
        <p className="opportunities-subtitle">
          Discover scholarships, competitions, internships, hackathons, and exam opportunities to advance your career
        </p>
      </div>

      <div className="opportunities-tabs">
        {[
          { id: 'scholarships', label: 'Scholarships', count: opportunityCounts.scholarships },
          { id: 'competitions', label: 'Competitions', count: opportunityCounts.competitions },
          { id: 'exams', label: 'Entrance Exams', count: opportunityCounts.exams },
          { id: 'internships', label: 'Internships', count: opportunityCounts.internships },
          { id: 'hackathons', label: 'Hackathons', count: opportunityCounts.hackathons }
        ].map((tab) => {
          const Icon = getTabIcon(tab.id);
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`opportunities-tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              <Icon className="opportunities-tab-icon" />
              <span>{tab.label}</span>
              <span className="opportunities-tab-count">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="opportunities-search-section">
        <div className="opportunities-search-container">
          <div className="opportunities-search-wrapper">
            <Search className="opportunities-search-icon" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="opportunities-search-input"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="opportunities-filter-select"
          >
            <option value="all">All Categories</option>
            <option value="science">Science</option>
            <option value="engineering">Engineering</option>
            <option value="medical">Medical</option>
            <option value="mathematics">Mathematics</option>
            <option value="technology">Technology</option>
            <option value="innovation">Innovation</option>
            <option value="research">Research</option>
            <option value="social">Social Impact</option>
          </select>
          
          <button 
            className="opportunities-alert-btn"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
          >
            <Bell className="opportunities-alert-icon" />
            <span>{isLoadingMore ? 'Loading...' : 'Load More'}</span>
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="opportunities-loading">
          <Loader className="opportunities-loading-spinner" />
          <p>Loading opportunities...</p>
        </div>
      )}
      
      {error && (
        <div className="opportunities-error">
          <p>Error loading opportunities: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      <div className="opportunities-grid">
        {!isLoading && filteredData.map(item => (
          <div key={item.id} className="opportunity-card">
            <div className="opportunity-image-container">
              <img 
                src={item.image} 
                alt={item.title}
                className="opportunity-image"
              />
              <div className="opportunity-badges">
                <span className={`opportunity-status-badge ${getStatusColor(item.status)}`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
                <span className={`opportunity-difficulty-badge ${getDifficultyColor(item.difficulty)}`}>
                  {item.difficulty}
                </span>
              </div>
              {(activeTab === 'scholarships' || activeTab === 'competitions' || activeTab === 'internships' || activeTab === 'hackathons') && 
               isDeadlineNear(item.deadline) && (
                <div className="opportunity-deadline-warning">
                  <AlertCircle className="opportunity-warning-icon" />
                  <span>Deadline Near</span>
                </div>
              )}
            </div>
            
            <div className="opportunity-content">
              <h3 className="opportunity-title">{item.title}</h3>
              <p className="opportunity-description">{item.description}</p>
              
              <div className="opportunity-details">
                <div className="opportunity-detail-row">
                  <span className="opportunity-detail-label">
                    {activeTab === 'scholarships' ? 'Provider' : 
                     activeTab === 'internships' ? 'Company' : 'Organizer'}:
                  </span>
                  <span className="opportunity-detail-value">
                    {activeTab === 'scholarships' ? item.provider : 
                     activeTab === 'internships' ? item.company : item.organizer}
                  </span>
                </div>
                
                <div className="opportunity-detail-row">
                  <span className="opportunity-detail-label">
                    {activeTab === 'scholarships' ? 'Amount' : 
                     activeTab === 'competitions' || activeTab === 'hackathons' ? 'Prize' : 
                     activeTab === 'internships' ? 'Stipend' : 'Date'}:
                  </span>
                  <span className="opportunity-detail-value green">
                    {activeTab === 'scholarships' ? item.amount : 
                     activeTab === 'competitions' || activeTab === 'hackathons' ? item.prize : 
                     activeTab === 'internships' ? item.stipend : item.date}
                  </span>
                </div>
                
                <div className="opportunity-detail-row">
                  <span className="opportunity-detail-label">
                    {activeTab === 'exams' ? 'Registration End' : 
                     activeTab === 'internships' ? 'Duration' : 'Deadline'}:
                  </span>
                  <span className="opportunity-detail-value red">
                    {activeTab === 'exams' ? item.registrationEnd : 
                     activeTab === 'internships' ? item.duration : item.deadline}
                  </span>
                </div>
                
                <div className="opportunity-detail-row">
                  <span className="opportunity-detail-label">
                    {activeTab === 'scholarships' ? 'Applicants' : 
                     activeTab === 'competitions' || activeTab === 'hackathons' ? 'Participants' : 
                     activeTab === 'internships' ? 'Applicants' : 'Applicants'}:
                  </span>
                  <span className="opportunity-detail-value blue">
                    {activeTab === 'scholarships' ? item.applicants : 
                     activeTab === 'competitions' || activeTab === 'hackathons' ? item.participants : 
                     activeTab === 'internships' ? item.applicants : item.applicants}
                  </span>
                </div>
              </div>
              
              {(activeTab === 'scholarships' || activeTab === 'internships') && (
                <div className="opportunity-eligibility">
                  <p className="opportunity-eligibility-label">
                    {activeTab === 'scholarships' ? 'Eligibility:' : 'Skills Required:'}
                  </p>
                  <p className="opportunity-eligibility-text">
                    {activeTab === 'scholarships' ? item.eligibility : item.skills?.join(', ')}
                  </p>
                </div>
              )}
              
              <div className="opportunity-requirements">
                <p className="opportunity-requirements-label">
                  {activeTab === 'scholarships' || activeTab === 'internships' ? 'Requirements' : 
                   activeTab === 'hackathons' ? 'Themes' : 'Subjects'}:
                </p>
                <div className="opportunity-tags">
                  {(activeTab === 'scholarships' ? item.requirements : 
                    activeTab === 'internships' ? item.skills : 
                    activeTab === 'hackathons' ? item.themes : item.subjects)
                    ?.slice(0, 3).map((req, index) => (
                    <span key={index} className="opportunity-tag">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="opportunity-actions">
                <button className="opportunity-apply-btn">
                  <ExternalLink className="opportunity-apply-icon" />
                  <span>
                    {activeTab === 'scholarships' ? 'Apply Now' : 
                     activeTab === 'competitions' || activeTab === 'hackathons' ? 'Register' : 
                     activeTab === 'internships' ? 'Apply' : 'Apply'}
                  </span>
                </button>
                
                <button className="opportunity-bookmark-btn">
                  <Star className="opportunity-bookmark-icon" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && !isLoading && (
        <div className="opportunities-empty-state">
          <Trophy className="opportunities-empty-icon" />
          <h3 className="opportunities-empty-title">No opportunities found</h3>
          <p className="opportunities-empty-text">Try adjusting your search or filter criteria</p>
        </div>
      )}
      
      {filteredData.length > 0 && !isLoading && (
        <div className="opportunities-load-more">
          <button 
            className="opportunities-load-more-btn"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? 'Loading more opportunities...' : 'Load More Opportunities'}
          </button>
        </div>
      )}
    </div>
  );
};


export default Opportunities;