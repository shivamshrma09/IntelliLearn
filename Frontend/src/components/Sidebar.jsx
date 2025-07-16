import React from 'react';
import { 
  Home, 
  BookOpen, 
  FileText, 
  Trophy, 
  ShoppingCart, 
  Gift, 
  Settings,
  BarChart3,
  Star
} from 'lucide-react';
import './Sidebar.css';

export const Sidebar = ({ isOpen, activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'my-batch', label: 'My Batch', icon: BookOpen },
    { id: 'library', label: 'Library', icon: FileText },
    { id: 'tests', label: 'Tests', icon: BarChart3 },
    { id: 'opportunities', label: 'Opportunities', icon: Gift },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`sidebar-root${isOpen ? ' open' : ''}`}>
      <div className="sidebar-inner">
        <div className="sidebar-menu-wrap">
          <nav className="sidebar-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`sidebar-menu-btn${activeTab === item.id ? ' active' : ''}`}
                >
                  <Icon
                    className={`sidebar-menu-icon${activeTab === item.id ? ' active' : ''}`}
                  />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
        {/* Premium Upgrade Card */}
        <div className="sidebar-premium-wrap">
          <div className="sidebar-premium-card">
            <div className="sidebar-premium-header">
              <Star size={16} className="sidebar-premium-star" />
              <span>Upgrade to Premium</span>
            </div>
            <p className="sidebar-premium-desc">Get unlimited AI-generated content and advanced features</p>
            <button className="sidebar-premium-btn">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};