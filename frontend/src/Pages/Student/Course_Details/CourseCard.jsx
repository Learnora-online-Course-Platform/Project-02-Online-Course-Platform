import React from "react";
import "./CourseCard.css"; //
import javaImg from "../../../Assets/1212121 1.png";

function CourseCard() {
  return (
    <div className="card">
      {/* Header */}
      <div className="card-header">
        <img src={javaImg} alt="Java" className="card-image" />
        <div>
          <h2 className="title">Web Developer</h2>
          <button className="btn">Start Learn</button>
        </div>
      </div>

      {/* Content */}
      <div className="card-body">
        <div className="section">
          <h3>Course Content</h3>
          <p>
            Java provides different data types such as int, double, char,
            boolean, String, and arrays to store various kinds of values. To
            control the program flow, we use control statements like if-else,
            switch, and loops such as for, while, and do-while. Additionally,
            break and continue are used to manage loop execution.
          </p>
        </div>
        <div className="section">
          <h3>🎯 Learning Outcome</h3>
          <ol>
            <li>
              Identify and use Java data types (int, double, char, boolean,
              String, arrays) to store and process different kinds of values.
            </li>
            <li>
              Apply decision-making statements (if-else, switch) to control
              program logic.
            </li>
            <li>
              Implement loops (for, while, do-while) to repeat tasks
              efficiently.
            </li>
            <li>
              Use loop control keywords (break, continue) to manage the flow of
              iterations.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
