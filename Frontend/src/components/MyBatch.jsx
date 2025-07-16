// import React, { useState } from 'react';
// import { Plus, Search, Clock, BookOpen, Users, ChevronRight } from 'lucide-react';
// import './MyBatch.css';

// export const MyBatch = () => {
//   const [filter, setFilter] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');

//   const batches = [
//     {
//       id: 1,
//       name: 'JEE Main 2024 Physics',
//       subject: 'Physics',
//       progress: 75,
//       totalChapters: 24,
//       completedChapters: 18,
//       nextChapter: 'Electromagnetic Induction',
//       instructor: 'Dr. Amit Sharma',
//       students: 1247,
//       lastAccessed: '2 hours ago',
//       type: 'enrolled',
//       difficulty: 'Advanced'
//     },
//     {
//       id: 2,
//       name: 'NEET Chemistry Complete',
//       subject: 'Chemistry',
//       progress: 45,
//       totalChapters: 30,
//       completedChapters: 14,
//       nextChapter: 'Organic Chemistry Basics',
//       instructor: 'Prof. Priya Patel',
//       students: 892,
//       lastAccessed: '1 day ago',
//       type: 'enrolled',
//       difficulty: 'Intermediate'
//     },
//     {
//       id: 3,
//       name: 'My Custom UPSC History',
//       subject: 'History',
//       progress: 30,
//       totalChapters: 15,
//       completedChapters: 5,
//       nextChapter: 'Medieval Indian History',
//       instructor: 'AI Generated',
//       students: 1,
//       lastAccessed: '3 days ago',
//       type: 'custom',
//       difficulty: 'Beginner'
//     },
//     {
//       id: 4,
//       name: 'Mathematics Foundation',
//       subject: 'Mathematics',
//       progress: 100,
//       totalChapters: 20,
//       completedChapters: 20,
//       nextChapter: 'Course Completed',
//       instructor: 'Dr. Suresh Kumar',
//       students: 2156,
//       lastAccessed: '1 week ago',
//       type: 'completed',
//       difficulty: 'Intermediate'
//     }
//   ];

//   const filteredBatches = batches.filter(batch => {
//     const matchesFilter = filter === 'all' || batch.type === filter;
//     const matchesSearch = batch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          batch.subject.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   return (
//     <div className="mybatch-root">
//       {/* Header */}
//       <div className="mybatch-header">
//         <div>
//           <h1 className="mybatch-title">My Batch</h1>
//           <p className="mybatch-desc">Manage your learning courses and track progress</p>
//         </div>
//         <button className="mybatch-create-btn">
//           <Plus size={20} />
//           <span>Create Custom Batch</span>
//         </button>
//       </div>

//       {/* Filters and Search */}
//       <div className="mybatch-filter-row">
//         <div className="mybatch-filter-btns">
//           {['all', 'enrolled', 'custom', 'completed'].map(filterType => (
//             <button
//               key={filterType}
//               onClick={() => setFilter(filterType)}
//               className={`mybatch-filter-btn${filter === filterType ? ' active' : ''}`}
//             >
//               {filterType === 'all' ? 'All Batches' : filterType}
//             </button>
//           ))}
//         </div>
//         <div className="mybatch-search-wrap">
//           <Search className="mybatch-search-icon" size={20} />
//           <input
//             type="text"
//             placeholder="Search batches..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="mybatch-search-input"
//           />
//         </div>
//       </div>

//       {/* Batch Cards */}
//       <div className="mybatch-cards-grid">
//         {filteredBatches.map(batch => (
//           <div key={batch.id} className="mybatch-card">
//             <div className="mybatch-card-body">
//               {/* Header */}
//               <div className="mybatch-card-header">
//                 <div>
//                   <h3 className="mybatch-card-title">{batch.name}</h3>
//                   <p className="mybatch-card-subject">{batch.subject}</p>
//                 </div>
//                 <span className={`mybatch-card-type${batch.type === 'custom' ? ' custom' : batch.type === 'completed' ? ' completed' : ' enrolled'}`}>
//                   {batch.type === 'custom' ? 'Custom' : 
//                    batch.type === 'completed' ? 'Completed' : 'Enrolled'}
//                 </span>
//               </div>

