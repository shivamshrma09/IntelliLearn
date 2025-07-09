import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import './LoginPage.css';

export const LoginPage = ({ onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // API call here
      onNavigate('dashboard');
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        {/* Back Button */}
        <button 
          onClick={() => onNavigate('landing')}
          className="login-backbtn"
        >
          <ArrowLeft size={20} style={{ marginRight: 8 }} />
          Back to Home
        </button>

        {/* Login Card */}
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <div className="login-logo-row">
              <div className="login-logo-icon"><span>IL</span></div>
              <span className="login-logo-text">IntelliLearn</span>
            </div>
            <h2 className="login-title">Welcome Back!</h2>
            <p className="login-subtitle">Sign in to continue your learning journey</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="login-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`login-input${errors.email ? ' login-input-error' : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="login-error">{errors.email}</p>}
            </div>
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="login-label">Password</label>
              <div className="login-password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`login-input login-input-password${errors.password ? ' login-input-error' : ''}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="login-password-toggle"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="login-error">{errors.password}</p>}
            </div>
            {/* Remember Me and Forgot Password */}
            <div className="login-remember-row">
              <label className="login-checkbox-label">
                <input
                  type="checkbox"
                  className="login-checkbox"
                />
                Remember me
              </label>
              <a href="#" className="login-forgot-link">
                Forgot password?
              </a>
            </div>
            {/* Login Button */}
            <button
              type="submit"
              className="login-submit-btn"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="login-divider">
            <span>Or continue with</span>
          </div>

          {/* Social Login */}
          <div className="login-social-row">
            <button className="login-social-btn">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="login-social-icon" />
              Google
            </button>
            <button className="login-social-btn">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="Facebook" className="login-social-icon" />
              Facebook
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="login-signup-row">
            Don't have an account?{' '}
            <button 
              onClick={() => onNavigate('signup')}
              className="login-signup-link"
            >
              Sign up here
            </button>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="login-demo">
          <p className="login-demo-title">Demo Credentials:</p>
          <p className="login-demo-cred">Email: demo@intellilearn.com</p>
          <p className="login-demo-cred">Password: demo123</p>
        </div>
      </div>
    </div>
  );
};
