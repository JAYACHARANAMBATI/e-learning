import { Link } from 'react-router-dom';
import './Navbar.css';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [activeLink, setActiveLink] = useState('/');

  // Check for saved preferences on component mount
  useEffect(() => {
    // Check for high contrast preference
    const savedContrast = localStorage.getItem('highContrast');
    if (savedContrast === 'true') {
      setIsHighContrast(true);
      document.body.classList.add('high-contrast');
    }
    
    // Set active link based on current path
    setActiveLink(window.location.pathname);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden'; // Prevent scrolling when menu is open
  };
  
  const toggleHighContrast = () => {
    const newState = !isHighContrast;
    setIsHighContrast(newState);
    
    if (newState) {
      document.body.classList.add('high-contrast');
      localStorage.setItem('highContrast', 'true');
    } else {
      document.body.classList.remove('high-contrast');
      localStorage.setItem('highContrast', 'false');
    }
  };

  return (
    <>
      {/* Skip to Content Link (for screen readers) */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <nav className="navbar" aria-label="Main navigation">
        {/* Overlay for mobile menu */}
        <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`} onClick={closeMenu} aria-hidden="true"></div>
        <div className="navbar-container">
          {/* Logo/Brand */}
          <Link className="navbar-brand" to="/" aria-label="E-Learning Platform Home">
            <span aria-hidden="true">🎓</span> Inclusive Learn
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-links">
            <li>
              <Link 
                className={`nav-link ${activeLink === '/' ? 'active' : ''}`} 
                to="/"
                onClick={() => setActiveLink('/')}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                className={`nav-link ${activeLink === '/courses' ? 'active' : ''}`} 
                to="/courses"
                onClick={() => setActiveLink('/courses')}
              >
                Courses
              </Link>
            </li>
            <li>
              <Link 
                className={`nav-link ${activeLink === '/accessibility' ? 'active' : ''}`} 
                to="/accessibility"
                onClick={() => setActiveLink('/accessibility')}
              >
                Accessibility
              </Link>
            </li>
            <li>
              <Link 
                className={`nav-link ${activeLink === '/contact' ? 'active' : ''}`} 
                to="/contact"
                onClick={() => setActiveLink('/contact')}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Accessibility Quick Tools */}
          <div className="accessibility-tools">
            <button 
              className="accessibility-tool" 
              aria-label="Increase text size"
              onClick={() => document.documentElement.style.fontSize = '18px'}
            >
              <span aria-hidden="true">A+</span>
            </button>
            <button 
              className="accessibility-tool" 
              aria-label="Decrease text size"
              onClick={() => document.documentElement.style.fontSize = '16px'}
            >
              <span aria-hidden="true">A-</span>
            </button>
            <button 
              className={`accessibility-tool ${isHighContrast ? 'active' : ''}`}
              aria-label={`${isHighContrast ? 'Disable' : 'Enable'} high contrast mode`}
              aria-pressed={isHighContrast}
              onClick={toggleHighContrast}
            >
              <span aria-hidden="true">HC</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`menu-button ${isMenuOpen ? 'open' : ''}`}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={toggleMenu}>
            <span className="menu-icon"></span>
            <span className="menu-icon"></span>
            <span className="menu-icon"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} aria-hidden={!isMenuOpen}>
          <div className="mobile-menu-content">
            <ul>
              <li>
                <Link 
                  className={`mobile-nav-link ${activeLink === '/' ? 'active' : ''}`} 
                  to="/" 
                  onClick={() => {
                    setActiveLink('/');
                    closeMenu();
                  }}
                >
                  <span className="nav-icon">🏠</span> Home
                </Link>
              </li>
              <li>
                <Link 
                  className={`mobile-nav-link ${activeLink === '/courses' ? 'active' : ''}`} 
                  to="/courses" 
                  onClick={() => {
                    setActiveLink('/courses');
                    closeMenu();
                  }}
                >
                  <span className="nav-icon">📚</span> Courses
                </Link>
              </li>
              <li>
                <Link 
                  className={`mobile-nav-link ${activeLink === '/accessibility' ? 'active' : ''}`} 
                  to="/accessibility" 
                  onClick={() => {
                    setActiveLink('/accessibility');
                    closeMenu();
                  }}
                >
                  <span className="nav-icon">♿</span> Accessibility Features
                </Link>
              </li>
              <li>
                <Link 
                  className={`mobile-nav-link ${activeLink === '/contact' ? 'active' : ''}`} 
                  to="/contact" 
                  onClick={() => {
                    setActiveLink('/contact');
                    closeMenu();
                  }}
                >
                  <span className="nav-icon">✉️</span> Contact Us
                </Link>
              </li>
            </ul>

            <div className="mobile-accessibility-tools">
              <h3>Quick Access</h3>
              <div className="accessibility-buttons">
                <button 
                onClick={() => {
                  document.documentElement.style.fontSize = '18px';
                  closeMenu();
                }}
                className="mobile-access-btn"
              >
                <span className="btn-icon">A+</span> Increase Text Size
              </button>
              <button 
                onClick={() => {
                  document.documentElement.style.fontSize = '16px';
                  closeMenu();
                }}
                className="mobile-access-btn"
              >
                <span className="btn-icon">A-</span> Normal Text Size
              </button>
              <button 
                onClick={() => {
                  toggleHighContrast();
                  closeMenu();
                }}
                className={`mobile-access-btn ${isHighContrast ? 'active' : ''}`}
                aria-pressed={isHighContrast}
              >
                <span className="btn-icon">HC</span> {isHighContrast ? 'Disable' : 'Enable'} High Contrast
              </button>
                
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}