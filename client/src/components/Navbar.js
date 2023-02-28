import { useRef } from "react";
import { FaBars, FaDownload, FaTimes } from "react-icons/fa"; // import font awesome icons
import "../styles/styles.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import SearchBar from "./SearchBar";

export default function Navbar() {
  const navRef = useRef(); // this variable will refer to the nav tag

  /* each time this function is called, we will add/remove
    the class name from the nav tag */
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <h3>LOGO</h3>
      <SearchBar />
      <nav ref={navRef}>
          <Link to="/" onClick={showNavbar}>Home</Link>
          <Link to="/jobs" onClick={showNavbar}>Jobs</Link>
          <Link to="/inbox" onClick={showNavbar}>Inbox</Link>
          <Link to="/profile/:userID" onClick={showNavbar}>Profile</Link>
          <Link to="/about" onClick={showNavbar}>About</Link>
        {/* button for full screen */}
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      {/* button for smaller screen */}
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}
