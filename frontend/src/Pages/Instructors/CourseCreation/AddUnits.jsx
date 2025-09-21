"use client"

// src/Pages/Instructors/CourseCreation/AddUnits.jsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Upload, X, FileText, Download, Plus, Video } from "lucide-react"
import "./AddUnit.css" // Import the new CSS file

export default function AddUnits() {
  const navigate = useNavigate()
  const [unitName, setUnitName] = useState("")
  const [materials, setMaterials] = useState([{ id: 1, name: "Course Syllabus", type: "PDF" }])
  const [videoTutorial, setVideoTutorial] = useState(null)
  const [unitNameError, setUnitNameError] = useState("")

  const handleClose = () => navigate(-1)

  const handleAddMaterial = () => {
    document.getElementById("material-upload").click()
  }

  const handleMaterialUpload = (event) => {
    const files = Array.from(event.target.files)
    if (files.length > 0) {
      const newMaterials = files.map((file, index) => ({
        id: materials.length + index + 1,
        name: file.name,
        type: file.type.split("/")[1]?.toUpperCase() || "FILE",
        file: file,
        size: file.size,
      }))
      setMaterials([...materials, ...newMaterials])
    }
    // Reset the input value to allow uploading the same file again
    event.target.value = ""
  }

  const handleRemoveMaterial = (id) => {
    const materialToRemove = materials.find((m) => m.id === id)
    const materialName = materialToRemove ? materialToRemove.name : "this material"

    const confirmed = window.confirm(`Are you sure you want to delete "${materialName}"?`)
    if (confirmed) {
      setMaterials(materials.filter((m) => m.id !== id))
    }
  }

  const handleDownloadMaterial = (material) => {
    if (material.file) {
      // Create a temporary URL for the file
      const url = URL.createObjectURL(material.file)

      // Create a temporary anchor element to trigger download
      const link = document.createElement("a")
      link.href = url
      link.download = material.name
      document.body.appendChild(link)
      link.click()

      // Clean up
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } else {
      // For existing materials without file objects, show a message
      alert(`Download functionality not available for ${material.name}`)
    }
  }

  const handleVideoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type - only allow video formats
      const allowedVideoTypes = [
        "video/mp4",
        "video/avi",
        "video/mov",
        "video/wmv",
        "video/flv",
        "video/webm",
        "video/mkv",
      ]

      if (allowedVideoTypes.includes(file.type)) {
        const videoUrl = URL.createObjectURL(file)
        setVideoTutorial({
          file: file,
          url: videoUrl,
          name: file.name,
        })
      } else {
        alert("Please select a valid video file (MP4, AVI, MOV, WMV, FLV, WebM, MKV)")
      }
    }
  }

  const handleRemoveVideo = () => {
    if (videoTutorial?.url) {
      URL.revokeObjectURL(videoTutorial.url)
    }
    setVideoTutorial(null)
  }

  const handleOK = () => {
    if (!unitName.trim()) {
      setUnitNameError("Unit name is required")
      return
    }

    const newUnit = {
      id: Date.now(),
      title: unitName.trim(),
      materials: materials,
      videoTutorial: videoTutorial,
      createdAt: new Date().toISOString(),
    }

    const existingUnits = JSON.parse(localStorage.getItem("courseUnits") || "[]")
    const updatedUnits = [...existingUnits, newUnit]
    localStorage.setItem("courseUnits", JSON.stringify(updatedUnits))

    console.log("Unit created:", newUnit)
    navigate(-1)
  }

  const handleUnitNameChange = (e) => {
    setUnitName(e.target.value)
    if (unitNameError) {
      setUnitNameError("")
    }
  }

  return (
    <div className="overlay">
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <div className="logo">
            <div className="logo-icon">L</div>
            <span className="logo-title">LEARNORA</span>
            <span className="logo-subtitle">Skills for Life</span>
          </div>
          <button onClick={handleClose} className="close-btn">
            <X className="icon" />
          </button>
        </div>

        {/* Content */}
        <div className="modal-content">
          <h2>Add Units</h2>

          {/* Unit Name */}
          <div className="form-group">
            <label>Unit Name *</label>
            <input
              type="text"
              placeholder="Course unit name"
              value={unitName}
              onChange={handleUnitNameChange}
              className={unitNameError ? "error" : ""}
            />
            {unitNameError && <span className="error-message">{unitNameError}</span>}
          </div>

          {/* Video Tutorial */}
          <div className="form-group">
            <label>Video Tutorial</label>
            {!videoTutorial ? (
              <div className="upload-area" onClick={() => document.getElementById("video-upload").click()}>
                <Upload className="upload-icon" />
                <p>Upload video tutorial</p>
                <p>MP4, AVI, MOV, WMV, etc.</p>
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  style={{ display: "none" }}
                />
              </div>
            ) : (
              <div className="video-preview">
                <div className="video-info">
                  <Video className="video-icon" />
                  <div className="video-details">
                    <p className="video-name">{videoTutorial.name}</p>
                    <p className="video-size">{(videoTutorial.file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                </div>
                <div className="video-actions">
                  <button onClick={handleRemoveVideo} className="remove-video-btn">
                    <X className="icon-small" />
                  </button>
                  <button onClick={() => document.getElementById("video-upload").click()} className="change-video-btn">
                    Change
                  </button>
                </div>
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  style={{ display: "none" }}
                />
              </div>
            )}
          </div>

          {/* Course Materials */}
          <div className="form-group">
            <label>Course Materials</label>
            <div className="materials-container">
              <div className="materials-list">
                {materials.map((material) => (
                  <div key={material.id} className="material-item">
                    <div className="material-info">
                      <FileText className="material-icon" />
                      <div>
                        <p>{material.name}</p>
                        <div className="material-details">
                          <p className="material-type">{material.type}</p>
                          {material.size && (
                            <p className="material-size">{(material.size / (1024 * 1024)).toFixed(2)} MB</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="material-actions">
                      <button onClick={() => handleRemoveMaterial(material.id)}>
                        <X className="icon-small" />
                      </button>
                      <button onClick={() => handleDownloadMaterial(material)}>
                        <Download className="icon-small" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <input
                id="material-upload"
                type="file"
                multiple
                onChange={handleMaterialUpload}
                style={{ display: "none" }}
              />
              <button className="add-btn" onClick={handleAddMaterial}>
                <Plus className="icon-small" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="ok-btn" onClick={handleOK}>
            OK
          </button>
        </div>
      </div>
    </div>
  )
}
