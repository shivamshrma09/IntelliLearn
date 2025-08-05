import React, { useState } from "react";
import axios from "axios";
import { useUserData } from "../context/UserContext";

const LoginPage = ({ onNavigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { setUserData } = useUserData();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Please enter a valid email address";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:1000"}/students/login`,
        { email, password }
      );

      if (response.status === 200) {
        const data = response.data;
        setUserData(data.user);
        localStorage.setItem("token", data.token);
        onNavigate("dashboard");
      }
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        general: err.response?.data?.message || "Login failed",
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-purple-400 px-4">
      <form
        onSubmit={submitHandler}
        className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 space-y-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-purple-700">Login to your account</h2>
          <button
            type="button"
                            onClick={() => onNavigate("signup")}
            className="text-sm text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </div>

        <p className="text-gray-600 text-sm">
          Enter your email and password to access your account.
        </p>

        {errors.general && (
          <p className="text-sm text-red-600 bg-red-100 p-2 rounded">{errors.general}</p>
        )}

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="demo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <button
              type="button"
              onClick={() => alert("Feature coming soon")}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot?
            </button>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            <label htmlFor="showPassword" className="text-sm text-gray-600">
              Show Password
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-700 hover:bg-purple-800 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
