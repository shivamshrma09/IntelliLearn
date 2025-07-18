// src/components/UserDataLoader.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserData } from "../context/UserContext";

const UserDataLoader = ({ children, onNavigate }) => {
  const { userData, setUserData } = useUserData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUserData(null);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get("http://localhost:9000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
        onNavigate("dashboard");
      } catch (err) {
        console.error("Failed to fetch user:", err);
        localStorage.removeItem("token");
        setUserData(null);
        onNavigate("login");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [setUserData, onNavigate]);

  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;

  if (!userData) return null;

  return children;
};

export default UserDataLoader;
