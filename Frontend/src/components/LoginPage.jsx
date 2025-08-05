import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserContext";
import { Eye , EyeOff, ArrowLeft } from "lucide-react";
import "./LoginPage.css";
import axios from "axios";

const LoginPage = ({ onNavigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { setUserData } = useUserData();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Please enter a valid email address";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:1000'}/students/login`,
        { email, password }
      );

      if (response.status === 200) {
        const data = response.data;
        setUserData(data.user);
        localStorage.setItem("token", data.token);
        onNavigate('dashboard');
      }
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        general: err.response?.data?.message || "Login failed",
      }));
    }

    // Optionally clear only non-error fields
    setPassword("");
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <button
          onClick={() => onNavigate("landing")}
          className="login-backbtn"
        >
          <ArrowLeft size={20} style={{ marginRight: 8 }} />
          Back to Home
        </button>
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo-row">
              <div className="login-logo-icon">
                <span>IL</span>
              </div>
              <span className="login-logo-text">IntelliLearn</span>
            </div>
            <h2 className="login-title">Welcome Back!</h2>
            <p className="login-subtitle">
              Sign in to continue your learning journey
            </p>
          </div>

          <form className="login-form" onSubmit={submitHandler}>
            <div>
              <label htmlFor="email" className="login-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`login-input${
                  errors.email ? " login-input-error" : ""
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="login-error">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="login-label">
                Password
              </label>
              <div className="login-password-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`login-input login-input-password${
                    errors.password ? " login-input-error" : ""
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="login-password-toggle"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="login-error">{errors.password}</p>
              )}
            </div>

            <div className="login-remember-row">
              <label className="login-checkbox-label">
                <input type="checkbox" className="login-checkbox" />
                Remember me
              </label>
              <a href="#" className="login-forgot-link">
                Forgot password?
              </a>
            </div>

            {errors.general && (
              <p className="login-error">{errors.general}</p>
            )}

            <button type="submit" className="login-submit-btn">
              Sign In
            </button>
          </form>

          <div className="login-divider">
            <span>Or continue with</span>
          </div>
          <div className="login-social-row">
            <button className="login-social-btn">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="Google"
                className="login-social-icon"
              />
              Google
            </button>
            <button className="login-social-btn">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
                alt="Facebook"
                className="login-social-icon"
              />
              Facebook
            </button>
          </div>

          <p className="login-signup-row">
            Don't have an account?{" "}
            <button
              onClick={() => onNavigate("signup")}
              className="login-signup-link"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
