import React from 'react';
import {
  Home, BookOpen, FileText, Gift, Settings, BarChart3
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'my-batch', label: 'My Batch', icon: BookOpen },
    { id: 'library', label: 'Library', icon: FileText, description: 'Access learning materials' },
    { id: 'tests', label: 'Tests', icon: BarChart3, description: 'Practice with quizzes and tests' },
    { id: 'opportunities', label: 'Opportunities', icon: Gift, description: 'Discover learning opportunities' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`sidebar-root${isOpen ? ' open' : ''}`}>
      <nav className="sidebar-menu">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`sidebar-menu-btn${activeTab === item.id ? ' active' : ''}`}
            >
              <Icon className={`sidebar-menu-icon${activeTab === item.id ? ' active' : ''}`} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
