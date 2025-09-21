import React, { useState } from "react";
import "../RegisterPage/RegisterPage.css";
import logo from "../../../Assets/Logo.png";
import illustration from "../../../Assets/Ilustration.png";

function RegisterPage() {
  const [role, setRole] = useState("");

  return (
    <div className="register-container">
      {/* Left section */}
      <div className="register-left">
        <img src={logo} alt="Learnora Logo" className="logo" />
        <h3 className="tagline">Skills for Life</h3>
        <img src={illustration} alt="Illustration" className="illustration" />
      </div>

      {/* Right section */}
      <div className="register-right">
        <div className="register-card">
          <h2 className="title">Register</h2>

          <label className="radio-option">
            <span>Student</span>
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === "student"}
              onChange={(e) => setRole(e.target.value)}
            />
          </label>

          <label className="radio-option">
            <span>Instructor</span>
            <input
              type="radio"
              name="role"
              value="instructor"
              checked={role === "instructor"}
              onChange={(e) => setRole(e.target.value)}
            />
          </label>

          <button className="register-btn">Register</button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
