import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">Inclusive Learn</h3>
          <p className="footer-description">
            Empowering individuals of all abilities through accessible education.
            Our platform is designed with universal design principles to ensure all learners can thrive.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <Link className="footer-link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="footer-link" to="/courses">
                Courses
              </Link>
            </li>
            <li>
              <Link className="footer-link" to="/accessibility">
                Accessibility
              </Link>
            </li>
            <li>
              <Link className="footer-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <address className="footer-contact">
            <p><span aria-hidden="true">📍</span> Vijayawada </p>
            <p><span aria-hidden="true">📞</span> <a href="tel:+1234567890" className="footer-contact-link">+91 9640179624 </a></p>
            <p><span aria-hidden="true">✉️</span> <a href="mailto:info@inclusivelearn.com" className="footer-contact-link">ambatijayacharan18@gmail.com</a></p>
          </address>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Connect With Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
              <span aria-hidden="true">📘</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
              <span aria-hidden="true">🐦</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <span aria-hidden="true">📷</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <span aria-hidden="true">💼</span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">&copy; {new Date().getFullYear()} Inclusive Learn. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/privacy" className="footer-bottom-link">Privacy Policy</Link>
          <Link to="/terms" className="footer-bottom-link">Terms of Service</Link>
          <Link to="/accessibility" className="footer-bottom-link">Accessibility Statement</Link>
        </div>
      </div>
    </footer>
  );
}