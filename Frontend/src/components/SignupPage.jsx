// src/pages/SignupPage.js

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import './SignupPage.css';

const SignupPage = ({onNavigate}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm your password";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!agreeTerms) newErrors.agreeTerms = "You must agree to the terms";
    return newErrors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      const response = await axios.post("http://localhost:9000/students/register", { name, email, password });
      if (response.status === 201) {
        const data = response.data;
        setUserData(data.user);
        localStorage.setItem("token", data.token);
                onNavigate('dashboard');

      }
    } catch (err) {
      setErrors({ email: "Registration failed. Try another email." });
    }
  };

  return (
    <div className="signup-bg">
      <div className="signup-container">
        <button onClick={() => navigate('/')} className="signup-backbtn">
          <ArrowLeft size={20} style={{ marginRight: 8 }} />
          Back to Home
        </button>
        <div className="signup-card">
          <div className="signup-header">
            <div className="signup-logo-row">
              <div className="signup-logo-icon"><span>IL</span></div>
              <span className="signup-logo-text">IntelliLearn</span>
            </div>
            <h2 className="signup-title">Create Your Account</h2>
            <p className="signup-subtitle">Start your personalized learning journey today</p>
          </div>
          <form className="signup-form" onSubmit={submitHandler}>
            <div>
              <label htmlFor="name" className="signup-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`signup-input${errors.name ? ' signup-input-error' : ''}`}
                placeholder="Your name"
              />
              {errors.name && <p className="signup-error">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="signup-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`signup-input${errors.email ? ' signup-input-error' : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="signup-error">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="signup-label">Password</label>
              <div className="signup-password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`signup-input signup-input-password${errors.password ? ' signup-input-error' : ''}`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="signup-password-toggle"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="signup-error">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="signup-label">Confirm Password</label>
              <div className="signup-password-wrap">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`signup-input signup-input-password${errors.confirmPassword ? ' signup-input-error' : ''}`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="signup-password-toggle"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="signup-error">{errors.confirmPassword}</p>}
            </div>
            <div>
              <label htmlFor="agreeTerms" className="signup-terms-label">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  style={{ marginRight: 8 }}
                />
                I agree to the{' '}
                <a href="#" className="signup-link">Terms and Conditions</a>{' '}
                and{' '}
                <a href="#" className="signup-link">Privacy Policy</a>
              </label>
            </div>
            {errors.agreeTerms && <p className="signup-error">{errors.agreeTerms}</p>}
            <button type="submit" className="signup-submit-btn">Create Account</button>
          </form>
          <div className="signup-divider"><span>Or continue with</span></div>
          <div className="signup-social-row">
            <button className="signup-social-btn">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="signup-social-icon" />
              Google
            </button>
            <button className="signup-social-btn">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="Facebook" className="signup-social-icon" />
              Facebook
            </button>
          </div>
          <p className="signup-login-row">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="signup-login-link">
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
