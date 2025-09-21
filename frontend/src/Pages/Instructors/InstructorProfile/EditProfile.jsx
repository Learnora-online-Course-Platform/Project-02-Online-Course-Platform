"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Upload, X, Camera } from "lucide-react"
import "./EditProfile.css"

const EditProfile = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "Peter De Silva",
    contact: "(+94) 0745621209",
    qualifications: "Bsc. In Computer Science, Msc. In Software Engineering",
  })

  const [errors, setErrors] = useState({
    name: "",
    contact: "",
    qualifications: "",
  })

  const [profileImage, setProfileImage] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.contact.trim()) {
      newErrors.contact = "Contact is required"
    }

    if (!formData.qualifications.trim()) {
      newErrors.qualifications = "Qualifications are required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type - only allow image formats
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
      if (!allowedTypes.includes(file.type)) {
        alert("Please select a valid image file (JPEG, PNG, GIF, or WebP)")
        return
      }

      // Validate file size (optional - limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage({
          file: file,
          preview: e.target.result,
          name: file.name,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setProfileImage(null)
    // Reset the file input
    const fileInput = document.getElementById("profile-image-input")
    if (fileInput) {
      fileInput.value = ""
    }
  }

  const handleSave = () => {
    if (!validateForm()) {
      return
    }

    if (profileImage) {
      localStorage.setItem("profileImage", profileImage.preview)
      console.log("Profile image saved:", profileImage.name)
    }

    // Handle save logic here
    console.log("Saving profile data:", formData)
    navigate("/instructor-profile")
  }

  const handleDiscardChanges = () => {
    // Reset form data to empty values
    setFormData({
      name: "",
      contact: "",
      qualifications: "",
    })

    // Clear any validation errors
    setErrors({
      name: "",
      contact: "",
      qualifications: "",
    })

    // Remove uploaded image
    setProfileImage(null)

    // Reset the file input
    const fileInput = document.getElementById("profile-image-input")
    if (fileInput) {
      fileInput.value = ""
    }

    console.log("All fields discarded")
  }

  const handleClose = () => {
    navigate("/instructor-profile")
  }

  return (
    <div className="edit-profile-overlay">
      <div className="edit-profile-modal">
        {/* Header */}
        <div className="edit-profile-header">
          <div className="logo">
            <div className="logo-icon">L</div>
            <span className="logo-text">LEARNORA</span>
            <span className="logo-subtitle">Skills for Life</span>
          </div>
          <button className="close-btn" onClick={handleClose}>
            <X className="icon" />
          </button>
        </div>

        {/* Content */}
        <div className="edit-profile-content">
          <h2 className="edit-profile-title">Edit Profile</h2>

          {/* Profile Image Upload */}
          <div className="profile-image-section">
            <label className="profile-image-label">Edit Profile Image</label>
            <div className="profile-image-upload">
              {profileImage ? (
                <div className="image-preview-container">
                  <img
                    src={profileImage.preview || "/placeholder.svg"}
                    alt="Profile preview"
                    className="profile-image-preview"
                  />
                  <div className="image-overlay">
                    <button
                      type="button"
                      className="change-image-btn"
                      onClick={() => document.getElementById("profile-image-input").click()}
                    >
                      <Camera className="camera-icon" />
                      Change Photo
                    </button>
                    <button type="button" className="remove-image-btn" onClick={removeImage}>
                      <X className="remove-icon" />
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="upload-placeholder"
                  onClick={() => document.getElementById("profile-image-input").click()}
                >
                  <Upload className="upload-icon" />
                  <div className="upload-text">
                    Upload Image
                    <br />
                    jpg, png, gif, webp
                  </div>
                </div>
              )}
              <input
                type="file"
                id="profile-image-input"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>
          </div>

          {/* Form Fields */}
          <form className="edit-profile-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`form-input ${errors.name ? "error" : ""}`}
                placeholder="Full Name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="contact" className="form-label">
                Contact *
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className={`form-input ${errors.contact ? "error" : ""}`}
                placeholder="Contact number"
              />
              {errors.contact && <span className="error-message">{errors.contact}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="qualifications" className="form-label">
                Qualifications *
              </label>
              <textarea
                id="qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleInputChange}
                className={`form-textarea ${errors.qualifications ? "error" : ""}`}
                placeholder="Educational qualifications"
                rows="4"
              />
              {errors.qualifications && <span className="error-message">{errors.qualifications}</span>}
            </div>
          </form>

          {/* Action Buttons */}
          <div className="form-actions">
            <button type="button" className="discard-btn" onClick={handleDiscardChanges}>
              Discard Changes
            </button>
            <button type="button" className="save-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
