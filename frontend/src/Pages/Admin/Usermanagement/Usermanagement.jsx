import { useState } from "react";
import "./Usermanagement.css";
// import img1 from './img/logo.png';
// import img2 from './img/image 13.png';
// import img3 from './img/image 11.png';
// import img4 from './img/image 10.png';





function App() {

  const users = [
  {
    name: "Lahiru Weerasinghe",
    email: "lahiru123@gmail.com",
    role: "Student",
    status: "Active",
    lastLogin: "Jan 15,2025 10.45 AM",
  },
  {
    name: "Amaya Perera",
    email: "amaya1212@gmail.com",
    role: "Instructor",
    status: "Inactive",
    lastLogin: "Aug 1,2025 8.00 AM",
  },
  {
    name: "Malsha De Silva",
    email: "malsha111@gmail.com",
    role: "Admin",
    status: "Active",
    lastLogin: "May 2,2025 2.15 PM",
  },
  {
    name: "Nethmi Perera",
    email: "nethmi000@gmail.com",
    role: "Student",
    status: "Inactive",
    lastLogin: "Aug 20,2025 1.20 AM",
  },
  {
    name: "Kasun Jayakodi",
    email: "kasun789@gmail.com",
    role: "Instructor",
    status: "Active",
    lastLogin: "Jul 28,2025 3.00 PM",
  },
];
  
  return (
    <div className="app-root">
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

      <main className="page-container">
        
        <section className="card user-management">
          <div className="card-header">
            <h1>User Management</h1>
            <p className="subtitle">Tarck your Progress and download your certificat</p>
          </div>

          <div className="controls">
           <div className="search-box">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search name,email,role" />
            </div>
            <button className="btn-add">➕ Add User</button>
          </div>

 
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Last Login</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={index}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <span className={`role ${u.role.toLowerCase()}`}>{u.role}</span>
              </td>
              <td>
                <span
                  className={`status ${
                    u.status.toLowerCase() === "active" ? "active" : "inactive"
                  }`}
                >
                  {u.status}
                </span>
              </td>
              <td>{u.lastLogin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  

        </section>

        
        <aside className="card summary">
  <h3 className="summary-title">Total Users</h3>
  <div className="summary-list">
    <div className="summary-item">
      <div className="big">50</div>
      <div className="label">Total Users</div>
    </div>
    <div className="summary-item">
      <div className="big">34</div>
      <div className="label">Active Users</div>
    </div>
    <div className="summary-item">
      <div className="big">10</div>
      <div className="label">Instructor</div>
    </div>
    <div className="summary-item">
      <div className="big">6</div>
      <div className="label">Admins</div>
    </div>
  </div>
</aside>

      </main>
    </div>
  );
}

export default App;
