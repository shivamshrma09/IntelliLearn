import React, { useState, useEffect } from 'react';
import { useUserData } from './context/UserContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MyBatch from './components/MyBatch';
// Removed Library, Tests, and Opportunities imports as they're no longer needed
import Settings from './components/Settings';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import BatchCreation from './components/BatchCreation';
import UserDataLoader from './components/UserDataLoader';
import ErrorBoundary from './components/ErrorBoundary';
function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { userData } = useUserData();
  
  useEffect(() => {
    // Always start at landing page on initial load
    setCurrentPage('landing');
  }, []);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} currentUser={userData} />;
      case 'my-batch':
        return <MyBatch currentUser={userData} />;
      case 'library':
      case 'tests':
      case 'opportunities':
        // These features are now integrated directly into MyBatch component
        return <MyBatch currentUser={userData} initialTab={activeTab} />;
      case 'settings':
        return <Settings currentUser={userData} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} currentUser={userData} />;
    }
  };

  const showLayout = ['dashboard', 'my-batch', 'library', 'tests', 'opportunities', 'settings'].includes(currentPage);

  return (
    <ErrorBoundary>
      <UserDataLoader onNavigate={setCurrentPage}>
        {currentPage === 'landing' && <LandingPage onNavigate={setCurrentPage} />}
        {currentPage === 'login' && <LoginPage onNavigate={setCurrentPage} />}
        {currentPage === 'signup' && <SignupPage onNavigate={setCurrentPage} />}
        {showLayout && (
          <div className="app" style={{ height: '100vh' }}>
            <Header onMenuToggle={toggleSidebar} currentUser={userData} />
            <div className="app-body" style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
              <Sidebar isOpen={sidebarOpen} activeTab={activeTab} onTabChange={handleTabChange} />
              <main style={{ flex: 1, padding: '1rem', overflowY: 'auto', background: '#f9fafb' }}>
                <ErrorBoundary>
                  {renderContent()}
                </ErrorBoundary>
              </main>
            </div>
          </div>
        )}
      </UserDataLoader>
    </ErrorBoundary>
  );
}

export default App;
