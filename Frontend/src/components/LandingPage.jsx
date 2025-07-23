// LandingPage.jsx

import React, { useState } from 'react';
import './LandingPage.css';

// --- START: Icon Imports from react-icons ---
import { FaRocket, FaAward } from 'react-icons/fa'; // Rocket and Award icons from FontAwesome
import {
    MdLightbulb,           // For Lightbulb
    MdCheckCircle,         // For Checkmark circles (solutions, pricing features)
    MdBarChart,            // For features
    MdBook,                // For features
    MdPeople,              // For features
    MdTrendingUp,          // For solutions
    MdStar,                // For testimonials
    MdOutlineAttachMoney,  // For pricing if needed
    MdQuestionMark         // For FAQ
} from 'react-icons/md';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';

// --- END: Icon Imports ---

  const LandingPage = ({onNavigate}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="landing-page-container">
            {/* Header */}
            <header className="header-main">
                <div className="header-content-wrapper">
                        <div className="header-logo-icon-wrapper">
                             <span>IL</span>
                                   </div>
                          <span className="header-brand-name">IntelliLearn</span>


                    <nav className="header-nav-desktop">
                        <a href="#features" className="header-nav-link">Features</a>
                        <a href="#how-it-works" className="header-nav-link">How It Works</a>
                        <a href="#testimonials" className="header-nav-link">Testimonials</a>
                        <a href="#pricing" className="header-nav-link">Pricing</a>
                    </nav>

                    <div className="header-actions-desktop">
      <button onClick={() => onNavigate("login") } className="header-login-button" >Login</button>
      <button onClick={() => onNavigate("signup") } className="header-login-button" >Get Started</button>

                    </div>

                    <button className="header-menu-toggle-button" onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="mobile-menu">
                    <div className="mobile-menu-items">
                        <a href="#features" className="mobile-menu-link" onClick={toggleMobileMenu}>Features</a>
                        <a href="#how-it-works" className="mobile-menu-link" onClick={toggleMobileMenu}>How It Works</a>
                        <a href="#testimonials" className="mobile-menu-link" onClick={toggleMobileMenu}>Testimonials</a>
                        <a href="#pricing" className="mobile-menu-link" onClick={toggleMobileMenu}>Pricing</a>
                        <button className="mobile-menu-login-button" onClick={() => { toggleMobileMenu(); onNavigate("login"); }}>Login</button>
                        <button className="mobile-menu-get-started-button" onClick={() => { toggleMobileMenu(); onNavigate("signup"); }}>Get Started Free</button>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className="hero-section">
                <div className="section-content-wrapper hero-content-wrapper-modified">
                 
                    <div className="hero-text-and-buttons">
                        <h1 className="hero-title">
                            Master Your Exams with <span className="hero-title-gradient">AI-Powered Learning</span>
                        </h1>
                        <p className="hero-subtitle">
                            IntelliLearn is your personal AI tutor, providing adaptive lessons, instant feedback, and
                            in-depth analytics to help you excel in any competitive exam.
                        </p>
                        <div className="hero-buttons-group">
                            <button className="hero-primary-button" onClick={() => onNavigate("signup")}>Start Free Trial</button>
                            <button className="hero-secondary-button" onClick={() => onNavigate("login")}>Login Now</button>
                        </div>
                    </div>
                </div>
                <div className="section-content-wrapper hero-stats-section">
                    <div className="hero-stats-grid">
                        <div className="hero-stat-item">
                            <h3 className="hero-stat-number">100K+</h3>
                            <p className="hero-stat-label">Happy Students</p>
                        </div>
                        <div className="hero-stat-item">
                            <h3 className="hero-stat-number">95%</h3>
                            <p className="hero-stat-label">Success Rate</p>
                        </div>
                        <div className="hero-stat-item">
                            <h3 className="hero-stat-number">50+</h3>
                            <p className="hero-stat-label">Exams Covered</p>
                        </div>
                        <div className="hero-stat-item">
                            <h3 className="hero-stat-number">24/7</h3>
                            <p className="hero-stat-label">AI Tutoring</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* "As Featured In" Section */}
            <section className="featured-in-section">
                <div className="section-content-wrapper">
                    <p className="featured-in-text">Trusted by leading educators and students worldwide:</p>
                    <div className="featured-in-logos-grid">
                        <div style={{ width: '120px', height: '40px', backgroundColor: '#E5E7EB', color: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>UNIVERSITY A</div>
                        <div style={{ width: '120px', height: '40px', backgroundColor: '#E5E7EB', color: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>EDU MAG</div>
                        <div style={{ width: '120px', height: '40px', backgroundColor: '#E5E7EB', color: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>TECH BLOG</div>
                        <div style={{ width: '120px', height: '40px', backgroundColor: '#E5E7EB', color: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>COACHING C</div>
                        <div style={{ width: '120px', height: '40px', backgroundColor: '#E5E7EB', color: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>ACADEMY D</div>
                    </div>
                </div>
            </section>

            {/* Problem/Solution Section */}
            <section className="problem-solution-section">
                <div className="section-content-wrapper">
                    <div className="section-header">
                        <h2 className="section-title">
                            Solving <span className="hero-title-gradient">Your Biggest Study Challenges</span>
                        </h2>
                        <p className="section-subtitle">
                            Traditional learning methods often fall short. IntelliLearn fills the gaps, ensuring a
                            smarter, more effective path to success.
                        </p>
                    </div>
                    <div className="problem-solution-grid">
                        <div className="problem-card">
                            <MdLightbulb className="problem-icon" size={36} />
                            <h3 className="problem-title">Feeling Overwhelmed by Vast Syllabi?</h3>
                            <p className="problem-description">
                                Textbooks are dense, and knowing where to start can be daunting. You waste precious time trying to
                                figure out what's important.
                            </p>
                        </div>
                        <div className="solution-card">
                            <MdCheckCircle className="solution-icon" size={36} />
                            <h3 className="solution-title">AI-Driven Personalized Learning Paths</h3>
                            <p className="solution-description">
                                IntelliLearn's AI intelligently analyzes your weaknesses and creates a tailored study plan,
                                guiding you efficiently through complex topics.
                            </p>
                        </div>
                        <div className="problem-card">
                            <MdLightbulb className="problem-icon" size={36} />
                            <h3 className="problem-title">Stuck on Concepts, No One to Ask?</h3>
                            <p className="problem-description">
                                When you hit a roadblock outside of class hours, getting immediate, clear explanations is
                                almost impossible.
                            </p>
                        </div>
                        <div className="solution-card">
                            <MdCheckCircle className="solution-icon" size={36} />
                            <h3 className="solution-title">Instant AI-Powered Tutoring</h3>
                            <p className="solution-description">
                                Get instant, step-by-step explanations for any question or concept, available 24/7.
                                Never be stuck again.
                            </p>
                        </div>
                        <div className="problem-card">
                            <MdLightbulb className="problem-icon" size={36} />
                            <h3 className="problem-title">Guessing Your Exam Readiness?</h3>
                            <p className="problem-description">
                                Mock tests help, but often lack deep insights into *why* you made errors or how to improve
                                strategically.
                            </p>
                        </div>
                        <div className="solution-card">
                            <MdTrendingUp className="solution-icon" size={36} />
                            <h3 className="solution-title">Predictive Performance Analytics</h3>
                            <p className="solution-description">
                                Our platform provides detailed reports, predicting your exam scores and highlighting
                                exact areas for improvement, ensuring targeted practice.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
                <div className="section-content-wrapper">
                    <div className="section-header">
                        <h2 className="section-title">
                            Discover Powerful <span className="hero-title-gradient">IntelliLearn Features</span>
                        </h2>
                        <p className="section-subtitle">
                            Harness the power of AI to transform your learning experience and achieve your academic goals.
                        </p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <MdBarChart className="feature-icon" />
                            </div>
                            <h3 className="feature-title">Adaptive AI Tutoring</h3>
                            <p className="feature-description">
                                Our intelligent AI tutor personalizes your learning path, adapting to your pace and
                                understanding, ensuring efficient learning.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <MdBook className="feature-icon" />
                            </div>
                            <h3 className="feature-title">Comprehensive Practice</h3>
                            <p className="feature-description">
                                Access a vast library of practice questions and mock tests, all curated to match your
                                exam syllabus and difficulty.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <MdPeople className="feature-icon" />
                            </div>
                            <h3 className="feature-title">Real-time Performance</h3>
                            <p className="feature-description">
                                Get instant feedback and detailed analytics on your progress, identifying strengths and
                                areas needing more attention.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <FaAward className="feature-icon" />
                            </div>
                            <h3 className="feature-title">Concept Clarity Boost</h3>
                            <p className="feature-description">
                                AI-powered explanations break down complex topics into easy-to-understand modules,
                                ensuring fundamental understanding.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="how-it-works-section">
                <div className="section-content-wrapper">
                    <div className="section-header">
                        <h2 className="section-title">
                            Your Path to Success in <span className="hero-title-gradient">3 Simple Steps</span>
                        </h2>
                        <p className="section-subtitle">
                            Getting started with IntelliLearn is easy. Follow these steps to unlock your full academic potential.
                        </p>
                    </div>
                    <div className="how-it-works-grid">
                        <div className="how-it-works-item">
                            <div className="how-it-works-icon-wrapper">
                                <span className="how-it-works-number">1</span>
                            </div>
                            <h3 className="how-it-works-title">Sign Up & Set Goals</h3>
                            <p className="how-it-works-description">
                                Create your free account and tell us which exams or subjects you're preparing for.
                            </p>
                        </div>
                        <div className="how-it-works-item">
                            <div className="how-it-works-icon-wrapper">
                                <span className="how-it-works-number">2</span>
                            </div>
                            <h3 className="how-it-works-title">Learn with AI Tutor</h3>
                            <p className="how-it-works-description">
                                Engage with personalized lessons, practice questions, and get instant doubt resolution.
                            </p>
                        </div>
                        <div className="how-it-works-item">
                            <div className="how-it-works-icon-wrapper">
                                <span className="how-it-works-number">3</span>
                            </div>
                            <h3 className="how-it-works-title">Track & Achieve</h3>
                            <p className="how-it-works-description">
                                Monitor your progress with detailed analytics and achieve your target scores with confidence.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="testimonials-section">
                <div className="section-content-wrapper">
                    <div className="section-header">
                        <h2 className="section-title">
                            What Our Students <span className="hero-title-gradient">Are Saying</span>
                        </h2>
                        <p className="section-subtitle">
                            Hear from thousands of students who achieved their academic dreams with IntelliLearn.
                        </p>
                    </div>
                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <div>
                                <div className="testimonial-author-info">
                                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#D1D5DB', color: '#4B5563', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>JS</div>
                                    <div>
                                        <p className="testimonial-author-name">John Smith</p>
                                        <p className="testimonial-author-exam">JEE Aspirant</p>
                                    </div>
                                </div>
                                <p className="testimonial-quote">
                                    "IntelliLearn transformed my JEE preparation. The AI tutor explained complex physics concepts better than any textbook. I saw a significant jump in my scores!"
                                </p>
                            </div>
                            <div className="testimonial-stars">
                                <MdStar size={18} fill="currentColor" />
                                <MdStar size={18} fill="currentColor" />
                                <MdStar size={18} fill="currentColor" />
                                <MdStar size={18} fill="currentColor" />
                                <MdStar size={18} fill="currentColor" />
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <div>
                                <div className="testimonial-author-info">
                                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#D1D5DB', color: '#4B5563', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>AS</div>
                                    <div>
                                        <p className="testimonial-author-name">Ananya Sharma</p>
                                        <p className="testimonial-author-exam">NEET Student</p>
                                    </div>
                                </div>
                                <p className="testimonial-quote">
                                    "The adaptive practice questions are a game-changer. IntelliLearn identified my weak areas in Biology and helped me master them. Highly recommend!"
                                </p>
                            </div>
                            <div className="testimonial-stars">
                                <MdStar size={18} fill="currentColor" />
                                <MdStar size={18} fill="currentColor" />
                                <MdStar size={18} fill="currentColor" />
                                <MdStar size={18} fill="currentColor" />
                                <MdStar size={18} fill="currentColor" />
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <div>
                                <div className="testimonial-author-info">
                                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#D1D5DB', color: '#4B5563', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>RK</div>
                                    <div>
                                        <p className="testimonial-author-name">Rahul Kumar</p>
                                        <p className="testimonial-author-exam">CAT Aspirant</p>
                                    </div>
                                </div>
                                <p className="testimonial-quote">
                                    "The detailed performance analytics are incredible. I could see exactly where I was losing marks and the AI suggested the right modules to improve. My scores have skyrocketed!"
                                </p>
                            </div>
                            <div className="testimonial-stars">
                                <MdStar size={18} fill="currentColor" />
                                <MdStar size={18} fill="currentColor" />
                                <MdStar size={18} fill="currentColor" />
                                <MdStar size={18} fill="currentColor" />
                                <MdStar size={18} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="pricing-section">
                <div className="section-content-wrapper">
                    <div className="section-header">
                        <h2 className="section-title">
                            Flexible Plans for <span className="hero-title-gradient">Every Student</span>
                        </h2>
                        <p className="section-subtitle">
                            Choose the plan that fits your study needs and unlock unlimited access to IntelliLearn's
                            powerful AI tools.
                        </p>
                    </div>
                    <div className="pricing-grid">
                        {/* Basic Plan */}
                        <div className="pricing-card">
                            <h3 className="pricing-plan-title">Basic</h3>
                            <p className="pricing-price">$99<span className="pricing-price-period">/year</span></p>
                            <ul className="pricing-features-list">
                                <li className="pricing-feature-item">
                                    <MdCheckCircle className="feature-check-icon" /> Access to core AI tutor
                                </li>
                                <li className="pricing-feature-item">
                                    <MdCheckCircle className="feature-check-icon" /> Limited practice questions
                                </li>
                                <li className="pricing-feature-item">
                                    <MdCheckCircle className="feature-check-icon" /> Basic performance reports
                                </li>
                                <li className="pricing-feature-item">
                                    <MdCheckCircle className="feature-check-icon" /> Email support
                                </li>
                            </ul>
                            <button className="pricing-button-secondary" onClick={() => onNavigate("signup")}>Get Started</button>
                        </div>

                        {/* Pro Plan (Popular) */}
                        <div className="pricing-card pricing-card-popular">
                            <span className="pricing-popular-tag">Most Popular</span>
                            <h3 className="pricing-plan-title">Pro</h3>
                            <p className="pricing-price">$199<span className="pricing-price-period">/year</span></p>
                            <ul className="pricing-features-list">
                                <li className="pricing-feature-item">
                                    <MdCheckCircle className="feature-check-icon" /> Unlimited AI tutoring
                                </li>
                                <li className="pricing-feature-item">
                                    <MdCheckCircle className="feature-check-icon" /> Full practice question library
                                </li>
                                <li className="pricing-feature-item">
                                    <MdCheckCircle className="feature-check-icon" /> Advanced performance analytics
                                </li>
                                <li className="pricing-feature-item">
                                    <MdCheckCircle className="feature-check-icon" /> Priority chat support
                                </li>
                                <li className="pricing-feature-item">
                                    <MdCheckCircle className="feature-check-icon" /> Access to premium content
                                </li>
                            </ul>
                            <button className="pricing-button-primary" onClick={() => onNavigate("signup")}>Get Started</button>
                        </div>

                        {/* Premium Plan */}
                        <div className="pricing-card">
                            <h3 className="pricing-plan-title">Premium</h3>
                            <p className="pricing-price">$299<span className="pricing-price-period">/year</span></p>
                            <ul className="pricing-features-list">
                                <li className="pricing-feature-item">
                                    <MdCheckCircle className="feature-check-icon" /> All Pro features
                                </li>
                                <li className="pricing-feature-item">
                                    <MdCheckCircle className="feature-check-icon" /> Dedicated personal learning coach
                                </li>
                                <li className="pricing-feature-item">
                                    <MdCheckCircle className="feature-check-icon" /> Exclusive webinars & workshops
                                </li>
                                <li className="pricing-feature-item">
                                    <MdCheckCircle className="feature-check-icon" /> Early access to new features
                                </li>
                            </ul>
                            <button className="pricing-button-secondary" onClick={() => onNavigate("signup")}>Get Started</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq-section">
                <div className="section-content-wrapper">
                    <div className="section-header">
                        <h2 className="section-title">
                            Frequently Asked <span className="hero-title-gradient">Questions</span>
                        </h2>
                        <p className="section-subtitle">
                            Find quick answers to the most common questions about IntelliLearn.
                        </p>
                    </div>
                    <div className="faq-accordion-container">
                        <details className="faq-item">
                            <summary className="faq-question">How does IntelliLearn's AI tutor work?</summary>
                            <p className="faq-answer">
                                Our AI tutor uses advanced machine learning to analyze your learning patterns, identify
                                knowledge gaps, and then provides personalized explanations, practice problems, and
                                tailored study plans to help you master concepts efficiently.
                            </p>
                        </details>
                        <details className="faq-item">
                            <summary className="faq-question">What exams and subjects does IntelliLearn cover?</summary>
                            <p className="faq-answer">
                                IntelliLearn supports a wide range of competitive exams including JEE, NEET, UPSC, CAT,
                                GMAT, and many more. We cover subjects like Physics, Chemistry, Mathematics, Biology,
                                English, General Knowledge, and Reasoning. New exams and subjects are added regularly!
                            </p>
                        </details>
                        <details className="faq-item">
                            <summary className="faq-question">Can I use IntelliLearn on my mobile device?</summary>
                            <p className="faq-answer">
                                Yes! IntelliLearn is fully responsive and optimized for all devices. You can access
                                our platform seamlessly on your desktop, laptop, tablet, or smartphone through your web browser.
                                Dedicated mobile apps are also in development.
                            </p>
                        </details>
                        <details className="faq-item">
                            <summary className="faq-question">Is my data safe and private with IntelliLearn?</summary>
                            <p className="faq-answer">
                                Absolutely. We prioritize your privacy and data security. All your learning data is
                                encrypted and stored securely. We adhere to strict data protection regulations and
                                never share your personal information with third parties.
                            </p>
                        </details>
                        <details className="faq-item">
                            <summary className="faq-question">What kind of support can I expect?</summary>
                            <p className="faq-answer">
                                All users have access to email support. Pro and Premium plan subscribers receive
                                priority chat support and dedicated personal learning coach (Premium only) for a more
                                hands-on guidance.
                            </p>
                        </details>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="section-content-wrapper cta-content-wrapper">
                    <div className="cta-text-center">
                        <h2 className="cta-title">
                            Ready to Transform Your <br /> Learning Journey?
                        </h2>
                        <p className="cta-subtitle">
                            Join thousands of successful students who are achieving their academic goals with
                            IntelliLearn's cutting-edge AI platform.
                        </p>
                        <button className="cta-button" onClick={() => onNavigate("signup")}>Get Started Now</button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer-main">
                <div className="section-content-wrapper">
                    <div className="footer-grid">
                        <div>
                            <a href="#" className="footer-logo-group">
                                <div className="footer-logo-icon-wrapper">
                                    <FaRocket className="footer-logo-text" size={24} />
                                </div>
                                <span className="footer-brand-name">IntelliLearn</span>
                            </a>
                            <p className="footer-description">
                                IntelliLearn is revolutionizing education with AI-powered personalized learning,
                                making complex subjects easy and academic success attainable for everyone.
                            </p>
                        </div>
                        <div>
                            <h4 className="footer-heading">Company</h4>
                            <ul className="footer-links-list">
                                <li><a href="#" className="footer-link">About Us</a></li>
                                <li><a href="#" className="footer-link">Careers</a></li>
                                <li><a href="#" className="footer-link">Blog</a></li>
                                <li><a href="#" className="footer-link">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="footer-heading">Product</h4>
                            <ul className="footer-links-list">
                                <li><a href="#features" className="footer-link">Features</a></li>
                                <li><a href="#pricing" className="footer-link">Pricing</a></li>
                                <li><a href="#" className="footer-link">Testimonials</a></li>
                                <li><a href="#" className="footer-link">Demo</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="footer-heading">Legal</h4>
                            <ul className="footer-links-list">
                                <li><a href="#" className="footer-link">Privacy Policy</a></li>
                                <li><a href="#" className="footer-link">Terms of Service</a></li>
                                <li><a href="#" className="footer-link">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        © {new Date().getFullYear()} IntelliLearn. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};


export default LandingPage;
