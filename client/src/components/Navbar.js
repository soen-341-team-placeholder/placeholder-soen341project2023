import { useRef, useState } from "react";
import { FaBars, FaDownload, FaMoon, FaSun, FaTimes } from "react-icons/fa"; // import font awesome icons
import "../styles/styles.css";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";

export default function Navbar() {
  const navRef = useRef(); // this variable will refer to the nav tag
  const [darkMode, setDarkMode] = useState(false); // state variable for dark mode

  /* each time this function is called, we will add/remove
    the class name from the nav tag */
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
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
        <Link to="/inbox" onClick={showNavbar}>
          Inbox
        </Link>
        <Link to="/profile/:userId" onClick={showNavbar}>
          Profile
        </Link>
        <Link to="/about" onClick={showNavbar}>
          About
        </Link>
        {/* button for full screen */}
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>

        {/* button for toggling dark mode */}
<button className="darkmode-toggle-btn" onClick={toggleDarkMode}>
  {darkMode ? <FaMoon /> : <FaSun/>}
</button>

      </nav>
      {/* button for smaller screen */}
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}
