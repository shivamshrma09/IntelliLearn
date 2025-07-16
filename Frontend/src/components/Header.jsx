import React from 'react';
import { Bell, Search, User, Trophy, Flame, Menu } from 'lucide-react';
import './Header.css';

export const Header = ({ onMenuToggle, currentUser }) => {
  return (
    <header className="header-root">
      <div className="header-container">
        <div className="header-main">
          {/* Logo and Mobile Menu */}
          <div className="header-logo-menu">
            <button 
              onClick={onMenuToggle}
              className="header-menu-btn"
            >
              <Menu size={20} />
            </button>
            <div className="header-logo">
              <div className="header-logo-icon">
                <span>IL</span>
              </div>
              <span className="header-logo-text">IntelliLearn</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="header-search-wrap">
            <div className="header-search">
              <Search className="header-search-icon" size={20} />
              <input
                type="text"
                placeholder="Search courses, topics, or materials..."
                className="header-search-input"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="header-actions">
            <div className="header-streak">
              <Flame size={16} />
              <span>{currentUser.streak} Day Streak!</span>
            </div>
            <div className="header-points">
              <Trophy size={16} />
              <span>{currentUser.points.toLocaleString()} Points</span>
            </div>
            <button className="header-bell-btn">
              <Bell size={20} />
              <span className="header-bell-badge">3</span>
            </button>
            <div className="header-user">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                className="header-user-avatar"
              />
              <span className="header-user-name">{currentUser.name}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};