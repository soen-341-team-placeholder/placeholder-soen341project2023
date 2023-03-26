import { useRef, useState } from "react";
import { FaBars, FaDownload, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { Link, withRouter } from "react-router-dom";

import SearchBar from "./SearchBar";
import * as fn from './Function';

import "../styles/styles.css";
import "../styles/Navbar.css";

export default function Navbar(props) {
  // Destructure props to get required variables
  const { isLoggedIn, cookies, darkMode } = props;

  // Create a ref to access the nav element
  const navRef = useRef();

  // Function to toggle the navbar menu
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  // Function to handle dark mode toggle
  const handleDarkModeToggle = () => {
    fn.toggleDarkMode();
    console.log(`darkMode = ${cookies.get("darkMode")}`);
  };

  return (
    <div className="nav-container">
      {/* Placeholder logo */}
      <h3>PlaceHolder</h3>

      {/* Search bar component */}
      <SearchBar />

      {/* Navigation menu */}
      <nav ref={navRef}>
        <Link to="/" onClick={showNavbar}>
          Hub
        </Link>
        <Link to="/job" onClick={fn.loginRedirector}>
          Jobs
        </Link>
        <Link to="/inbox" onClick={fn.loginRedirector}>
          Inbox
        </Link>
        <Link to="/profile/:userId" onClick={fn.loginRedirector}>
          Profile
        </Link>
        <Link to="/about" onClick={showNavbar}>
          Dev
        </Link>

        {/* Dark mode toggle button */}
        <button className="darkmode-toggle-btn" onClick={handleDarkModeToggle}>
          {darkMode ? <FaMoon /> : <FaSun />}
        </button>
      </nav>

      {/* Hamburger menu button */}
      <button className="hamburger-menu" onClick={showNavbar}>
        <FaBars />
      </button>
    </div>
  );
}
