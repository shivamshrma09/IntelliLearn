import React, { useState, useEffect } from 'react';
import { useUserData } from './context/UserContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MyBatch from './components/MyBatch';
import Settings from './components/Settings';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import BatchCreation from './components/BatchCreation';
import UserDataLoader from './components/UserDataLoader';
import ErrorBoundary from './components/ErrorBoundary';
import Library from './components/Library';
import Opportunities  from './components/Opportunities';
import Test from './components/Test';
import LeetCodeTracker from './components/DSATodo';
import TodoSidebar from './components/TodoSidebar';
import PomodoroTimer from './components/PomodoroTimer';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [todoOpen, setTodoOpen] = useState(false);

  const { userData } = useUserData();
  
  useEffect(() => {
    // Always start at landing page on initial load
    setCurrentPage('landing');
  }, []);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const toggleTodo = () => setTodoOpen(prev => !prev);

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
         return <Test currentUser={userData} />;

      case 'opportunities':
         return <Opportunities currentUser={userData} />;
      case 'leetcode':
        return <LeetCodeTracker />;
      case 'timer':
        return <PomodoroTimer />;
      case 'settings':
        return <Settings currentUser={userData} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} currentUser={userData} />;
    }
  };

  const showLayout = ['dashboard', 'my-batch', 'library', 'tests', 'opportunities', 'leetcode', 'timer', 'settings'].includes(currentPage);

  return (
    <ErrorBoundary>
      <UserDataLoader onNavigate={setCurrentPage}>
        {currentPage === 'landing' && <LandingPage onNavigate={setCurrentPage} />}
        {currentPage === 'login' && <LoginPage onNavigate={setCurrentPage} />}
        {currentPage === 'signup' && <SignupPage onNavigate={setCurrentPage} />}
        {showLayout && (
          <div className="app" style={{ height: '100vh' }}>
            <Header onMenuToggle={toggleSidebar} onTodoToggle={toggleTodo} currentUser={userData} />
            <div className="app-body" style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
              <Sidebar isOpen={sidebarOpen} activeTab={activeTab} onTabChange={handleTabChange} />
              <main style={{ flex: 1, padding: '1rem', overflowY: 'auto', background: '#f9fafb' }}>
                <ErrorBoundary>
                  {renderContent()}
                </ErrorBoundary>
              </main>
              <TodoSidebar isOpen={todoOpen} onClose={() => setTodoOpen(false)} />
            </div>
          </div>
        )}
      </UserDataLoader>
    </ErrorBoundary>
  );
}

export default App;
