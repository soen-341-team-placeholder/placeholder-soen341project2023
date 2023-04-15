import {useRef} from "react";
import {Link, useLocation} from "react-router-dom";
import Cookies from "universal-cookie";
import {FaBars} from "react-icons/fa"; // import font awesome icons
import "../styles/styles.css";

import SearchBar from "./SearchBar";
import * as fn from './Function';

import "../styles/styles.css";
import "../styles/Navbar.css";

export default function Navbar() {
    const universal_cookies = new Cookies()

    // Create a ref to access the nav element
    const navRef = useRef();

    // Function to toggle the navbar menu
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };
    
    return (
        <div className="nav-container">
            {/* Placeholder logo */}
            <h3>PlaceHolder</h3>

            {/* Search bar component */}
            <SearchBar/>

            {/* Navigation menu */}
            <nav ref={navRef}>
                <Link to="/" onClick={showNavbar}>
                    Hub
                </Link>
                <Link to="/postings" onClick={showNavbar}>
                    View Postings
                </Link>
                <Link to={"/profile/" + universal_cookies.get('userId')} onClick={showNavbar}>
                    Profile
                </Link>
                <Link to="/about" onClick={showNavbar}>
                    Dev
                </Link>
            </nav>

            {/* Hamburger menu button */}
            <button className="hamburger-menu" onClick={showNavbar}>
                <FaBars/>
            </button>
        </div>
    );
}
