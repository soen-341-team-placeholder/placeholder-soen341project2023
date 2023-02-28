import { useRef } from 'react';
import { FaBars, FaDownload, FaTimes } from 'react-icons/fa'; // import font awesome icons
import '../styles/Navbar.css';
import { BrowserRouter as Router, 
  Route, Link ,Routes} from 'react-router-dom';

 import SearchBar from './SearchBar';

function Navbar() {
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
                <Link to ="/">Home</Link>
                <Link to ="/">Jobs</Link>
                <Link to = "/">Inbox</Link>
                <Link to ="/profile/:userID">Profile</Link>
                {/* button for full screen */}
                <button className='nav-btn nav-close-btn' onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            {/* button for smaller screen */}
            <button className='nav-btn' onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar;