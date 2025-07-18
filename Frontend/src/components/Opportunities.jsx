import React, { useState } from 'react';
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
  School
} from 'lucide-react';
import './Opportunities.css';


 const Opportunities = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('scholarships');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const scholarships = [
    {
      id: 1,
      title: 'National Science Talent Search Scholarship',
      provider: 'Government of India',
      amount: '₹1,50,000',
      deadline: '2024-01-15',
      category: 'science',
      eligibility: 'Class 12 students with 90%+ in Science',
      description: 'Merit-based scholarship for students pursuing science education',
      applicants: 12450,
      selected: 500,
      difficulty: 'High',
      requirements: ['Academic transcripts', 'Research proposal', 'Recommendation letters'],
      status: 'open',
      image: 'https://images.pexels.com/photos/5428019/pexels-photo-5428019.jpeg?auto=compress&cs=tinysrgb&w=400&h=250'
    },
    {
      id: 2,
      title: 'JEE Advanced Merit Scholarship',
      provider: 'IIT Foundation',
      amount: '₹2,00,000',
      deadline: '2024-02-20',
      category: 'engineering',
      eligibility: 'JEE Advanced rank under 1000',
      description: 'Scholarship for top JEE Advanced performers',
      applicants: 8930,
      selected: 200,
      difficulty: 'High',
      requirements: ['JEE Advanced scorecard', 'Income certificate', 'Caste certificate (if applicable)'],
      status: 'open',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400&h=250'
    },
    {
      id: 3,
      title: 'NEET Medical Excellence Award',
      provider: 'Medical Council of India',
      amount: '₹1,75,000',
      deadline: '2024-01-30',
      category: 'medical',
      eligibility: 'NEET rank under 500',
      description: 'Support for aspiring medical professionals',
      applicants: 15670,
      selected: 300,
      difficulty: 'High',
      requirements: ['NEET scorecard', 'Medical fitness certificate', 'Character certificate'],
      status: 'open',
      image: 'https://images.pexels.com/photos/4386465/pexels-photo-4386465.jpeg?auto=compress&cs=tinysrgb&w=400&h=250'
    },
    {
      id: 4,
      title: 'Women in STEM Scholarship',
      provider: 'Tech Foundation',
      amount: '₹1,25,000',
      deadline: '2024-03-15',
      category: 'technology',
      eligibility: 'Female students in STEM fields',
      description: 'Encouraging women participation in science and technology',
      applicants: 6789,
      selected: 150,
      difficulty: 'Medium',
      requirements: ['Academic records', 'Project portfolio', 'Personal statement'],
      status: 'open',
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400&h=250'
    }
  ];

  const competitions = [
    {
      id: 1,
      title: 'National Science Olympiad',
      organizer: 'Science Foundation',
      prize: '₹50,000',
      deadline: '2024-01-20',
      category: 'science',
      level: 'National',
      description: 'Test your scientific knowledge and problem-solving skills',
      participants: 25000,
      winners: 10,
      difficulty: 'High',
      subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
      status: 'open',
      image: 'https://images.pexels.com/photos/159832/science-formula-physics-school-159832.jpeg?auto=compress&cs=tinysrgb&w=400&h=250'
    },
    {
      id: 2,
      title: 'Inter-School Mathematics Competition',
      organizer: 'Math Society',
      prize: '₹25,000',
      deadline: '2024-02-10',
      category: 'mathematics',
      level: 'Regional',
      description: 'Challenging mathematical problems for bright minds',
      participants: 8500,
      winners: 5,
      difficulty: 'Medium',
      subjects: ['Algebra', 'Geometry', 'Calculus', 'Statistics'],
      status: 'open',
      image: 'https://images.pexels.com/photos/1496154/pexels-photo-1496154.jpeg?auto=compress&cs=tinysrgb&w=400&h=250'
    },
    {
      id: 3,
      title: 'Young Innovators Challenge',
      organizer: 'Innovation Hub',
      prize: '₹1,00,000',
      deadline: '2024-02-28',
      category: 'innovation',
      level: 'National',
      description: 'Showcase your innovative ideas and win big',
      participants: 12000,
      winners: 3,
      difficulty: 'High',
      subjects: ['Technology', 'Science', 'Engineering', 'Design'],
      status: 'open',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250'
    }
  ];

  const exams = [
    {
      id: 1,
      title: 'JEE Main 2024',
      organizer: 'NTA',
      date: '2024-01-24',
      category: 'engineering',
      level: 'National',
      description: 'Joint Entrance Examination for engineering admissions',
      applicants: 1200000,
      centers: 400,
      difficulty: 'High',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      status: 'upcoming',
      registrationEnd: '2024-01-10',
      image: 'https://images.pexels.com/photos/5428019/pexels-photo-5428019.jpeg?auto=compress&cs=tinysrgb&w=400&h=250'
    },
    {
      id: 2,
      title: 'NEET 2024',
      organizer: 'NTA',
      date: '2024-05-05',
      category: 'medical',
      level: 'National',
      description: 'National medical entrance examination',
      applicants: 1800000,
      centers: 500,
      difficulty: 'High',
      subjects: ['Physics', 'Chemistry', 'Biology'],
      status: 'upcoming',
      registrationEnd: '2024-03-15',
      image: 'https://images.pexels.com/photos/4386465/pexels-photo-4386465.jpeg?auto=compress&cs=tinysrgb&w=400&h=250'
    },
    {
      id: 3,
      title: 'KVPY 2024',
      organizer: 'IISc',
      date: '2024-03-10',
      category: 'science',
      level: 'National',
      description: 'Kishore Vaigyanik Protsahan Yojana',
      applicants: 150000,
      centers: 200,
      difficulty: 'Medium',
      subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
      status: 'upcoming',
      registrationEnd: '2024-02-20',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400&h=250'
    }
  ];

  const internships = [
    {
      id: 1,
      title: 'Google Summer of Code 2024',
      company: 'Google',
      duration: '3 months',
      stipend: '$3,000',
      deadline: '2024-04-02',
      category: 'technology',
      level: 'International',
      description: 'Work on open source projects with mentorship from Google engineers',
      applicants: 50000,
      selected: 1200,
      difficulty: 'High',
      skills: ['Programming', 'Open Source', 'Git', 'Documentation'],
      status: 'open',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=250'
    },
    {
      id: 2,
      title: 'Microsoft Student Partner Program',
      company: 'Microsoft',
      duration: '1 year',
      stipend: 'Varies',
      deadline: '2024-03-15',
      category: 'technology',
      level: 'Global',
      description: 'Lead technical communities and events at your university',
      applicants: 25000,
      selected: 500,
      difficulty: 'Medium',
      skills: ['Leadership', 'Public Speaking', 'Microsoft Technologies', 'Community Building'],
      status: 'open',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400&h=250'
    },
    {
      id: 3,
      title: 'Research Internship at ISRO',
      company: 'ISRO',
      duration: '6 months',
      stipend: '₹25,000/month',
      deadline: '2024-02-28',
      category: 'research',
      level: 'National',
      description: 'Work on cutting-edge space research projects',
      applicants: 15000,
      selected: 100,
      difficulty: 'High',
      skills: ['Research', 'Space Technology', 'Data Analysis', 'Technical Writing'],
      status: 'open',
      image: 'https://images.pexels.com/photos/73873/rocket-launch-rocket-take-off-nasa-73873.jpeg?auto=compress&cs=tinysrgb&w=400&h=250'
    }
  ];

  const hackathons = [
    {
      id: 1,
      title: 'Smart India Hackathon 2024',
      organizer: 'Government of India',
      prize: '₹1,00,000',
      deadline: '2024-02-15',
      category: 'technology',
      level: 'National',
      description: '36-hour hackathon to solve real-world problems',
      participants: 100000,
      winners: 50,
      difficulty: 'High',
      themes: ['Healthcare', 'Education', 'Agriculture', 'Smart Cities'],
      status: 'open',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400&h=250'
    },
    {
      id: 2,
      title: 'HackMIT 2024',
      organizer: 'MIT',
      prize: '$10,000',
      deadline: '2024-03-01',
      category: 'technology',
      level: 'International',
      description: 'Premier student hackathon at MIT',
      participants: 5000,
      winners: 10,
      difficulty: 'High',
      themes: ['AI/ML', 'Blockchain', 'IoT', 'Web Development'],
      status: 'open',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400&h=250'
    },
    {
      id: 3,
      title: 'Code for Good Hackathon',
      organizer: 'TechForGood',
      prize: '₹50,000',
      deadline: '2024-02-20',
      category: 'social',
      level: 'National',
      description: 'Build solutions for social impact',
      participants: 8000,
      winners: 15,
      difficulty: 'Medium',
      themes: ['Social Impact', 'Environment', 'Education', 'Healthcare'],
      status: 'open',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400&h=250'
    }
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'scholarships': return scholarships;
      case 'competitions': return competitions;
      case 'exams': return exams;
      case 'internships': return internships;
      case 'hackathons': return hackathons;
      default: return [];
    }
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
          { id: 'scholarships', label: 'Scholarships', count: scholarships.length },
          { id: 'competitions', label: 'Competitions', count: competitions.length },
          { id: 'exams', label: 'Entrance Exams', count: exams.length },
          { id: 'internships', label: 'Internships', count: internships.length },
          { id: 'hackathons', label: 'Hackathons', count: hackathons.length }
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
          
          <button className="opportunities-alert-btn">
            <Bell className="opportunities-alert-icon" />
            <span>Set Alerts</span>
          </button>
        </div>
      </div>

      <div className="opportunities-grid">
        {filteredData.map(item => (
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

      {filteredData.length === 0 && (
        <div className="opportunities-empty-state">
          <Trophy className="opportunities-empty-icon" />
          <h3 className="opportunities-empty-title">No opportunities found</h3>
          <p className="opportunities-empty-text">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};


export default Opportunities;