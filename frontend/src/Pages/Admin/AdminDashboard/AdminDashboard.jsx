import React, { useState } from "react";
import "./AdminDashboard.css";
import total from "../../../Assets/Total.png";
import active from "../../../Assets/Active.png";
import book from "../../../Assets/book.png";
import month from "../../../Assets/month.png";
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar${sidebarOpen ? " open" : ""}`}>
        <ul>
          <li>Dashboard</li>
          <li>User Management</li>
          <li>Payment Management</li>
          <li>Reports/Analytics</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          {/* Hamburger icon for mobile */}
          <button
            className="hamburger"
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label="Toggle sidebar"
          >
            <span style={{ fontSize: "28px" }}>&#9776;</span>
          </button>
          <h2>Welcome Back, Tom! 👋</h2>
        </header>

        {/* Stats Cards */}
        <section className="stats">
          <div className="card">
            <div>
              <h3>Total Users</h3>
              <p className="value">15,420</p>
              <p className="growth green">+12% from last month</p>
            </div>
            <img src={total} className="picture"></img>
          </div>
          <div className="card">
            <div>
              <h3>Total Courses</h3>
              <p className="value">342</p>
              <p className="growth green">+8% from last month</p>
            </div>
            <img src={book} className="picture"></img>
          </div>
          <div className="card">
            <div>
              <h3>Monthly Revenue</h3>
              <p className="value">45,780</p>
              <p className="growth green">+15% from last month</p>
            </div>
            <img src={month} className="picture"></img>
          </div>
          <div className="card">
            <div>
              <h3>Active Users</h3>
              <p className="value">8,943</p>
              <p className="growth red">-3% from last month</p>
            </div>
            <img src={active} className="picture"></img>
          </div>
        </section>

        {/* Recent Users */}
        <section className="recent">
          <h3>Recent Users</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Smith</td>
                <td>Student</td>
                <td>
                  <span className="status active">Active</span>
                </td>
              </tr>
              <tr>
                <td>Alen Walker</td>
                <td>Instructor</td>
                <td>
                  <span className="status active">Active</span>
                </td>
              </tr>
              <tr>
                <td>Jusmin Perera</td>
                <td>Student</td>
                <td>
                  <span className="status pending">Pending</span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Notifications */}
        <section className="notifications">
          <h3>Recent Notifications</h3>
          <ul>
            <li>
              <span className="dot"></span>
              New instructor application pending approval
              <span className="time">2 hours ago</span>
            </li>
            <li>
              <span className="dot"></span>
              Server maintenance scheduled for tonight
              <span className="time">6 hours ago</span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
