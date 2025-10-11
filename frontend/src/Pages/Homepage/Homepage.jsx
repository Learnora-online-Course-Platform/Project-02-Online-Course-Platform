"use client";

import { useState } from "react";
import "./Homepage.css";
import logo from "../../Assets/logo 1.png";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // ✅ navigation hook

  const featuredCourses = [
    {
      id: 1,
      title: "Advanced Web Development",
      image: "/web-development-coding.png",
      price: "$99.99",
      rating: 4.5,
      reviews: 1249,
      instructor: "John Smith",
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      image: "/data-science-analytics.jpg",
      price: "$79.99",
      rating: 4.7,
      reviews: 892,
      instructor: "Sarah Johnson",
    },
    {
      id: 3,
      title: "Introduction to UI Design",
      image: "/ui-design-interface.jpg",
      price: "$59.99",
      rating: 4.6,
      reviews: 1456,
      instructor: "Mike Chen",
    },
  ];

  const categories = [
    {
      name: "Java",
      image: "/java-programming-concept.png",
      courses: "120+ courses",
    },
    {
      name: "Web",
      image: "/web-development-concept.png",
      courses: "200+ courses",
    },
    {
      name: "Mobile",
      image: "/mobile-app-development.png",
      courses: "85+ courses",
    },
  ];

  const features = [
    {
      icon: "🏆",
      title: "Certificate of Completion",
      description: "Get recognized certificates",
    },
    {
      icon: "👨‍🏫",
      title: "Expert Instructors",
      description: "Learn from industry professionals",
    },
    {
      icon: "⏰",
      title: "Learn at Your Own Pace",
      description: "Access courses anytime with lifetime accessibility",
    },
    {
      icon: "📝",
      title: "Interactive Assignments",
      description: "Reinforce your learning with practical exercises",
    },
  ];

  const testimonials = [
    {
      name: "Michael Johnson",
      text: "The courses are extremely well-designed and I would highly recommend to building your skills as a web developer. It was a beautiful experience.",
      avatar: "/professional-headshot.png",
    },
    {
      name: "Sophia Davis",
      text: "The courses are impressive! I learned many I never from beginner to building complex web applications.",
      avatar: "/professional-woman-headshot.png",
    },
    {
      name: "David Rodriguez",
      text: "I've had excellent career learning platforms. The content was top-notch and the instructors were knowledgeable.",
      avatar: "/professional-man-headshot.png",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star filled">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">
          ★
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="homepage">
      <header className="header">
        <div className="header-container">
          <div className="header-logo">
            <img src={logo} alt="Learnora Logo" className="logo-img" />
          </div>
          <nav className="header-nav">
            <a href="#home" className="nav-link active">
              Home
            </a>
            <a href="#courses" className="nav-link">
              Courses
            </a>
            <a href="#resources" className="nav-link">
              Resources
            </a>
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </nav>

          {/* ✅ Navigation Buttons */}
          <div className="header-auth">
            <button
              className="login-btn"
              onClick={() => navigate("/Login")}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/StudentRegistration")}
              className="signup-btn"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Learn from Experts, Anytime, Anywhere
          </h1>
          <p className="hero-subtitle">
            Discover thousands of courses in various subjects and advance your
            career with our professional learning platform.
          </p>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for courses"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses">
        <div className="container">
          <h2 className="section-title">Featured Courses</h2>
          <div className="courses-grid">
            {featuredCourses.map((course) => (
              <div key={course.id} className="course-card">
                <img src={course.image || "/placeholder.svg"} alt={course.title} className="course-image" />
                <div className="course-content">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-instructor">by {course.instructor}</p>
                  <div className="course-rating">
                    <div className="stars">{renderStars(course.rating)}</div>
                    <span className="rating-text">
                      {course.rating} ({course.reviews} reviews)
                    </span>
                  </div>
                  <div className="course-price">{course.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="categories">
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-card">
                <img src={category.image || "/placeholder.svg"} alt={category.name} className="category-image" />
                <div className="category-content">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-courses">{category.courses}</p>
                  <button className="category-btn">View More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose LearnHub */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose LearnHub?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Students Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="author-avatar"
                  />
                  <span className="author-name">{testimonial.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Learnora</h4>
              <p>Learn from the best instructors and advance your career</p>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#careers">Careers</a>
                </li>
                <li>
                  <a href="#press">Press</a>
                </li>
                <li>
                  <a href="#news">News</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li>
                  <a href="#help">Help Center</a>
                </li>
                <li>
                  <a href="#contact">Contact Us</a>
                </li>
                <li>
                  <a href="#privacy">Privacy & Policy</a>
                </li>
                <li>
                  <a href="#terms">Terms</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Browse</h4>
              <ul>
                <li>
                  <a href="#courses">All Courses</a>
                </li>
                <li>
                  <a href="#categories">Categories</a>
                </li>
                <li>
                  <a href="#instructors">Instructors</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 LearnOra. All rights reserved.</p>
            <div className="social-links">
              <a href="#facebook" className="social-link">
                📘
              </a>
              <a href="#twitter" className="social-link">
                🐦
              </a>
              <a href="#linkedin" className="social-link">
                💼
              </a>
              <a href="#instagram" className="social-link">
                📷
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Homepage
