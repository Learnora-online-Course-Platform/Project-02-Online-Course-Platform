import "./SDashboard.css";
import book from "../../../Assets/book.png";
import certificate from "../../../Assets/certificate.png";
import clock from "../../../Assets/cc.png";
import average from "../../../Assets/average.png";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dashboard-container">
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </button>
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul className="sidebar-menu">
          <li>Dashboard</li>
          <li>My Courses</li>
          <li>Assignments & Quizzes</li>
          <li>Evaluation</li>
          <li>Certificate & Progress</li>
          <li>Discussion Forum</li>
          <li>Payments</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h2>Welcome Back, Alex! 👋</h2>
          <p>Continue your learning journey and achieve your goals.</p>
        </header>

        {/* Stats Section */}
        <section className="stats">
          <div className="stat-card">
            <img src={book} className="icon" />
            <div className="stat-info">
              <p>Enrolled Courses</p>
              <h3>04</h3>
            </div>
          </div>
          <div className="stat-card">
            <img src={clock} className="icon" />
            <div className="stat-info">
              <p>Hours Learned</p>
              <h3>27</h3>
            </div>
          </div>
          <div className="stat-card">
            <img src={certificate} className="icon" />
            <div className="stat-info">
              <p>Certificates</p>
              <h3>03</h3>
            </div>
          </div>
          <div className="stat-card">
            <img src={average} className="icon" />
            <div className="stat-info">
              <p>Average Progress</p>
              <h3>50%</h3>
            </div>
          </div>
        </section>

        {/* Continue Learning */}
        <section className="learning-section">
          <h3>▶ Continue Learning</h3>
          <div className="course-card">
            <div className="course-header">
              <h3>React Development Masterclass</h3>
              <button className="continue-btn">Continue</button>
            </div>

            <div className="progress-row">
              <span>Progress</span>
              <span>75%</span>
            </div>

            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "75%" }}></div>
            </div>
          </div>

          <div className="course-card">
            <div className="course-header">
              <h3>UI/UX Design Fundamentals</h3>
              <button className="continue-btn">Continue</button>
            </div>

            <div className="progress-row">
              <span>Progress</span>
              <span>50%</span>
            </div>

            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "55%" }}></div>
            </div>
          </div>
        </section>

        {/* Study Streak */}
        <section className="streak-card">
          <h2>07</h2>
          <p>Day Study Streak</p>
          <span>Keep it up! You're doing great!</span>
        </section>
      </main>
    </div>
  );
}
