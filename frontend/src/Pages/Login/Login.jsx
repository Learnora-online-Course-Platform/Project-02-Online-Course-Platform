import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Student/RegisterPage/StudentRegistration.css"; // Reuse same CSS
import StudentLoginImg from "../../Assets/StudentLogin.png";

export default function StudentLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        console.log("Token:", data.token);

        // Save token locally for authenticated requests
        localStorage.setItem("token", data.token);

        // Redirect to student dashboard
        navigate("/SDashboard");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate("/StudentRegistration");
  };

  return (
    <div className="registration-container">
      {/* Left Side - Image */}
      <div className="image-section">
        <div className="image-wrapper">
          <img
            src={StudentLoginImg}
            alt="Student login illustration"
            className="student-image"
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="form-section">
        <div className="registration-card">
          <div className="card-header">
            <h1 className="card-title">Login</h1>
          </div>
          <div className="card-content">
            <form onSubmit={handleSubmit} className="registration-form">
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
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <button type="submit" className="register-button" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="login-section">
              <p className="login-text">
                Don’t have an account?{" "}
                <span onClick={handleRegisterClick} className="login-link">
                  Register
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
