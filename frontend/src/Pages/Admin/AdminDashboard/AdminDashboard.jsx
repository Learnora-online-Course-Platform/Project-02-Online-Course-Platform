import React, { useState } from "react";
import "./AdminDashboard.css";
import { Users, BookOpen, DollarSign, BarChart3, Settings, LogOut, MessageSquare, Bell, User, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();

  const navItems = [
    "Dashboard",
    "User Management",
    "Course Management",
    "Payment Management",
    "Reports/Analytics",
    "Settings"
  ];

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setUserName(user.name);
    }
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      alert("Logged out successfully!");
      window.location.href = "/"; // navigate('/Homepage');
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed.");
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <button
            className="hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
          <div className="logo-container">
            <h1 className="logo-title">LEARNORA</h1>
            <p className="logo-subtitle">Admin Panel</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-button" aria-label="Messages">
            <MessageSquare />
          </button>
          <button className="icon-button" aria-label="Notifications">
            <Bell />
          </button>
          <button className="icon-button" aria-label="User Profile">
            <User />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <button
                key={item}
                className={`nav-item ${activeItem === item ? "active" : ""}`}
                onClick={() => {
                  setActiveItem(item);
                  setSidebarOpen(false);

                  if (item === "User Management") navigate("/Usermanagement");
                  else if (item === "Course Management") navigate("/CourseManagement");
                  else if (item === "Payment Management") navigate("/PaymentManagement");
                  else if (item === "Reports/Analytics") navigate("/Reports");
                  else if (item === "Settings") navigate("/AdminSettings");
                  else navigate("/AdminDashboard");
                }}
              >
                {item}
              </button>
            ))}
          </nav>
          <button className="logout-button" onClick={handleLogout}>
            <LogOut />
            <span>Log Out</span>
          </button>
        </aside>

        {/* Content Area */}
        <div className="content-area">
          <div className="welcome-section">
            <h2 className="welcome-title">Welcome Back, {userName}! 👋</h2>
            <p className="welcome-subtitle">
              Manage your platform and monitor performance.
            </p>
          </div>

          {/* Stats Cards */}
          <section className="stats">
            <div className="card">
              <div>
                <h3>Total Users</h3>
                <p className="value">15,420</p>
                <p className="growth green">↑ 12% from last month</p>
              </div>
              <div className="card-icon icon-blue">
                <Users size={32} color="#2563eb" />
              </div>
            </div>
            <div className="card">
              <div>
                <h3>Total Courses</h3>
                <p className="value">342</p>
                <p className="growth green">↑ 8% from last month</p>
              </div>
              <div className="card-icon icon-green">
                <BookOpen size={32} color="#059669" />
              </div>
            </div>
            <div className="card">
              <div>
                <h3>Monthly Revenue</h3>
                <p className="value">$45,780</p>
                <p className="growth green">↑ 15% from last month</p>
              </div>
              <div className="card-icon icon-purple">
                <DollarSign size={32} color="#7c3aed" />
              </div>
            </div>
            <div className="card">
              <div>
                <h3>Active Users</h3>
                <p className="value">8,943</p>
                <p className="growth red">↓ 3% from last month</p>
              </div>
              <div className="card-icon icon-orange">
                <Users size={32} color="#ea580c" />
              </div>
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
                <div className="notification-content">
                  <span className="dot"></span>
                  <span>New instructor application pending approval</span>
                </div>
                <span className="time">2 hours ago</span>
              </li>
              <li>
                <div className="notification-content">
                  <span className="dot"></span>
                  <span>Server maintenance scheduled for tonight</span>
                </div>
                <span className="time">6 hours ago</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;