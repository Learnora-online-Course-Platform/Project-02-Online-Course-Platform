import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentRegistration.css";
import StudentLoginImg from "../../../Assets/StudentLogin.png";

export default function StudentRegistration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "student",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please verify your email before logging in.");
        console.log("Response:", data);
        navigate("/Login"); // redirect to login page after successful registration
      } else {
        alert(data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/Login");
  };

  return (
    <div className="registration-container">
      {/* Left Side - Image */}
      <div className="image-section">
        <div className="image-wrapper">
          <img
            src={StudentLoginImg}
            alt="Student with laptop and backpack"
            className="student-image"
          />
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="form-section">
        <div className="registration-card">
          <div className="card-header">
            <h1 className="card-title">Student Registration</h1>
          </div>

          <div className="card-content">
            <form onSubmit={handleSubmit} className="registration-form">
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

              <button type="submit" className="register-button" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <div className="login-section">
              <p className="login-text">
                Already have an account?{" "}
                <span onClick={handleLoginClick} className="login-link">
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
