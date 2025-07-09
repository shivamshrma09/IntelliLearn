import React, { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage.jsx';
import { LoginPage } from './components/LoginPage.jsx';
import { SignupPage } from './components/SignupPage.jsx';
import { Header } from './components/Header.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { Dashboard } from './components/Dashboard.jsx';
import { BatchOverview } from './components/BatchOverview.jsx';
import { TestInterface } from './components/TestInterface.jsx';
import { MyBatch } from './components/MyBatch.jsx';
import { Library } from './components/Library.jsx';
import { Tests } from './components/Tests.jsx';

import { Opportunities } from './components/Opportunities.jsx';
import { Settings } from './components/Settings.jsx';
import { TailwindTest } from './components/TailwindTest.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBatchOverview, setShowBatchOverview] = useState(false);
  const [showTestInterface, setShowTestInterface] = useState(false);

  const currentUser = {
    name: 'Rahul Sharma',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=50',
    points: 3250,
    streak: 7
  };

  const sampleTestData = {
    title: 'Physics Mock Test - Electromagnetic Induction',
    duration: 120, // 2 hours
    questions: []
  };
  const handleNavigation = (page) => {
    setCurrentPage(page);
    if (page === 'dashboard') {
      setActiveTab('dashboard');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowBatchOverview(false);
    setShowTestInterface(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleContinueLearning = () => {
    setShowBatchOverview(true);
  };

  const handleStartTest = () => {
    setShowTestInterface(true);
  };
  const renderContent = () => {
    if (showTestInterface) {
      return <TestInterface onBack={() => setShowTestInterface(false)} testData={sampleTestData} />;
    }
    
    if (showBatchOverview) {
      return <BatchOverview onBack={() => setShowBatchOverview(false)} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onContinueLearning={handleContinueLearning} onStartTest={handleStartTest} />;
      case 'my-batch':
        return <MyBatch />;
      case 'library':
        return <Library />;
      case 'tests':
        return <Tests />;

      case 'opportunities':
        return <Opportunities />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onContinueLearning={handleContinueLearning} onStartTest={handleStartTest} />;
    }
  };

  // Tailwind Test page
  if (currentPage === 'tailwind-test') {
    return <TailwindTest />;
  }

  // Landing, Login, Signup pages
  if (currentPage === 'landing') {
    return <LandingPage onNavigate={handleNavigation} />;
  }

  if (currentPage === 'login') {
    return <LoginPage onNavigate={handleNavigation} />;
  }

  if (currentPage === 'signup') {
    return <SignupPage onNavigate={handleNavigation} />;
  }

  // Dashboard layout
  return (
    <div className="app-container">
      {!showTestInterface && (
        <>
          <Header 
            onMenuToggle={toggleSidebar}
            currentUser={currentUser}
          />
          
          <div className="dashboard-layout">
            <Sidebar 
              isOpen={sidebarOpen}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
            
            <main className="main-content">
              {renderContent()}
            </main>
          </div>
        </>
      )}
      
      {showTestInterface && renderContent()}

      {/* Mobile overlay */}
      <div 
        className={`mobile-overlay ${sidebarOpen && !showTestInterface ? 'show' : ''}`}
        onClick={toggleSidebar}
      />
    </div>
  );
}

export default App;