import React from 'react';
import './TailwindTest.css';

 const TailwindTest = ({ onNavigate }) => {
  return (
    <div className="tailwind-test-container">
      <div className="tailwind-test-card">
        <h1 className="tailwind-test-title">
          CSS Working! 🎉
        </h1>
        <div className="tailwind-test-content">
          <div className="success-alert">
            <p className="success-title">Success!</p>
            <p className="success-message">CSS is properly configured</p>
          </div>
          
          <button className="test-button">
            Click Me!
          </button>
          
          <div className="color-grid">
            <div className="color-box red"></div>
            <div className="color-box yellow"></div>
            <div className="color-box green"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailwindTest; 
