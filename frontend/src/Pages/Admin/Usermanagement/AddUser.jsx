import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddUser.css"; // ✅ Replaced StudentRegistration.css
import UserImg from "../../../Assets/StudentLogin.png";

export default function AddUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    role: "Student",
    contactNumber: "",
    qualifications: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/users/add", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

      const data = await response.json();

      if (response.ok) {
        alert("✅ User added successfully!");
        navigate("/admin/usermanagement");
      } else {
        alert(data.message || "❌ Failed to add user!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adduser-container">
      {/* Left Side - Illustration */}
      <div className="adduser-image-section">
        <img src={UserImg} alt="Add User" className="adduser-image" />
      </div>

      {/* Right Side - Add User Form */}
      <div className="form-section">
        <div className="adduser-card">
          <div className="card-header">
            <h1 className="card-title">Add New User</h1>
          </div>

          <form onSubmit={handleSubmit} className="adduser-form">
            <div className="input-group">
              <input
                type="text"
                placeholder="User ID"
                value={formData.id}
                onChange={(e) => handleInputChange("id", e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="input-group">
              <select
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="form-input"
                required
              >
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="input-group">
              <input
                type="tel"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                placeholder="Qualifications"
                value={formData.qualifications}
                onChange={(e) => handleInputChange("qualifications", e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="form-input"
                  required
                />
              </div>

            <button type="submit" className="adduser-button" disabled={loading}>
              {loading ? "Adding..." : "Add User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
