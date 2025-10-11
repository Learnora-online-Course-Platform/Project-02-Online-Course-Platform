import { useState, useEffect } from "react";
import { MessageSquare, Bell, User, LogOut } from "lucide-react";
import "./SDashboard.css";

// Header Component
function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <h1 className="logo-title">LEARNORA</h1>
        <p className="logo-subtitle">Skills for Life</p>
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
  );
}

// Sidebar Component
function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const navItems = [
    "Dashboard",
    "My Courses",
    "Assignments & Quizzes",
    "Evaluation",
    "Certificate & Progress",
    "Discussion Forum",
    "Payments",
    "Settings",
  ];

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
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item}
            className={`nav-item ${activeItem === item ? "active" : ""}`}
            onClick={() => setActiveItem(item)}
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
  );
}

// CourseCard Component
function CourseCard() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
    console.log("Play button clicked");
  };

  return (
    <div className="video-card">
      <div className="video-header">React Basics</div>
      <div className="video-thumbnail" onClick={handlePlayClick}>
        <button className="play-button" aria-label="Play video">
          <div className="play-icon"></div>
        </button>
      </div>
    </div>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found, redirecting to login...");
          window.location.href = "/Login";
          return;
        }

        const response = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const user = await response.json();
        setUserName(user.name || "Student");
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <div className="welcome-section">
            <h2 className="welcome-title">
              Welcome Back, {userName}! 👋
            </h2>
            <p className="welcome-subtitle">
              Continue your learning journey and achieve your goals.
            </p>
          </div>
          <div className="course-container">
            <CourseCard />
          </div>
        </div>
      </div>
    </div>
  );
}
