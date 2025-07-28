// src/components/UserDataLoader.jsx
import React, { useEffect, useState } from "react";
import { useUserData } from "../context/UserContext";

const UserDataLoader = ({ children, onNavigate }) => {
  const { userData, setUserData } = useUserData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const currentPage = window.location.pathname.split('/').pop() || '';
      
      // If we're on landing, login, or signup page, don't try to fetch user data
      if (currentPage === 'landing' || currentPage === 'login' || currentPage === 'signup' || !token) {
        setUserData(null);
        setLoading(false);
        return;
      }
      
      try {
        // Use mock data for development to avoid API errors
        const userData = {
          _id: "mock-user-id",
          name: "Demo User",
          email: "demo@example.com",
          totalPoints: 100,
          rank: 10,
          streak: 5,
          numberOfBatchesCompleted: 2,
          course: "Computer Science",
          level: "Beginner",
          courseDetails: {
            name: "Computer Science",
            description: "Comprehensive computer science curriculum covering programming, algorithms, data structures, and software engineering.",
            topics: [
              "Programming Fundamentals",
              "Data Structures",
              "Algorithms",
              "Object-Oriented Programming",
              "Database Systems",
              "Web Development",
              "Software Engineering",
              "Computer Networks",
              "Operating Systems",
              "Artificial Intelligence"
            ],
            progress: 35,
            startDate: "2023-09-01",
            estimatedCompletionDate: "2024-06-30"
          }
        };
        
        setUserData(userData);
        
        // Only navigate to dashboard if we're not already on a valid page
        const validPages = ['dashboard', 'my-batch', 'library', 'tests', 'opportunities', 'settings'];
        if (!validPages.includes(currentPage)) {
          onNavigate("dashboard");
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUserData(null);
        onNavigate("login");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [setUserData, onNavigate]);

  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;

  return children;
};

export default UserDataLoader;