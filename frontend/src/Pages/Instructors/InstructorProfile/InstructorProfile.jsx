"use client"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import "./InstructorProfile.css"

const InstructorProfile = () => {
  const navigate = useNavigate()

  const [profileImageUrl, setProfileImageUrl] = useState("") // Empty string to simulate no image
  const hasImage = profileImageUrl && profileImageUrl.trim() !== ""

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage")
    if (savedImage) {
      setProfileImageUrl(savedImage)
    }
  }, [])

  const handleEditProfile = () => {
    navigate("/edit-profile")
  }

  return (
    <div className="instructor-profile">
      {/* Header */}
      <header className="profile-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-text">LEARNORA</span>
            <span className="logo-subtitle">Skills for Life</span>
          </div>
          <nav className="nav-menu">
            <a href="#" className="nav-link">
              Dashboard
            </a>
            <a href="#" className="nav-link">
              Courses
            </a>
            <a href="#" className="nav-link">
              Settings
            </a>
          </nav>
          <div className="header-icons">
            <div className="icon-button">💬</div>
            <div className="icon-button">🔔</div>
            <div className="profile-avatar-small"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="profile-main">
        <div className="profile-card">
          <div className="profile-content">
            <div className="profile-top">
              <div className="profile-image-container">
                {hasImage ? (
                  <img src={profileImageUrl || "/placeholder.svg"} alt="Peter De Silva" className="profile-image" />
                ) : (
                  <div className="profile-image-placeholder">
                    <div className="placeholder-icon">📷</div>
                    <div className="placeholder-text">No Photo</div>
                  </div>
                )}
              </div>
              <div className="profile-header-info">
                <h1 className="instructor-name">Peter De Silva</h1>
                <p className="instructor-title">Instructor</p>
              </div>
              <button className="edit-profile-btn" onClick={handleEditProfile}>
                ✏️ Edit Profile
              </button>
            </div>

            <div className="profile-bottom">
              <div className="profile-left">
                <div className="contact-info">
                  <div className="info-item">
                    <div className="info-icon">✉️</div>
                    <div className="info-content">
                      <div className="info-label">Email</div>
                      <div className="info-value">petersilvaic12@gmail.com</div>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">📞</div>
                    <div className="info-content">
                      <div className="info-label">Contact</div>
                      <div className="info-value">(+94) 0745621209</div>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">🎓</div>
                    <div className="info-content">
                      <div className="info-label">Qualifications</div>
                      <div className="info-value">
                        Bsc. In Computer Science,
                        <br />
                        Msc. In Software Engineering
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-right">
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-icon">📚</div>
                    <div className="stat-content">
                      <div className="stat-label">Courses</div>
                      <div className="stat-value">2</div>
                    </div>
                  </div>

                  <div className="stat-item">
                    <div className="stat-icon">📅</div>
                    <div className="stat-content">
                      <div className="stat-label">Teach Since</div>
                      <div className="stat-value">2024</div>
                    </div>
                  </div>
                </div>

                <div className="course-works">
                  <div className="course-works-header">
                    <div className="course-works-icon">💼</div>
                    <div className="course-works-label">Course Works</div>
                  </div>
                  <div className="course-list">
                    <a href="#" className="course-link">
                      Python for Data Science
                    </a>
                    <a href="#" className="course-link">
                      React for Beginners
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default InstructorProfile
