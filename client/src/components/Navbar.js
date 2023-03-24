import { useRef, useState } from "react";
import { FaBars, FaDownload, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import "../styles/styles.css";
import { Link, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import SearchBar from "./SearchBar";

export default function Navbar(props) {
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get('refreshToken');
  const navRef = useRef();
  const [darkMode, setDarkMode] = useState(false);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
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
          About
        </Link>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
        <button className="darkmode-toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? <FaMoon /> : <FaSun />}
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}
