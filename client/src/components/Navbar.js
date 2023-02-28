import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

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
        <NavLink exact to="/" activeClassName="active" onClick={toggleNavbar}>
          Home
        </NavLink>
        <NavLink to="/jobs" activeClassName="active" onClick={toggleNavbar}>
          Jobs
        </NavLink>
        <NavLink to="/inbox" activeClassName="active" onClick={toggleNavbar}>
          Inbox
        </NavLink>
        <NavLink
          to="/profile/:userID"
          activeClassName="active"
          onClick={toggleNavbar}
        >
          Profile
        </NavLink>
        <NavLink to="/about" activeClassName="active" onClick={toggleNavbar}>
          About
        </NavLink>
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
