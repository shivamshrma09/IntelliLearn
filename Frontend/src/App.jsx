import React, { useState } from 'react';
import { UserProvider, useUserData } from './context/UserContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MyBatch from './components/MyBatch';
import Library from './components/Library';
import Tests from './components/Tests';
import Opportunities from './components/Opportunities';
import Settings from './components/Settings';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import BatchCreation from './components/BatchCreation';
function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { userData } = useUserData();

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
        return <Library currentUser={userData} />;
      case 'tests':
        return <Tests currentUser={userData} />;
      case 'opportunities':
        return <Opportunities currentUser={userData} />;
      case 'settings':
        return <Settings currentUser={userData} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} currentUser={userData} />;
    }
  };

  const showLayout = ['dashboard', 'my-batch', 'library', 'tests', 'opportunities', 'settings'].includes(currentPage);

  if (currentPage === 'landing') return <LandingPage onNavigate={setCurrentPage} />;
  if (currentPage === 'login') return <LoginPage onNavigate={setCurrentPage} />;
  if (currentPage === 'signup') return <SignupPage onNavigate={setCurrentPage} />;

  return (
    <UserProvider>
      <div className="app" style={{ height: '100vh' }}>
        {showLayout && <Header onMenuToggle={toggleSidebar} currentUser={userData} />}
        <div className="app-body" style={{ display: 'flex', height: showLayout ? 'calc(100vh - 60px)' : '100vh' }}>
          {showLayout && <Sidebar isOpen={sidebarOpen} activeTab={activeTab} onTabChange={handleTabChange} />}
          <main style={{ flex: 1, padding: '1rem', overflowY: 'auto', background: '#f9fafb' }}>
            {renderContent()}
          </main>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
