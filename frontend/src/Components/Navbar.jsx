import "./Navbar.css";
import { FaSearch } from "react-icons/fa";
import logo from "../Assets/logo 1.png";
import { MdOutlineMessage, MdOutlineNotificationsActive } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Learnora Logo" className="logo-img"></img>
      </div>

      {/* Explore Dropdown */}
      <div className="explore-container">
        <select className="explore">
          <option>Explore</option>
          <option>Courses</option>
          <option>Programs</option>
          <option>Instructors</option>
        </select>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input type="text" placeholder="What do you want to learn?" />
        <button className="search-btn">
          <FaSearch />
        </button>
      </div>

      {/* Icons */}
      <div className="icons">
        <MdOutlineNotificationsActive className="icon" />
        <MdOutlineMessage className="icon" />
        <LuUserRound className="icon" />
      </div>
    </nav>
  );
};

export default Navbar;
