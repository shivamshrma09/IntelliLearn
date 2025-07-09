import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';
import './SignupPage.css';

export const SignupPage = ({ onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    examType: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});

  const examTypes = [
    { value: 'jee', label: 'JEE Main/Advanced' },
    { value: 'neet', label: 'NEET' },
    { value: 'upsc', label: 'UPSC CSE' },
    { value: 'cat', label: 'CAT' },
    { value: 'banking', label: 'Banking Exams' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.examType) newErrors.examType = 'Please select your exam type';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms and conditions';
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
    <div className="signup-bg">
      <div className="signup-container">
        {/* Back Button */}
        <button 
          onClick={() => onNavigate('landing')}
          className="signup-backbtn"
        >
          <ArrowLeft size={20} style={{ marginRight: 8 }} />
          Back to Home
        </button>

        {/* Signup Card */}
        <div className="signup-card">
          {/* Header */}
          <div className="signup-header">
            <div className="signup-logo-row">
              <div className="signup-logo-icon"><span>IL</span></div>
              <span className="signup-logo-text">IntelliLearn</span>
            </div>
            <h2 className="signup-title">Create Your Account</h2>
            <p className="signup-subtitle">Start your personalized learning journey today</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="signup-names-row">
              <div>
                <label htmlFor="firstName" className="signup-label">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`signup-input${errors.firstName ? ' signup-input-error' : ''}`}
                  placeholder="First name"
                />
                {errors.firstName && <p className="signup-error">{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="signup-label">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`signup-input${errors.lastName ? ' signup-input-error' : ''}`}
                  placeholder="Last name"
                />
                {errors.lastName && <p className="signup-error">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="email" className="signup-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
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
                  value={formData.password}
                  onChange={handleInputChange}
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
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
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
              <label htmlFor="examType" className="signup-label">Primary Exam Target</label>
              <select
                id="examType"
                name="examType"
                value={formData.examType}
                onChange={handleInputChange}
                className={`signup-input${errors.examType ? ' signup-input-error' : ''}`}
              >
                <option value="">Select your exam type</option>
                {examTypes.map(exam => (
                  <option key={exam.value} value={exam.value}>{exam.label}</option>
                ))}
              </select>
              {errors.examType && <p className="signup-error">{errors.examType}</p>}
            </div>
            <div className="signup-terms-row">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className="signup-checkbox"
              />
              <label htmlFor="agreeTerms" className="signup-terms-label">
                I agree to the{' '}
                <a href="#" className="signup-link">Terms and Conditions</a>{' '}
                and{' '}
                <a href="#" className="signup-link">Privacy Policy</a>
              </label>
            </div>
            {errors.agreeTerms && <p className="signup-error">{errors.agreeTerms}</p>}
            <button
              type="submit"
              className="signup-submit-btn"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="signup-divider">
            <span>Or continue with</span>
          </div>

          {/* Social Login */}
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

          {/* Login Link */}
          <p className="signup-login-row">
            Already have an account?{' '}
            <button 
              onClick={() => onNavigate('login')}
              className="signup-login-link"
            >
              Sign in here
            </button>
          </p>
        </div>

        {/* Benefits */}
        <div className="signup-benefits">
          <h3>What you'll get:</h3>
          <div>
            <div className="signup-benefit"><CheckCircle size={16} className="signup-benefit-icon" /> 5 Free AI-generated chapters</div>
            <div className="signup-benefit"><CheckCircle size={16} className="signup-benefit-icon" /> 1 Custom batch creation</div>
            <div className="signup-benefit"><CheckCircle size={16} className="signup-benefit-icon" /> Basic quizzes and progress tracking</div>
          </div>
        </div>
      </div>
    </div>
  );
};
