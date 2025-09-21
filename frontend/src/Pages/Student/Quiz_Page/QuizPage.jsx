import React from "react";
import "./QuizPage.css";
import javaImg from "../../../assets/1212121 1.png";


function QuizPage() {
  return (
    <div className="quiz-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="progress-circle">
          <div className="progress-text">40%</div>
        </div>
        <div className="question-list">
          {Array.from({ length: 10 }, (_, i) => (
            <button
              key={i}
              className={`question-btn ${i < 4 ? "answered" : ""}`}
            >
              Question {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <img
            src={javaImg}
            alt="Java"
            className="course-image"
          />
          <h2>Web Developer</h2>
        </div>

        {/* Question Box */}
        <div className="question-box">
          <h3>Question 5</h3>
          <p>What does HTML stand for?</p>

          <div className="options">
            <label>
              <input type="radio" name="q5" />
              HyperText Markup Language
            </label>
            <label>
              <input type="radio" name="q5" />
              Hypertext Management Library
            </label>
            <label>
              <input type="radio" name="q5" />
              High-Tech Modern Language
            </label>
            <label>
              <input type="radio" name="q5" />
              Home Tool Markup Language
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
