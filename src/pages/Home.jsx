import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Home.css';
import heroImage from '../assets/hero-image.svg';
import Particles from '../components/Particles';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Add scroll event listener for scroll animations
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.8;
        
        if (isInView) {
          el.classList.add('animate-in');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className={`home-container ${isVisible ? 'fade-in' : ''}`} role="main">
      <div className="particles-container" aria-hidden="true">
        <Particles variant="default" />
      </div>
      {/* Hero Section */}
      <header className="hero-section" aria-labelledby="main-heading">
        <div className="hero-content">
          <h1 id="main-heading" className="hero-title animate-on-scroll">
            <span className="highlight gradient-text">Inclusive</span> E-Learning Platform
          </h1>
          <p className="hero-subtitle animate-on-scroll">
            Empowering individuals of all abilities through accessible education
          </p>
          <div className="cta-buttons animate-on-scroll">
            <Link to="/courses" className="primary-button pulse" aria-label="Explore courses">
              Explore Courses
            </Link>
            <Link to="/accessibility" className="secondary-button" aria-label="Learn about accessibility features">
              Accessibility Features
            </Link>
          </div>
        </div>
        <div className="hero-image animate-on-scroll" aria-hidden="true">
          <img src={heroImage} alt="" className="floating" />
        </div>
      </header>

      {/* About Section */}
      <section className="about-section" aria-labelledby="about-heading">
        <h2 id="about-heading" className="section-title animate-on-scroll">Our Mission</h2>
        <div className="about-content animate-on-scroll">
          <p>
            We believe education should be accessible to everyone, regardless of physical,
            cognitive, or sensory abilities. Our platform is designed with universal design
            principles to ensure all learners can thrive.
          </p>
          <div className="features-grid">
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon" aria-hidden="true">👁️</div>
              <h3>Visual Impairment Support</h3>
              <p>Screen reader compatibility, high contrast modes, and text-to-speech functionality</p>
            </div>
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon" aria-hidden="true">👂</div>
              <h3>Hearing Impairment Support</h3>
              <p>Closed captions, sign language interpretation, and visual alerts</p>
            </div>
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon" aria-hidden="true">🖐️</div>
              <h3>Motor Impairment Support</h3>
              <p>Keyboard navigation, voice control, and adaptive input methods</p>
            </div>
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon" aria-hidden="true">🧠</div>
              <h3>Cognitive Support</h3>
              <p>Simplified interfaces, reading assistance, and customizable learning paths</p>
            </div>
          </div>
        </div>
      </section>

  
      <section className="cta-section" aria-labelledby="cta-heading">
        <div className="cta-background"></div>
        <h2 id="cta-heading" className="section-title animate-on-scroll">Ready to Begin Your Learning Journey?</h2>
        <p className="animate-on-scroll">Join thousands of learners who are achieving their educational goals</p>
        <button className="primary-button large animate-on-scroll pulse" aria-label="Sign up now">
          Sign Up Now
        </button>
      </section>
    </div>
  );
}