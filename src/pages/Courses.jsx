import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Courses.css';
import Particles from '../components/Particles';

export default function Courses() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [fontSize, setFontSize] = useState(16);

  // Sample course data
  const courses = [
    {
      id: 1,
      title: "Introduction to Sign Language",
      description: "Learn basic sign language communication for the hearing impaired.",
      duration: "4 weeks",
      level: "Beginner",
      category: "hearing",
      accessibility: ["Closed Captions", "Sign Language Videos", "Visual Demonstrations"]
    },
    {
      id: 2,
      title: "Screen Reader Mastery",
      description: "Become proficient in using screen readers for digital navigation.",
      duration: "6 weeks",
      level: "Intermediate",
      category: "vision",
      accessibility: ["Screen Reader Optimized", "Audio Descriptions", "Keyboard Navigation"]
    },
    {
      id: 3,
      title: "Adaptive Computer Skills",
      description: "Develop computer skills using adaptive technologies for physical disabilities.",
      duration: "8 weeks",
      level: "Beginner",
      category: "mobility",
      accessibility: ["Voice Control", "Switch Access", "Customizable Interface"]
    },
    {
      id: 4,
      title: "Cognitive Skills Development",
      description: "Enhance cognitive abilities through structured learning activities.",
      duration: "10 weeks",
      level: "All Levels",
      category: "cognitive",
      accessibility: ["Simplified Content", "Step-by-Step Guidance", "Visual Aids"]
    },
    {
      id: 5,
      title: "Braille Literacy",
      description: "Master reading and writing in Braille for the visually impaired.",
      duration: "12 weeks",
      level: "Beginner",
      category: "vision",
      accessibility: ["Tactile Resources", "Audio Support", "Braille Display Compatible"]
    },
    {
      id: 6,
      title: "Assistive Technology Overview",
      description: "Comprehensive guide to modern assistive technologies for all disabilities.",
      duration: "5 weeks",
      level: "All Levels",
      category: "all",
      accessibility: ["Multi-Format Content", "Interactive Demos", "Customizable Learning Paths"]
    }
  ];

  // Filter courses by category
  const filteredCourses = activeFilter === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeFilter || course.category === 'all');

  // Handle font size changes
  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 2, 24);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 2, 14);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  return (
    <div className="courses-container" style={{ fontSize: `${fontSize}px` }}>
      <div className="particles-container" aria-hidden="true">
        <Particles variant="courses" />
      </div>
      {/* Accessibility Quick Tools */}
      <div className="accessibility-bar" aria-label="Accessibility tools">
        <button 
          onClick={increaseFontSize}
          aria-label="Increase text size"
          className="accessibility-tool"
        >
          <span aria-hidden="true">A+</span>
        </button>
        <button 
          onClick={decreaseFontSize}
          aria-label="Decrease text size"
          className="accessibility-tool"
        >
          <span aria-hidden="true">A-</span>
        </button>
        <button 
          onClick={() => document.body.classList.toggle('high-contrast')}
          aria-label="Toggle high contrast mode"
          className="accessibility-tool"
        >
          <span aria-hidden="true">◑</span> Contrast
        </button>
        <button 
          onClick={() => navigate('/accessibility')}
          aria-label="Learn more about accessibility features"
          className="accessibility-tool"
        >
          <span aria-hidden="true">♿</span> More Options
        </button>
      </div>

      {/* Page Header */}
      <header className="courses-header">
        <h1 id="main-heading">Inclusive Learning Courses</h1>
        <p className="subtitle">
          Specially designed courses tailored for individuals with different abilities
        </p>
      </header>

      {/* Category Filters */}
      <div className="category-filters" role="group" aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="visually-hidden">Filter courses by disability type</h2>
        <div className="filter-buttons">
          <button
            className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
            aria-pressed={activeFilter === 'all'}
          >
            All Courses
          </button>
          <button
            className={`filter-button ${activeFilter === 'vision' ? 'active' : ''}`}
            onClick={() => setActiveFilter('vision')}
            aria-pressed={activeFilter === 'vision'}
          >
            Visual Impairment
          </button>
          <button
            className={`filter-button ${activeFilter === 'hearing' ? 'active' : ''}`}
            onClick={() => setActiveFilter('hearing')}
            aria-pressed={activeFilter === 'hearing'}
          >
            Hearing Impairment
          </button>
          <button
            className={`filter-button ${activeFilter === 'mobility' ? 'active' : ''}`}
            onClick={() => setActiveFilter('mobility')}
            aria-pressed={activeFilter === 'mobility'}
          >
            Mobility Impairment
          </button>
          <button
            className={`filter-button ${activeFilter === 'cognitive' ? 'active' : ''}`}
            onClick={() => setActiveFilter('cognitive')}
            aria-pressed={activeFilter === 'cognitive'}
          >
            Cognitive Disabilities
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="courses-grid" role="region" aria-labelledby="courses-heading">
        <h2 id="courses-heading" className="visually-hidden">Available Courses</h2>
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <article key={course.id} className="course-card">
              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <div className="course-meta">
                  <span className="duration">⏱️ {course.duration}</span>
                  <span className="level">📊 {course.level}</span>
                </div>
                <div className="accessibility-features">
                  <h4 className="features-heading">Accessibility Features:</h4>
                  <ul className="features-list">
                    {course.accessibility.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <button 
                className="enroll-button"
                onClick={() => navigate(`/course/${course.id}`)}
                aria-label={`Enroll in ${course.title}`}
              >
                Learn More
              </button>
            </article>
          ))
        ) : (
          <p className="no-courses">No courses available for this category.</p>
        )}
      </div>

      {/* Additional Help Section */}
      <section className="help-section" aria-labelledby="help-heading">
        <h2 id="help-heading">Need Help Finding the Right Course?</h2>
        <p>
          Our education specialists can help you identify the best courses for your specific needs.
        </p>
        <button 
          className="contact-button"
          onClick={() => navigate('/contact')}
          aria-label="Contact our support team"
        >
          Contact Our Support Team
        </button>
      </section>
    </div>
  );
}