//               {/* Progress */}
//               <div className="mybatch-progress">
//                 <div className="mybatch-progress-labels">
//                   <span>Progress</span>
//                   <span className="mybatch-progress-value">{batch.progress}%</span>
//                 </div>
//                 <div className="mybatch-progress-bar-bg">
//                   <div 
//                     className="mybatch-progress-bar-fill"
//                     style={{ width: `${batch.progress}%` }}
//                   />
//                 </div>
//                 <p className="mybatch-progress-caption">
//                   {batch.completedChapters} of {batch.totalChapters} chapters completed
//                 </p>
//               </div>

//               {/* Next Chapter */}
//               <div className="mybatch-next">
//                 <p className="mybatch-next-label">
//                   {batch.progress === 100 ? 'Status' : 'Next up'}
//                 </p>
//                 <p className="mybatch-next-value">{batch.nextChapter}</p>
//               </div>

//               {/* Stats */}
//               <div className="mybatch-stats">
//                 <div>
//                   <Users size={14} className="mr-1" />
//                   <span>{batch.students.toLocaleString()} students</span>
//                 </div>
//                 <div>
//                   <Clock size={14} className="mr-1" />
//                   <span>{batch.lastAccessed}</span>
//                 </div>
//               </div>

//               {/* Action Button */}
//               <button className="mybatch-action-btn">
//                 <BookOpen size={16} />
//                 <span>{batch.progress === 100 ? 'Review Course' : 'Continue Learning'}</span>
//                 <ChevronRight size={16} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {filteredBatches.length === 0 && (
//         <div className="mybatch-empty">
//           <BookOpen size={48} className="mybatch-empty-icon" />
//           <h3>No batches found</h3>
//           <p>
//             {searchQuery ? 'Try adjusting your search terms' : 'Create your first custom batch to get started'}
//           </p>
//           <button className="mybatch-create-btn">
//             Create Custom Batch
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };









// import React, { useState } from 'react';
// import { Plus, Search, Clock, BookOpen, Users, ChevronRight } from 'lucide-react';
// import './MyBatch.css';

// export const MyBatch = () => {
//   const [filter, setFilter] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');

//   const batches = [
//     {
//       id: 1,
//       name: 'JEE Main 2024 Physics',
//       subject: 'Physics',
//       progress: 75,
//       totalChapters: 24,
//       completedChapters: 18,
//       nextChapter: 'Electromagnetic Induction',
//       instructor: 'Dr. Amit Sharma',
//       students: 1247,
//       lastAccessed: '2 hours ago',
//       type: 'enrolled',
//       difficulty: 'Advanced'
//     },
//     {
//       id: 2,
//       name: 'NEET Chemistry Complete',
//       subject: 'Chemistry',
//       progress: 45,
//       totalChapters: 30,
//       completedChapters: 14,
//       nextChapter: 'Organic Chemistry Basics',
//       instructor: 'Prof. Priya Patel',
//       students: 892,
//       lastAccessed: '1 day ago',
//       type: 'enrolled',
//       difficulty: 'Intermediate'
//     },
//     {
//       id: 3,
//       name: 'My Custom UPSC History',
//       subject: 'History',
//       progress: 30,
//       totalChapters: 15,
//       completedChapters: 5,
//       nextChapter: 'Medieval Indian History',
//       instructor: 'AI Generated',
//       students: 1,
//       lastAccessed: '3 days ago',
//       type: 'custom',
//       difficulty: 'Beginner'
//     },
//     {
//       id: 4,
//       name: 'Mathematics Foundation',
//       subject: 'Mathematics',
//       progress: 100,
//       totalChapters: 20,
//       completedChapters: 20,
//       nextChapter: 'Course Completed',
//       instructor: 'Dr. Suresh Kumar',
//       students: 2156,
//       lastAccessed: '1 week ago',
//       type: 'completed',
//       difficulty: 'Intermediate'
//     }
//   ];

