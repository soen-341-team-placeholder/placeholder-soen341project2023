import { useRef } from "react";
import { FaBars, FaDownload, FaTimes } from "react-icons/fa"; // import font awesome icons
import "../styles/styles.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import SearchBar from "./SearchBar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-red-500 text-white">
      <div className="flex justify-between items-center mx-8 py-4">
        <h3>LOGO</h3>
        <div className="hidden md:block">
          <SearchBar />
        </div>
        <button className="md:hidden text-3xl" onClick={toggleNavbar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <nav className={`md:flex md:justify-between md:items-center ${isOpen ? 'block' : 'hidden'}`}>
        <div className="text-center md:flex-grow md:text-left">
          <Link to="/" className="block my-3 hover:text-red-200" onClick={toggleNavbar}>
            Home
          </Link>
          <Link to="/jobs" className="block my-3 hover:text-red-200" onClick={toggleNavbar}>
            Jobs
          </Link>
          <Link to="/inbox" className="block my-3 hover:text-red-200" onClick={toggleNavbar}>
            Inbox
          </Link>
          <Link to="/profile/:userID" className="block my-3 hover:text-red-200" onClick={toggleNavbar}>
            Profile
          </Link>
          <Link to="/about" className="block my-3 hover:text-red-200" onClick={toggleNavbar}>
            About
          </Link>
        </div>
        <div className="md:hidden">
          <SearchBar />
        </div>
      </nav>
    </header>
  );
}
