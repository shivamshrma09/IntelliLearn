import React, { useEffect, useState } from "react";
import "./App.css";
import LandingPage from "./components/LandingPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import { Header } from "./components/Header.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import { BatchOverview } from "./components/BatchOverview.jsx";
import { TestInterface } from "./components/TestInterface.jsx";
import { MyBatch } from "./components/MyBatch.jsx";
import { Library } from "./components/Library.jsx";
import { Tests } from "./components/Tests.jsx";
import { Opportunities } from "./components/Opportunities.jsx";
import { Settings } from "./components/Settings.jsx";
import { TailwindTest } from "./components/TailwindTest.jsx";
import LoadingSpinner from "./components/LoadingSpinner";
import axios from "axios";
import { useUserData } from "./context/UserContext"; // IMPORT CONTEXT

function App() {
  const { userData, setUserData } = useUserData(); // यूज़र डेटा को Context से लें
  const [currentPage, setCurrentPage] = useState("landing");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBatchOverview, setShowBatchOverview] = useState(false);
  const [showTestInterface, setShowTestInterface] = useState(false);
  const [error, setError] = useState(null);

  // TestData इत्यादि...

  const handleNavigation = (page) => {
    setCurrentPage(page);
    if (page === "dashboard") setActiveTab("dashboard");
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleContinueLearning = () => setShowBatchOverview(true);
  const handleStartTest = () => setShowTestInterface(true);

  const fetchUserData = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    setUserData(null);
    setCurrentPage("landing");
    return;
  }
  try {
    const response = await axios.get("http://localhost:9000/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("User data fetched:", response.data);
    if (response.data.student) setUserData(response.data.student);
    else setUserData(response.data);
    setCurrentPage("dashboard");
  } catch (error) {
    console.error("Error fetching user data:", error);
    localStorage.removeItem("token");
    setUserData(null);
    setCurrentPage("login");
    setError(error?.response?.data?.message || "Session expired. Please login again.");
  }
};

  useEffect(() => {
    if (localStorage.getItem("token")) fetchUserData();
    else setCurrentPage("landing");
    // eslint-disable-next-line
  }, []);

  if (!userData && localStorage.getItem("token")) return <LoadingSpinner />;

  // "token" नहीं है तो लॉगिन
  if (!localStorage.getItem("token")) return <LoginPage onNavigate={handleNavigation} />;

  if (currentPage === "landing") return <LandingPage onNavigate={handleNavigation} />;
  if (currentPage === "login") return <LoginPage onNavigate={handleNavigation} />;
  if (currentPage === "signup") return <SignupPage onNavigate={handleNavigation} />;
  if (currentPage === "tailwind-test") return <TailwindTest />;

  // DASHBOARD Tabs switch logic...
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowBatchOverview(false);
    setShowTestInterface(false);
  };

  // Props for children
  const dashboardProps = { currentUser: userData, onContinueLearning: handleContinueLearning, onStartTest: handleStartTest, onNavigate: setCurrentPage };

  // Tabs render
  const renderContent = () => {
    if (showTestInterface) return <TestInterface onBack={() => setShowTestInterface(false)} testData={{}} />;
    if (showBatchOverview) return <BatchOverview onBack={() => setShowBatchOverview(false)} />;
    switch (activeTab) {
      case "dashboard": return <Dashboard {...dashboardProps} />;
      case "my-batch": return <MyBatch currentUser={userData} />;
      case "library": return <Library currentUser={userData} />;
      case "tests": return <Tests currentUser={userData} />;
      case "opportunities": return <Opportunities currentUser={userData} />;
      case "settings": return <Settings currentUser={userData} />;
      default: return <Dashboard {...dashboardProps} />;
    }
  };

  return (
    <div className="app-container">
      {!showTestInterface && (
        <>
          <Header onMenuToggle={toggleSidebar} currentUser={userData} />
          <div className="dashboard-layout">
            <Sidebar isOpen={sidebarOpen} activeTab={activeTab} onTabChange={handleTabChange} />
            <main className="main-content">{renderContent()}</main>
          </div>
        </>
      )}
      {showTestInterface && renderContent()}

      <div className={`mobile-overlay ${sidebarOpen && !showTestInterface ? "show" : ""}`} onClick={toggleSidebar} />
    </div>
  );
}

export default App;