//   const filteredBatches = batches.filter(batch => {
//     const matchesFilter = filter === 'all' || batch.type === filter;
//     const matchesSearch = batch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          batch.subject.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   return (
//     <div className="mybatch-root">
//       {/* Header */}
//       <div className="mybatch-header">
//         <div>
//           <h1 className="mybatch-title">My Batch</h1>
//           <p className="mybatch-desc">Manage your learning courses and track progress</p>
//         </div>
//         <button className="mybatch-create-btn">
//           <Plus size={20} />
//           <span>Create Custom Batch</span>
//         </button>
//       </div>

//       {/* Filters and Search */}
//       <div className="mybatch-filter-row">
//         <div className="mybatch-filter-btns">
//           {['all', 'enrolled', 'custom', 'completed'].map(filterType => (
//             <button
//               key={filterType}
//               onClick={() => setFilter(filterType)}
//               className={`mybatch-filter-btn${filter === filterType ? ' active' : ''}`}
//             >
//               {filterType === 'all' ? 'All Batches' : filterType}
//             </button>
//           ))}
//         </div>
//         <div className="mybatch-search-wrap">
//           <Search className="mybatch-search-icon" size={20} />
//           <input
//             type="text"
//             placeholder="Search batches..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="mybatch-search-input"
//           />
//         </div>
//       </div>

//       {/* Batch Cards */}
//       <div className="mybatch-cards-grid">
//         {filteredBatches.map(batch => (
//           <div key={batch.id} className="mybatch-card">
//             <div className="mybatch-card-body">
//               {/* Header */}
//               <div className="mybatch-card-header">
//                 <div>
//                   <h3 className="mybatch-card-title">{batch.name}</h3>
//                   <p className="mybatch-card-subject">{batch.subject}</p>
//                 </div>
//                 <span className={`mybatch-card-type${batch.type === 'custom' ? ' custom' : batch.type === 'completed' ? ' completed' : ' enrolled'}`}>
//                   {batch.type === 'custom' ? 'Custom' : 
//                    batch.type === 'completed' ? 'Completed' : 'Enrolled'}
//                 </span>
//               </div>

//               {/* Progress */}
//               <div className="mybatch-progress">
//                 <div className="mybatch-progress-labels">
//                   <span>Progress</span>
//                   <span className="mybatch-progress-value">{batch.progress}%</span>
//                 </div>
//                 <div className="mybatch-progress-bar-bg">
//                   <div 
//                     className="mybatch-progress-bar-fill"
//                     style={{ width: `${batch.progress}%` }}
//                   />
//                 </div>
//                 <p className="mybatch-progress-caption">
//                   {batch.completedChapters} of {batch.totalChapters} chapters completed
//                 </p>
//               </div>

//               {/* Next Chapter */}
//               <div className="mybatch-next">
//                 <p className="mybatch-next-label">
//                   {batch.progress === 100 ? 'Status' : 'Next up'}
//                 </p>
//                 <p className="mybatch-next-value">{batch.nextChapter}</p>
//               </div>

//               {/* Stats */}
//               <div className="mybatch-stats">
//                 <div>
//                   <Users size={14} className="mr-1" />
//                   <span>{batch.students.toLocaleString()} students</span>
//                 </div>
//                 <div>
//                   <Clock size={14} className="mr-1" />
//                   <span>{batch.lastAccessed}</span>
//                 </div>
//               </div>

//               {/* Action Button */}
//               <button className="mybatch-action-btn">
//                 <BookOpen size={16} />
//                 <span>{batch.progress === 100 ? 'Review Course' : 'Continue Learning'}</span>
//                 <ChevronRight size={16} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {filteredBatches.length === 0 && (
//         <div className="mybatch-empty">
//           <BookOpen size={48} className="mybatch-empty-icon" />
//           <h3>No batches found</h3>
//           <p>
//             {searchQuery ? 'Try adjusting your search terms' : 'Create your first custom batch to get started'}
//           </p>
//           <button className="mybatch-create-btn">
//             Create Custom Batch
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };














import React, { useState } from 'react';
import {
  Plus, Play, Clock, BookOpen, Target, Filter, Search, MoreVertical,
  TrendingUp, Users, Calendar, ChevronRight, Star, Award, CheckCircle, Globe, Zap
} from 'lucide-react';
import './MyBatch.css';

