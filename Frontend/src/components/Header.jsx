import React from 'react';
import { Bell, Search, Trophy, Flame, Menu } from 'lucide-react';
import './Header.css';

const Header = ({ onMenuToggle, currentUser = {} }) => {
  const { streak = 0, points = 0, avatar = '', name = 'User' } = currentUser;

  return (
    <header className="header-root">
      <div className="header-container">
        <div className="header-main">
          <div className="header-logo-menu">
            <button onClick={onMenuToggle} className="header-menu-btn" aria-label="Toggle Menu">
              <Menu size={20} />
            </button>
            <div className="header-logo">
              <div className="header-logo-icon"><span>IL</span></div>
              <span className="header-logo-text">IntelliLearn</span>
            </div>
          </div>
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
          <div className="header-actions">
            <div className="header-streak">
              <Flame size={16} />
              <span>{streak} Day Streak!</span>
            </div>
            <div className="header-points">
              <Trophy size={16} />
              <span>{points.toLocaleString()} Points</span>
            </div>
            <button className="header-bell-btn" aria-label="Notifications">
              <Bell size={20} />
              <span className="header-bell-badge">3</span>
            </button>
            <div className="header-user">
              {avatar ? (
                <img src={avatar} alt={name} className="header-user-avatar" />
              ) : (
                <div className="header-user-avatar-placeholder">{name.charAt(0)}</div>
              )}
              <span className="header-user-name">{name}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
