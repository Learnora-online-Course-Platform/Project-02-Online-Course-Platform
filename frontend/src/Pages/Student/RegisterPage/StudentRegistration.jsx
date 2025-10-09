import { useState } from 'react';
import './StudentRegistration.css';
import StudentLogin from '../../../Assets/StudentLogin.png';

export default function StudentRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data:', formData);
    // Handle registration logic here
  };

  const handleLoginClick = () => {
    console.log('Navigate to login page');
    // Handle navigation to login page
  };

  return (
    <div className="registration-container">
      {/* Left Side - Student Image */}
      <div className="image-section">
        <div className="image-wrapper">
          <img 
            src={StudentLogin} 
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
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="input-group">
                <input
                  type="tel"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="register-button"
              >
                Register
              </button>
            </form>
            
            <div className="login-section">
              <p className="login-text">
                Already have an account?{' '}
                <span
                  onClick={handleLoginClick}
                  className="login-link"
                >
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