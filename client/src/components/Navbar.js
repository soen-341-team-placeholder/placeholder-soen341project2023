import { useRef, useState } from "react";
import { FaBars, FaDownload, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { Link, withRouter } from "react-router-dom";

import SearchBar from "./SearchBar";
import * as fn from './Function';
import "../styles/styles.css";


export default function Navbar(props) {
  const { isLoggedIn, cookies, darkMode, toggleDarkMode } = props;
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };


  const handleInboxClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      props.history.push("/inbox");
    } else {
      props.history.push("/login");
    }
    showNavbar();
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      props.history.push(`/profile/${cookies.get("userId")}`);
    } else {
      props.history.push("/login");
    }
    showNavbar();
  };

  const handleDarkModeToggle = () => {
    fn.toggleDarkMode();
    console.log(`darkMode = ${cookies.get("darkMode")}`);
  };

  return (
    <header className={darkMode ? "dark-mode" : ""}>
      <h3>LOGO</h3>
      <SearchBar />
      <nav ref={navRef}>
        <Link to="/" onClick={showNavbar}>
          Home
        </Link>
        <Link to="/jobs" onClick={showNavbar}>
          Jobs
        </Link>
        <Link to="/inbox" onClick={handleInboxClick}>
          Inbox
        </Link>
        <Link to="/profile/:userId" onClick={handleProfileClick}>
          Profile
        </Link>
        <Link to="/about" onClick={showNavbar}>
        Dev 
        </Link>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
        <button className="darkmode-toggle-btn" onClick={handleDarkModeToggle}>
          {darkMode ? <FaMoon /> : <FaSun />}
        </button>

      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}