export const MyBatch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [activeTab, setActiveTab] = useState('my-batches');

   const myBatches = [
    {
      id: 1,
      title: 'JEE Main 2024 Physics',
      subject: 'Physics',
      progress: 75,
      totalChapters: 16,
      completedChapters: 12,
      nextChapter: 'Optics',
      instructor: 'Dr. Sharma',
      enrolledStudents: 1247,
      difficulty: 'Advanced',
      estimatedTime: '120 hours',
      type: 'enrolled',
      image: 'https://images.pexels.com/photos/159832/science-formula-physics-school-159832.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
      chapters: [
        { id: 1, title: 'Mechanics', completed: true, duration: '8 hours' },
        { id: 2, title: 'Waves', completed: true, duration: '6 hours' },
        { id: 3, title: 'Thermodynamics', completed: true, duration: '7 hours' },
        { id: 4, title: 'Optics', completed: false, duration: '9 hours' }
      ]
    },
    {
      id: 2,
      title: 'NEET Biology Complete',
      subject: 'Biology',
      progress: 45,
      totalChapters: 20,
      completedChapters: 9,
      nextChapter: 'Genetics',
      instructor: 'Dr. Patel',
      enrolledStudents: 2341,
      difficulty: 'Intermediate',
      estimatedTime: '150 hours',
      type: 'enrolled',
      image: 'https://images.pexels.com/photos/1242348/pexels-photo-1242348.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
      chapters: [
        { id: 1, title: 'Cell Biology', completed: true, duration: '10 hours' },
        { id: 2, title: 'Genetics', completed: false, duration: '12 hours' },
        { id: 3, title: 'Evolution', completed: false, duration: '8 hours' }
      ]
    },
    {
      id: 3,
      title: 'My Custom Chemistry Batch',
      subject: 'Chemistry',
      progress: 30,
      totalChapters: 12,
      completedChapters: 4,
      nextChapter: 'Organic Chemistry',
      instructor: 'AI Generated',
      enrolledStudents: 1,
      difficulty: 'Custom',
      estimatedTime: '80 hours',
      type: 'custom',
      image: 'https://images.pexels.com/photos/1366909/pexels-photo-1366909.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
      chapters: [
        { id: 1, title: 'Atomic Structure', completed: true, duration: '6 hours' },
        { id: 2, title: 'Chemical Bonding', completed: true, duration: '8 hours' },
        { id: 3, title: 'Organic Chemistry', completed: false, duration: '10 hours' }
      ]
    }
  ];

  const allBatches = [
    {
      id: 101,
      title: 'Complete JEE Main 2025 Preparation',
      subject: 'Multi-Subject',
      instructor: 'Expert Faculty Team',
      enrolledStudents: 15420,
      rating: 4.9,
      totalChapters: 45,
      estimatedTime: '300 hours',
      difficulty: 'Advanced',
      image: 'https://images.pexels.com/photos/5428019/pexels-photo-5428019.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
      description: 'Comprehensive JEE Main preparation covering Physics, Chemistry, and Mathematics',
      features: ['Live Classes', 'Doubt Resolution', 'Mock Tests', 'Study Material'],
      type: 'available'
    },
    {
      id: 102,
      title: 'NEET 2025 Biology Masterclass',
      subject: 'Biology',
      instructor: 'Dr. Priya Singh',
      enrolledStudents: 12340,
      rating: 4.8,
      totalChapters: 25,
      estimatedTime: '180 hours',
      difficulty: 'Intermediate',
      image: 'https://images.pexels.com/photos/4386465/pexels-photo-4386465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
      description: 'Complete NEET Biology preparation with detailed explanations and practice',
      features: ['Animated Videos', 'Practice Questions', 'Chapter Tests', 'Revision Notes'],
      type: 'available'
    },
    {
      id: 103,
      title: 'Class 12 Physics Foundation',
      subject: 'Physics',
      instructor: 'Prof. Rajesh Kumar',
      enrolledStudents: 8934,
      rating: 4.7,
      totalChapters: 18,
      estimatedTime: '120 hours',
      difficulty: 'Beginner',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
      description: 'Strong foundation in Class 12 Physics concepts with practical examples',
      features: ['Concept Videos', 'Solved Examples', 'Practice Sets', 'Lab Experiments'],
      type: 'available'
    },
    {
      id: 104,
      title: 'Advanced Mathematics for Competitive Exams',
      subject: 'Mathematics',
      instructor: 'Dr. Amit Sharma',
      enrolledStudents: 11250,
      rating: 4.9,
      totalChapters: 22,
      estimatedTime: '200 hours',
      difficulty: 'Advanced',
      image: 'https://images.pexels.com/photos/1496154/pexels-photo-1496154.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
      description: 'Advanced mathematical concepts for JEE, BITSAT, and other competitive exams',
      features: ['Problem Solving', 'Shortcuts & Tricks', 'Previous Year Questions', 'Mock Tests'],
      type: 'available'
    },
    {
      id: 105,
      title: 'Organic Chemistry Simplified',
      subject: 'Chemistry',
      instructor: 'Dr. Neha Gupta',
      enrolledStudents: 9876,
      rating: 4.6,
      totalChapters: 15,
      estimatedTime: '100 hours',
      difficulty: 'Intermediate',
      image: 'https://images.pexels.com/photos/1366922/pexels-photo-1366922.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
      description: 'Master organic chemistry with easy-to-understand concepts and reactions',
      features: ['Reaction Mechanisms', 'Named Reactions', 'Practice Problems', 'Memory Techniques'],
      type: 'available'
    },
    {
      id: 106,
      title: 'English Literature for Competitive Exams',
      subject: 'English',
      instructor: 'Prof. Sarah Johnson',
      enrolledStudents: 6543,
      rating: 4.5,
      totalChapters: 12,
      estimatedTime: '80 hours',
      difficulty: 'Intermediate',
      image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
      description: 'Comprehensive English literature course for various competitive examinations',
      features: ['Literary Analysis', 'Poetry Explanation', 'Essay Writing', 'Grammar Rules'],
      type: 'available'
    }
  ];

  const getCurrentBatches = () => {
    if (activeTab === 'my-batches') {
      return myBatches.filter(batch => {
        const matchesSearch = batch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             batch.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || 
                             (filterType === 'custom' && batch.type === 'custom') ||
                             (filterType === 'enrolled' && batch.type === 'enrolled') ||
                             (filterType === 'active' && batch.progress > 0 && batch.progress < 100) ||
                             (filterType === 'completed' && batch.progress === 100);
        return matchesSearch && matchesFilter;
      });
    } else {
      return allBatches.filter(batch => {
        const matchesSearch = batch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             batch.subject.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
      });
    }
  };

  const handleCreateBatch = () => {
    window.location.hash = 'batch-creation';
  };

  const handleEnrollBatch = (batch) => {
    alert(`🎉 Successfully enrolled in "${batch.title}"! The batch has been added to your My Batches.`);
  };


  return (
    <div className="mybatch-root">
      {/* Header */}
      <div className="mybatch-header">
        <div>
          <h1 className="mybatch-title">Learning Batches</h1>
          <p className="mybatch-subtitle">
            Continue your learning journey or discover new courses
          </p>
        </div>
        <button
          onClick={handleCreateBatch}
          className="mybatch-btn mybatch-btn-create"
        >
          <Zap className="mybatch-icon" />
          <span>Create AI Batch</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="mybatch-tabs">
        <button
          onClick={() => setActiveTab('my-batches')}
          className={`mybatch-tab ${activeTab === 'my-batches' ? 'active' : ''}`}
        >
          <BookOpen className="mybatch-icon" />
          <span>My Batches</span>
          <span className="mybatch-tab-count">{myBatches.length}</span>
        </button>
        <button
          onClick={() => setActiveTab('all-batches')}
          className={`mybatch-tab ${activeTab === 'all-batches' ? 'active' : ''}`}
        >
          <Globe className="mybatch-icon" />
          <span>All Batches</span>
          <span className="mybatch-tab-count">{allBatches.length}</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="mybatch-searchfilter">
        <div className="mybatch-searchbox">
          <Search className="mybatch-searchicon" />
          <input
            type="text"
            placeholder="Search batches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mybatch-input"
          />
        </div>
        <div className="mybatch-filterbox">
          {activeTab === 'my-batches' && (
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="mybatch-select"
            >
              <option value="all">All Batches</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="custom">Custom</option>
              <option value="enrolled">Enrolled</option>
            </select>
          )}
          <button className="mybatch-filterbtn">
            <Filter className="mybatch-icon" />
          </button>
        </div>
      </div>

      {/* Batch Grid */}
      <div className="mybatch-grid">
        {getCurrentBatches().map((batch) => (
          <div key={batch.id} className="mybatch-card">
            <div className="mybatch-card-imgbox">
              <img src={batch.image} alt={batch.title} className="mybatch-card-img" />
              <div className="mybatch-card-type">
                {activeTab === 'my-batches'
                  ? (batch.type === 'custom' ? 'Custom' : 'Enrolled')
                  : 'Available'}
              </div>
              <div className="mybatch-card-actions">
                <button className="mybatch-card-actionbtn">
                  <MoreVertical className="mybatch-icon" />
                </button>
              </div>
              {activeTab === 'all-batches' && (
                <div className="mybatch-card-rating">
                  <Star className="mybatch-icon-star" />
                  <span>{batch.rating}</span>
                </div>
              )}
            </div>
            <div className="mybatch-card-content">
              <div className="mybatch-card-title">{batch.title}</div>
              <div className="mybatch-card-meta">
                <span>{batch.subject}</span>
                <span>•</span>
                <span>by {batch.instructor}</span>
              </div>
              {activeTab === 'all-batches' && (
                <div className="mybatch-card-desc">{batch.description}</div>
              )}
              {activeTab === 'my-batches' && (
                <div className="mybatch-card-progress">
                  <div className="mybatch-card-progress-label">
                    <span>Progress</span>
                    <span>{batch.progress}%</span>
                  </div>
                  <div className="mybatch-card-progressbar">
                    <div
                      className="mybatch-card-progressbar-inner"
                      style={{ width: `${batch.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              <div className="mybatch-card-stats">
                <div>
                  <BookOpen className="mybatch-icon" />
                  <span>
                    {activeTab === 'my-batches'
                      ? `${batch.completedChapters}/${batch.totalChapters}`
                      : batch.totalChapters}
                  </span>
                  <div>Chapters</div>
                </div>
                <div>
                  <Clock className="mybatch-icon" />
                  <span>{batch.estimatedTime}</span>
                  <div>Duration</div>
                </div>
                <div>
                  <Users className="mybatch-icon" />
                  <span>{batch.enrolledStudents}</span>
                  <div>Students</div>
                </div>
              </div>
              {activeTab === 'all-batches' && (
                <div className="mybatch-card-features">
                  {batch.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="mybatch-feature">{feature}</span>
                  ))}
                </div>
              )}
              {activeTab === 'my-batches' && batch.progress < 100 && (
                <div className="mybatch-card-next">
                  Next: {batch.nextChapter}
                </div>
              )}
              <div className="mybatch-card-actionsrow">
                {activeTab === 'my-batches' ? (
                  <>
                    <button
                      className="mybatch-btn mybatch-btn-main"
                    >
                      <Play className="mybatch-icon" />
                      <span>{batch.progress === 0 ? 'Start' : 'Continue'}</span>
                    </button>
                    <button
                      className="mybatch-btn mybatch-btn-secondary"
                    >
                      <ChevronRight className="mybatch-icon" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEnrollBatch(batch)}
                    className="mybatch-btn mybatch-btn-enroll"
                  >
                    <CheckCircle className="mybatch-icon" />
                    <span>Enroll Now</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {getCurrentBatches().length === 0 && (
        <div className="mybatch-emptystate">
          <BookOpen className="mybatch-emptystate-icon" />
          <h3>No batches found</h3>
          <p>
            {searchTerm || filterType !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : activeTab === 'my-batches'
                ? 'Start your learning journey by creating your first batch'
                : 'No batches available at the moment'}
          </p>
          {activeTab === 'my-batches' && (
            <button
              onClick={handleCreateBatch}
              className="mybatch-btn mybatch-btn-create"
            >
              Create Your First Batch
            </button>
          )}
        </div>
      )}
    </div>
  );
};

