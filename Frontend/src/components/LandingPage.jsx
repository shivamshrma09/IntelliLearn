import React, { useState } from 'react';
import { BookOpen, Brain, Users, Trophy, Star, CheckCircle, ArrowRight, Play, Menu, X } from 'lucide-react';
import './LandingPage.css'; // Import the CSS file

export const LandingPage = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Personalization",
      description: "Generate custom learning chapters tailored to your curriculum and learning style instantly."
    },
    {
      icon: BookOpen,
      title: "Custom Batch Creation",
      description: "Upload your syllabus and let AI create a complete course structure with integrated quizzes."
    },
    {
      icon: Users,
      title: "Adaptive Learning",
      description: "Quizzes that adapt to your performance and provide targeted feedback for improvement."
    },
    {
      icon: Trophy,
      title: "Gamified Experience",
      description: "Earn points, maintain streaks, and get certificates to stay motivated in your learning journey."
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      exam: "JEE Main 2024",
      image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150",
      quote: "IntelliLearn's custom batch feature helped me create perfect study materials for my specific coaching curriculum."
    },
    {
      name: "Rahul Patel",
      exam: "NEET 2024",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      quote: "The AI-generated chapters are incredibly detailed and exactly what I needed for my preparation."
    },
    {
      name: "Sneha Gupta",
      exam: "UPSC CSE 2024",
      image: "https://images.pexels.com/photos/3586091/pexels-photo-3586091.jpeg?auto=compress&cs=tinysrgb&w=150",
      quote: "Finally, a platform that understands my unique study requirements. The personalization is amazing!"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Students Enrolled" },
    { number: "500+", label: "Courses Created" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "AI Support" }
  ];

  return (
    <div className="landing-page-container">
      {/* Header */}
      <header className="header-main">
        <div className="header-content-wrapper">
          <div className="header-logo-group">
            <div className="header-logo-icon-wrapper">
              <span className="header-logo-text">IL</span>
            </div>
            <span className="header-brand-name">IntelliLearn</span>
          </div>
          
          <nav className="header-nav-desktop">
            <a href="#features" className="header-nav-link">Features</a>
            <a href="#how-it-works" className="header-nav-link">How it Works</a>
            <a href="#testimonials" className="header-nav-link">Testimonials</a>
            <a href="#pricing" className="header-nav-link">Pricing</a>
          </nav>

          <div className="header-actions-desktop">
            <button 
              onClick={() => onNavigate('login')}
              className="header-login-button"
            >
              Login
            </button>
            <button 
              onClick={() => onNavigate('signup')}
              className="header-get-started-button"
            >
              Get Started
            </button>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="header-menu-toggle-button"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-items">
              <a href="#features" className="mobile-menu-link">Features</a>
              <a href="#how-it-works" className="mobile-menu-link">How it Works</a>
              <a href="#testimonials" className="mobile-menu-link">Testimonials</a>
              <a href="#pricing" className="mobile-menu-link">Pricing</a>
              <button 
                onClick={() => onNavigate('login')}
                className="mobile-menu-login-button"
              >
                Login
              </button>
              <button 
                onClick={() => onNavigate('signup')}
                className="mobile-menu-get-started-button"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content-wrapper">
          <div className="hero-text-container">
            <h1 className="hero-title">
              Your <span className="hero-title-gradient">AI-Powered</span> Learning Partner
            </h1>
            <p className="hero-subtitle">
              Create personalized learning experiences with AI-generated content, adaptive quizzes, and custom course creation. Upload your syllabus and let AI build your perfect study plan.
            </p>
            <div className="hero-buttons-group">
              <button 
                onClick={() => onNavigate('signup')}
                className="hero-primary-button"
              >
                <span>Start Learning Free</span>
                <ArrowRight size={20} />
              </button>
              <button className="hero-secondary-button">
                <Play size={20} />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="hero-stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="hero-stat-item">
                <div className="hero-stat-number">{stat.number}</div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Hero Image */}
          <div className="hero-image-container">
            <div className="hero-image-card">
              <img 
                src="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="IntelliLearn Dashboard"
                className="hero-main-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-content-wrapper">
          <div className="section-header">
            <h2 className="section-title">
              Revolutionary Learning Features
            </h2>
            <p className="section-subtitle">
              Experience the future of education with AI-powered personalization and adaptive learning technology.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon-wrapper">
                    <Icon className="feature-icon" />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="section-content-wrapper">
          <div className="section-header">
            <h2 className="section-title">
              How IntelliLearn Works
            </h2>
            <p className="section-subtitle">
              Three simple steps to transform your learning experience with AI-powered personalization.
            </p>
          </div>

          <div className="how-it-works-grid">
            <div className="how-it-works-item">
              <div className="how-it-works-icon-wrapper">
                <span className="how-it-works-number">1</span>
              </div>
              <h3 className="how-it-works-title">Upload Your Syllabus</h3>
              <p className="how-it-works-description">Upload your curriculum PDF or paste your syllabus text. Our AI will analyze and understand your learning requirements.</p>
            </div>
            <div className="how-it-works-item">
              <div className="how-it-works-icon-wrapper">
                <span className="how-it-works-number">2</span>
              </div>
              <h3 className="how-it-works-title">AI Creates Your Batch</h3>
              <p className="how-it-works-description">Our AI generates a complete course structure with chapters, quizzes, and learning materials tailored to your needs.</p>
            </div>
            <div className="how-it-works-item">
              <div className="how-it-works-icon-wrapper">
                <span className="how-it-works-number">3</span>
              </div>
              <h3 className="how-it-works-title">Learn & Excel</h3>
              <p className="how-it-works-description">Start learning with adaptive content, track your progress, and earn certificates as you master each topic.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-content-wrapper">
          <div className="section-header">
            <h2 className="section-title">
              What Students Say
            </h2>
            <p className="section-subtitle">
              Join thousands of successful students who've transformed their learning with IntelliLearn.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-author-info">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="testimonial-author-image"
                  />
                  <div>
                    <h4 className="testimonial-author-name">{testimonial.name}</h4>
                    <p className="testimonial-author-exam">{testimonial.exam}</p>
                  </div>
                </div>
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="pricing-section">
        <div className="section-content-wrapper">
          <div className="section-header">
            <h2 className="section-title">
              Choose Your Plan
            </h2>
            <p className="section-subtitle">
              Start free and upgrade as you grow. All plans include core AI features.
            </p>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card">
              <h3 className="pricing-plan-title">Free</h3>
              <div className="pricing-price">₹0<span className="pricing-price-period">/month</span></div>
              <ul className="pricing-features-list">
                <li className="pricing-feature-item"><CheckCircle className="feature-check-icon" />5 AI-generated chapters</li>
                <li className="pricing-feature-item"><CheckCircle className="feature-check-icon" />Basic quizzes</li>
                <li className="pricing-feature-item"><CheckCircle className="feature-check-icon" />1 custom batch</li>
                <li className="pricing-feature-item"><CheckCircle className="feature-check-icon" />Community support</li>
              </ul>
              <button className="pricing-button-secondary">
                Get Started
              </button>
            </div>

            <div className="pricing-card pricing-card-popular">
              <div className="pricing-popular-tag">
                Popular
              </div>
              <h3 className="pricing-plan-title">Pro</h3>
              <div className="pricing-price">₹299<span className="pricing-price-period">/month</span></div>
              <ul className="pricing-features-list">
                <li className="pricing-feature-item"><CheckCircle className="feature-check-icon" />Unlimited AI chapters</li>
                <li className="pricing-feature-item"><CheckCircle className="feature-check-icon" />Advanced analytics</li>
                <li className="pricing-feature-item"><CheckCircle className="feature-check-icon" />Unlimited custom batches</li>
                <li className="pricing-feature-item"><CheckCircle className="feature-check-icon" />Priority support</li>
                <li className="pricing-feature-item"><CheckCircle className="feature-check-icon" />Certificate downloads</li>
              </ul>
              <button className="pricing-button-primary">
                Choose Pro
              </button>
            </div>

            <div className="pricing-card">
              <h3 className="pricing-plan-title">Enterprise</h3>
              <div className="pricing-price">₹999<span className="pricing-price-period">/month</span></div>
              <ul className="pricing-features-list">
                <li className="pricing-feature-item"><CheckCircle className="feature-check-icon" />Everything in Pro</li>
                <li className="pricing-feature-item"><CheckCircle className="feature-check-icon" />Multi-user accounts</li>
                <li className="pricing-feature-item"><CheckCircle className="feature-check-icon" />Custom branding</li>
                <li className="pricing-feature-item"><CheckCircle className="feature-check-icon" />API access</li>
                <li className="pricing-feature-item"><CheckCircle className="feature-check-icon" />Dedicated support</li>
              </ul>
              <button className="pricing-button-secondary">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-content-wrapper cta-text-center">
          <h2 className="cta-title">
            Ready to Transform Your Learning?
          </h2>
          <p className="cta-subtitle">
            Join thousands of students who are already learning smarter with AI-powered personalization.
          </p>
          <button 
            onClick={() => onNavigate('signup')}
            className="cta-button"
          >
            Get Started Free Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-main">
        <div className="section-content-wrapper">
          <div className="footer-grid">
            <div>
              <div className="footer-logo-group">
                <div className="footer-logo-icon-wrapper">
                  <span className="footer-logo-text">IL</span>
                </div>
                <span className="footer-brand-name">IntelliLearn</span>
              </div>
              <p className="footer-description">
                Your AI-powered learning partner for personalized education and exam preparation.
              </p>
            </div>
            <div>
              <h4 className="footer-heading">Product</h4>
              <ul className="footer-links-list">
                <li><a href="#" className="footer-link">Features</a></li>
                <li><a href="#" className="footer-link">Pricing</a></li>
                <li><a href="#" className="footer-link">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-links-list">
                <li><a href="#" className="footer-link">About</a></li>
                <li><a href="#" className="footer-link">Careers</a></li>
                <li><a href="#" className="footer-link">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-heading">Support</h4>
              <ul className="footer-links-list">
                <li><a href="#" className="footer-link">Help Center</a></li>
                <li><a href="#" className="footer-link">Community</a></li>
                <li><a href="#" className="footer-link">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2024 IntelliLearn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};