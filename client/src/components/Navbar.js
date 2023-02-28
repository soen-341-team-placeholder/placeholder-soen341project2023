import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <h3>LOGO</h3>
      <SearchBar />
      <nav className={isOpen ? "responsive_nav" : ""}>
        <Link to="/" onClick={toggleNavbar}>
          Home
        </Link>
        <Link to="/jobs" onClick={toggleNavbar}>
          Jobs
        </Link>
        <Link to="/inbox" onClick={toggleNavbar}>
          Inbox
        </Link>
        <Link to="/profile/:userID" onClick={toggleNavbar}>
          Profile
        </Link>
        <Link to="/about" onClick={toggleNavbar}>
          About
        </Link>
        <button className="nav-btn nav-close-btn" onClick={toggleNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={toggleNavbar}>
        <FaBars />
      </button>
    </header>
  );
}
