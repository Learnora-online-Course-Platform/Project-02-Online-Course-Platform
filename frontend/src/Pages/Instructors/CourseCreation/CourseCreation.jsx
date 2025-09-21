"use client"

// src/Pages/Instructors/CourseCreation/CourseCreation.jsx
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Upload, Plus, Camera, Edit, Trash2, FileText, Video } from "lucide-react"
import "./CourseCreation.css" // Import the traditional CSS file

export default function CourseCreation() {
  const navigate = useNavigate()
  const [courseTitle, setCourseTitle] = useState("")
  const [courseDescription, setCourseDescription] = useState("")
  const [courseCategory, setCourseCategory] = useState("")
  const [courseThumbnail, setCourseThumbnail] = useState("")
  const [errors, setErrors] = useState({})
  const [units, setUnits] = useState([
    { id: 1, title: "Introduction to Python" },
    { id: 2, title: "Setting up your environment" },
  ])

  useEffect(() => {
    const savedUnits = JSON.parse(localStorage.getItem("courseUnits") || "[]")
    if (savedUnits.length > 0) {
      setUnits((prevUnits) => [...prevUnits, ...savedUnits])
      // Clear localStorage after loading
      localStorage.removeItem("courseUnits")
    }
  }, [])

  const handleAddUnits = () => navigate("/add-units")

  const handleDeleteUnit = (id) => setUnits(units.filter((unit) => unit.id !== id))

  const handleThumbnailUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type - only allow image formats
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
      if (!allowedTypes.includes(file.type)) {
        alert("Please select a valid image file (JPEG, PNG, GIF, or WebP)")
        return
      }

      // Validate file size (optional - limit to 5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB in bytes
      if (file.size > maxSize) {
        alert("File size must be less than 5MB")
        return
      }

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setCourseThumbnail(e.target.result)
        setErrors((prev) => ({ ...prev, courseThumbnail: "" }))
      }
      reader.readAsDataURL(file)
    }
  }

  const validateFields = () => {
    const newErrors = {}

    if (!courseTitle.trim()) {
      newErrors.courseTitle = "Course Title is required"
    }

    if (!courseDescription.trim()) {
      newErrors.courseDescription = "Course Description is required"
    }

    if (!courseCategory) {
      newErrors.courseCategory = "Course Category is required"
    }

    if (!courseThumbnail) {
      newErrors.courseThumbnail = "Course Thumbnail is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCreateCourse = () => {
    if (!validateFields()) {
      return
    }

    console.log("Creating course:", {
      title: courseTitle,
      description: courseDescription,
      category: courseCategory,
      thumbnail: courseThumbnail,
      units,
    })
  }

  const handleInputChange = (field, value) => {
    if (field === "courseTitle") setCourseTitle(value)
    if (field === "courseDescription") setCourseDescription(value)
    if (field === "courseCategory") setCourseCategory(value)

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
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
          <div className="course-creation-content">
            <h1 className="course-creation-title">Course Creation</h1>

            <div className="grid">
              {/* Left Column */}
              <div className="left-column">
                {/* Course Title */}
                <div className="form-group">
                  <label>Course Title *</label>
                  <input
                    type="text"
                    placeholder="Name of the course"
                    value={courseTitle}
                    onChange={(e) => handleInputChange("courseTitle", e.target.value)}
                    className={errors.courseTitle ? "error" : ""}
                  />
                  {errors.courseTitle && <span className="error-message">{errors.courseTitle}</span>}
                </div>

                {/* Course Description */}
                <div className="form-group">
                  <label>Course Description *</label>
                  <textarea
                    placeholder="Description"
                    value={courseDescription}
                    onChange={(e) => handleInputChange("courseDescription", e.target.value)}
                    className={errors.courseDescription ? "error" : ""}
                  />
                  {errors.courseDescription && <span className="error-message">{errors.courseDescription}</span>}
                </div>

                {/* Course Category */}
                <div className="form-group">
                  <label>Course Category *</label>
                  <select
                    value={courseCategory}
                    onChange={(e) => handleInputChange("courseCategory", e.target.value)}
                    className={errors.courseCategory ? "error" : ""}
                  >
                    <option value="">Select category</option>
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                    <option value="marketing">Marketing</option>
                  </select>
                  {errors.courseCategory && <span className="error-message">{errors.courseCategory}</span>}
                </div>

                {/* Units */}
                <div className="form-group">
                  <label>Content</label>
                  <div className="units-list">
                    {units.map((unit) => (
                      <div key={unit.id} className="unit-item">
                        <div className="unit-info">
                          <span className="unit-title">{unit.title}</span>
                          {unit.materials && (
                            <div className="unit-details">
                              <span className="unit-detail">
                                <FileText className="detail-icon" />
                                {unit.materials.length} materials
                              </span>
                              {unit.videoTutorial && (
                                <span className="unit-detail">
                                  <Video className="detail-icon" />
                                  Video tutorial
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="unit-actions">
                          <button className="edit-btn">
                            <Edit className="icon-small" />
                            Edit
                          </button>
                          <button className="delete-btn" onClick={() => handleDeleteUnit(unit.id)}>
                            <Trash2 className="icon-small" />
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="add-unit-btn" onClick={handleAddUnits}>
                    <Plus className="icon-small" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Right Column */}
              <div className="right-column">
                <div className="form-group">
                  <label>Course Thumbnail *</label>
                  <div className="thumbnail-upload-wrapper">
                    <input
                      type="file"
                      id="thumbnail-upload"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      style={{ display: "none" }}
                    />

                    {courseThumbnail ? (
                      <div
                        className="thumbnail-preview"
                        onClick={() => document.getElementById("thumbnail-upload").click()}
                      >
                        <img
                          src={courseThumbnail || "/placeholder.svg"}
                          alt="Course Thumbnail"
                          className="thumbnail-image"
                        />
                        <div className="thumbnail-overlay">
                          <Camera className="camera-icon" />
                          <span>Change Thumbnail</span>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`thumbnail-upload ${errors.courseThumbnail ? "error" : ""}`}
                        onClick={() => document.getElementById("thumbnail-upload").click()}
                      >
                        <Upload className="upload-icon" />
                        <p>Upload course thumbnail</p>
                        <p>jpg, png, gif, webp</p>
                      </div>
                    )}
                    {errors.courseThumbnail && <span className="error-message">{errors.courseThumbnail}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Create Button */}
            <div className="create-btn-container">
              <button className="create-btn" onClick={handleCreateCourse}>
                Create
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
