import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import ApplicantProfilePage from "./pages/ApplicantProfilePage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

import "./styles/styles.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Router>
        <React.Fragment>
          <Navbar toggleDarkMode={toggleDarkMode} />

          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route
                path="/profile/:userId"
                element={<ApplicantProfilePage />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/profile/:userID"
                element={<ApplicantProfilePage />}
              />
              <Route path="/registration" element={<RegisterPage />} />
            </Routes>
          </main>
        </React.Fragment>
      </Router>
    </div>
  );
}
