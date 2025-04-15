import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Courses.css';
import '../CourseDetail.css';
import Particles from '../components/Particles';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState(16);

  // Sample course data with playlist URLs
  const coursesData = [
    {
      id: 1,
      title: "Introduction to Sign Language",
      description: "Learn basic sign language communication for the hearing impaired.",
      duration: "4 weeks",
      level: "Beginner",
      category: "hearing",
      accessibility: ["Closed Captions", "Sign Language Videos", "Visual Demonstrations"],
      playlistUrl: "https://www.youtube.com/playlist?list=PLM1USAFj0YQtqLe8I4aQjOGT_PnWGUYBC",
      fullDescription: "This comprehensive course introduces you to the fundamentals of sign language, designed specifically for beginners who want to communicate with the hearing impaired. Through visual demonstrations and interactive lessons, you'll learn essential signs, finger spelling, and basic conversational skills. The course includes practice exercises and real-world scenarios to build your confidence."
    },
    {
      id: 2,
      title: "Screen Reader Mastery",
      description: "Become proficient in using screen readers for digital navigation.",
      duration: "6 weeks",
      level: "Intermediate",
      category: "vision",
      accessibility: ["Screen Reader Optimized", "Audio Descriptions", "Keyboard Navigation"],
      playlistUrl: "https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g",
      fullDescription: "This intermediate-level course teaches you how to effectively use screen readers to navigate digital interfaces. You'll learn advanced keyboard shortcuts, customization options, and troubleshooting techniques for popular screen readers like JAWS, NVDA, and VoiceOver. By the end of this course, you'll be able to efficiently navigate websites, applications, and documents using screen reader technology."
    },
    {
      id: 3,
      title: "Adaptive Computer Skills",
      description: "Develop computer skills using adaptive technologies for physical disabilities.",
      duration: "8 weeks",
      level: "Beginner",
      category: "mobility",
      accessibility: ["Voice Control", "Switch Access", "Customizable Interface"],
      playlistUrl: "https://www.youtube.com/playlist?list=PLOGi5-fAu8bFEU_ZgEiRZ6BiACZHQPw7w",
      fullDescription: "This course focuses on adaptive technologies that make computing accessible for individuals with mobility impairments. You'll explore voice recognition software, switch access devices, eye tracking technology, and other alternative input methods. The curriculum includes hands-on practice with various adaptive tools and strategies for customizing your computing environment to suit your specific needs."
    },
    {
      id: 4,
      title: "Cognitive Skills Development",
      description: "Enhance cognitive abilities through structured learning activities.",
      duration: "10 weeks",
      level: "All Levels",
      category: "cognitive",
      accessibility: ["Simplified Content", "Step-by-Step Guidance", "Visual Aids"],
      playlistUrl: "https://www.youtube.com/playlist?list=PLp8BSCLLWBUDaVgVzAotCQON1xCfVhJ1I",
      fullDescription: "This inclusive course offers structured activities designed to enhance cognitive abilities including memory, attention, problem-solving, and executive function. Using evidence-based techniques and adaptive learning approaches, the course provides personalized exercises that gradually increase in complexity as your skills improve. Visual aids and clear, step-by-step instructions make this course accessible to learners of all cognitive abilities."
    },
    {
      id: 5,
      title: "Braille Literacy",
      description: "Master reading and writing in Braille for the visually impaired.",
      duration: "12 weeks",
      level: "Beginner",
      category: "vision",
      accessibility: ["Tactile Resources", "Audio Support", "Braille Display Compatible"],
      playlistUrl: "https://www.youtube.com/playlist?list=PL6TJPKvqYYXFUXx-TriN0wLMxjCLq1d0c",
      fullDescription: "This foundational course teaches Braille literacy from the ground up. Starting with the basics of the Braille cell and alphabet, you'll progress to reading and writing words, sentences, and eventually full texts. The course covers both literary and mathematical Braille, along with techniques for using Braille displays and note-taking devices. Audio guidance accompanies all lessons, making this course fully accessible to visually impaired learners."
    },
    {
      id: 6,
      title: "Assistive Technology Overview",
      description: "Comprehensive guide to modern assistive technologies for all disabilities.",
      duration: "5 weeks",
      level: "All Levels",
      category: "all",
      accessibility: ["Multi-Format Content", "Interactive Demos", "Customizable Learning Paths"],
      playlistUrl: "https://www.youtube.com/playlist?list=PLvrp9iOILTQatwnqm61jqFrsfUB4RKh6J",
      fullDescription: "This survey course provides a comprehensive overview of modern assistive technologies across all disability categories. You'll explore tools for visual, hearing, mobility, cognitive, and communication impairments, learning how these technologies work and how to select the right solutions for specific needs. The course includes virtual demonstrations, case studies, and guidance on funding and acquiring assistive technology."
    }
  ];

  useEffect(() => {
    // Find the course by ID
    const courseId = parseInt(id);
    const foundCourse = coursesData.find(c => c.id === courseId);
    
    if (foundCourse) {
      setCourse(foundCourse);
    }
    setLoading(false);
  }, [id]);

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

  // Handle opening the playlist URL
  const openPlaylist = () => {
    if (course && course.playlistUrl) {
      window.open(course.playlistUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return <div className="loading">Loading course details...</div>;
  }

  if (!course) {
    return (
      <div className="course-not-found">
        <h2>Course Not Found</h2>
        <p>Sorry, the course you're looking for doesn't exist.</p>
        <button 
          className="back-button"
          onClick={() => navigate('/courses')}
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="course-detail-container" style={{ fontSize: `${fontSize}px` }}>
      <div className="particles-container" aria-hidden="true">
        <Particles variant="courseDetail" />
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

      {/* Course Header */}
      <header className="course-detail-header">
        <button 
          className="back-button"
          onClick={() => navigate('/courses')}
          aria-label="Back to courses list"
        >
          ← Back to Courses
        </button>
        <h1 id="course-heading">{course.title}</h1>
        <div className="course-meta">
          <span className="duration">⏱️ {course.duration}</span>
          <span className="level">📊 {course.level}</span>
          <span className="category">🏷️ {course.category.charAt(0).toUpperCase() + course.category.slice(1)}</span>
        </div>
      </header>

      {/* Course Content */}
      <div className="course-detail-content">
        <section className="course-description">
          <h2>About This Course</h2>
          <p>{course.fullDescription}</p>
        </section>

        <section className="accessibility-features">
          <h2>Accessibility Features</h2>
          <ul className="features-list">
            {course.accessibility.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>

        <section className="course-actions">
          <h2>Ready to Start Learning?</h2>
          <p>Access our online video playlist to begin your learning journey.</p>
          <button 
            className="playlist-button"
            onClick={openPlaylist}
            aria-label={`Open online playlist for ${course.title}`}
          >
            Open Online Playlist
          </button>
        </section>
      </div>

      {/* Additional Help Section */}
      <section className="help-section" aria-labelledby="help-heading">
        <h2 id="help-heading">Need Help With This Course?</h2>
        <p>
          Our education specialists can provide additional support and resources.
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