import {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import {FaBars} from "react-icons/fa";

import SearchBar from "./SearchBar";

import "../styles/styles.css";
import "../styles/Navbar.css";
import {cookies} from "./Function";

export default function Navbar(props) {
  const { isLoggedIn, cookies } = props;

  const [isEmployer, setEmployer] = useState(false);

  const navigate = useNavigate();

  // Create a ref to access the nav element
  const navRef = useRef();

  // Function to toggle the navbar menu
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const logout = () => {
    navRef.current.classList.toggle("responsive_nav");
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    cookies.remove("userId");
    cookies.remove("userType");
  };

  useEffect(() => {
    setEmployer(cookies.get("userType") === "employer");
  });

  return (
    <div className="nav-container">
      {/* Placeholder logo */}
      <h3>PlaceHolder</h3>

      {/* Search bar component */}
      <SearchBar />

      {/* Hamburger menu button */}
      <button className="hamburger-menu" onClick={showNavbar}>
        <FaBars />
      </button>

      {/* Navigation menu */}
      <nav ref={navRef}>
        <Link to="/" onClick={showNavbar}>
          Hub
        </Link>
        <Link to="/postings" onClick={showNavbar}>
          View Postings
        </Link>
        <Link
          to={"/profile/" + cookies.get("userId")}
          onClick={showNavbar}
        >
          Profile
        </Link>
        <Link to="/about" onClick={showNavbar}>
          Dev
        </Link>
        {isEmployer && (
          <Link to="/applicants" onClick={showNavbar}>
            Applicants
          </Link>
        )}
        <Link to="/login" onClick={logout}>
          Logout
        </Link>
      </nav>
    </div>
  );
}
