import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaAccessibleIcon, FaSignLanguage } from 'react-icons/fa';
import { MdAccessibility } from 'react-icons/md';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    contactMethod: 'email',
    accessibilityNeeds: []
  });

  const accessibilityOptions = [
    { id: 'screen-reader', label: 'Screen Reader User' },
    { id: 'sign-language', label: 'Require Sign Language Interpreter' },
    { id: 'text-only', label: 'Prefer Text Communication' },
    { id: 'other', label: 'Other Accessibility Needs' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        accessibilityNeeds: checked
          ? [...prev.accessibilityNeeds, value]
          : prev.accessibilityNeeds.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert(`Thank you for your message, ${formData.name}! We'll contact you via ${formData.contactMethod}.`);
    setFormData({
      name: '',
      email: '',
      message: '',
      contactMethod: 'email',
      accessibilityNeeds: []
    });
  };

  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1>Contact Our Accessibility Team</h1>
        <p className="subtitle">We're here to help and accommodate all your needs</p>
      </header>

      <div className="contact-content">
        {/* Contact Information */}
        <section className="contact-methods">
          <div className="contact-card">
            <div className="contact-icon">
              <FaPhone size={24} />
            </div>
            <h3>Phone Support</h3>
            <p>Available Monday-Friday, 9am-5pm EST</p>
            <a href="tel:+18005551234" className="contact-link">+91 9640179624</a>
            <p className="access-note"><FaAccessibleIcon /> TTY service available</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <FaEnvelope size={24} />
            </div>
            <h3>Email Us</h3>
            <p>Response within 24 hours</p>
            <a href="mailto:accessibility@example.com" className="contact-link">charan18@gmail.com</a>
            <p className="access-note"><FaAccessibleIcon /> Screen reader optimized</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <FaMapMarkerAlt size={24} />
            </div>
            <h3>Visit Us</h3>
            <p>Vijayawada</p>
            <p>AP</p>
            <p>INDIA</p>
            <p className="access-note"><FaAccessibleIcon /> Wheelchair accessible</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <FaSignLanguage size={24} />
            </div>
            <h3>ASL Interpretation</h3>
            <p>Schedule a video call with an interpreter</p>
            <a href="/asl-scheduling" className="contact-link">Schedule ASL Call</a>
            <p className="access-note"><MdAccessibility /> Available in multiple sign languages</p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="contact-form-section">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                aria-required="true"
              ></textarea>
            </div>

            <div className="form-group">
              <label>Preferred Contact Method</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="contactMethod"
                    value="email"
                    checked={formData.contactMethod === 'email'}
                    onChange={handleChange}
                  />
                  Email
                </label>
                <label>
                  <input
                    type="radio"
                    name="contactMethod"
                    value="phone"
                    checked={formData.contactMethod === 'phone'}
                    onChange={handleChange}
                  />
                  Phone Call
                </label>
                <label>
                  <input
                    type="radio"
                    name="contactMethod"
                    value="video"
                    checked={formData.contactMethod === 'video'}
                    onChange={handleChange}
                  />
                  Video Call
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Accessibility Needs (Select all that apply)</label>
              <div className="checkbox-group">
                {accessibilityOptions.map(option => (
                  <label key={option.id}>
                    <input
                      type="checkbox"
                      name="accessibilityNeeds"
                      value={option.id}
                      checked={formData.accessibilityNeeds.includes(option.id)}
                      onChange={handleChange}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </section>

        {/* Accessibility Commitment */}
        <section className="commitment-section">
          <h2>Our Accessibility Commitment</h2>
          <div className="commitment-grid">
            <div className="commitment-item">
              <div className="commitment-icon"><MdAccessibility size={32} /></div>
              <h3>Inclusive Communication</h3>
              <p>We provide multiple contact methods to suit different needs and preferences.</p>
            </div>
            <div className="commitment-item">
              <div className="commitment-icon"><FaAccessibleIcon size={32} /></div>
              <h3>Quick Response</h3>
              <p>Accessibility-related inquiries receive priority response within 24 hours.</p>
            </div>
            <div className="commitment-item">
              <div className="commitment-icon"><FaSignLanguage size={32} /></div>
              <h3>ASL Interpretation</h3>
              <p>Free sign language interpretation available for all scheduled meetings.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}