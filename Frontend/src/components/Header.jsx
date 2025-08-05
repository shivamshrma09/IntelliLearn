import React, { useState, useEffect } from 'react';
import { Bell, Search, Trophy, Flame, Menu, CheckSquare } from 'lucide-react';
import './Header.css';

const Header = ({ onMenuToggle, onTodoToggle }) => {
  const [user, setUser] = useState({
    name: "User",
    streak: 0,
    totalPoints: 0,
    numberOfBatchesCompleted: 0,
    avatar: null // or add avatar url here if any
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:1000'}/students/user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Unauthorized or other error');
        }
        return response.json();
      })
      .then(data => {
        setUser(data);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }, []);

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
              <span>{user.streak} Day Streak!</span>
            </div>
            <div className="header-points">
              <Trophy size={16} />
              <span>{user.totalPoints} Points</span>
            </div>
            <button className="header-bell-btn" aria-label="Notifications">
              <Bell size={20} />
              <span className="header-bell-badge">3</span>
            </button>
            <button 
              onClick={onTodoToggle} 
              className="header-todo-btn" 
              aria-label="Todo List"
              title="Open Todo List"
            >
              <CheckSquare size={20} />
            </button>
            <div className="header-user">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="header-user-avatar" />
              ) : (
                <div className="header-user-avatar-placeholder">{user.name.charAt(0)}</div>
              )}
              <span className="header-user-name">{user.name}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
