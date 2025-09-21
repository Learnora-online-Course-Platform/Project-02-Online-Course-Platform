import { useState } from "react";
import { Search, PlusCircle } from "lucide-react";
// import img1 from './img/logo.png';
// import img2 from './img/image 13.png';
// import img3 from './img/image 11.png';
// import img4 from './img/image 10.png';



function App() {
  const [courses] = useState([
    {
      title: "Introduction to UI/UX Design",
      instructor: "Amaya Perera",
      category: "Design",
      status: "Active",
      date: "August 10,2025",
    },
    {
      title: "React for Beginners",
      instructor: "Kasun Jayakodi",
      category: "Tech",
      status: "Draft",
      date: "August 2,2025",
    },
    {
      title: "Business Strategy",
      instructor: "Nawodya Wijesinghe",
      category: "Business",
      status: "Active",
      date: "August 20,2025",
    },
    {
      title: "Python for Data Science",
      instructor: "Malsha Perera",
      category: "Tech",
      status: "Archived",
      date: "July 15,2025",
    },
  ]);

  return (
    <div className="app">
      {/* Navbar */}
      <header className="navbar">
       <img src={img1}alt="Learnora Logo" className="logo-img" />

        <nav>
          <a href="#">Dashboard</a>
          <a href="#">Courses</a>
          <a href="#">Settings</a>
        </nav>
        <div className="icons">
          <img src={img2}alt="Learnora msg" className="msg-img" />
          <img src={img3}alt="Learnora note" className="note-img" />
          <img src={img4}alt="Learnora user" className="user-img" />
          
        </div>
      </header>

     
      <div className="main-container">
        
        <aside className="sidebar">
          <div className="stat-card">
            <p>Total Courses</p>
            <p>24</p>
          </div>
          <div className="stat-card">
            <p>Active Courses</p>
            <p>18</p>
          </div>
          <div className="stat-card">
            <p>Drafts</p>
            <p>5</p>
          </div>
          <div className="stat-card">
            <p>Archived</p>
            <p>1</p>
          </div>
        </aside>

        
        <main className="course-section">
          <h2>Course Management</h2>

         
          <div className="search-filter">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search Courses" />
            </div>
            <select>
              <option>Status</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
            <button className="add-btn">➕ Add Course</button>
          </div>

          
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Instructor</th>
                <th>Category</th>
                <th>Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.title}</td>
                  <td>{course.instructor}</td>
                  <td>{course.category}</td>
                  <td>
                    <span className={`status-badge status-${course.status.toLowerCase()}`}>
                      {course.status}
                    </span>
                  </td>
                  <td>{course.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}

export default App;