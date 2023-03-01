import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Navbar from "./components/Navbar";
import ApplicantProfilePage from "./pages/ApplicantProfilePage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile/:userID" element={<ApplicantProfilePage />} />
            <Route path="/registration" element={<RegisterPage />} />
          </Routes>
        </main>
      </Router>
    </React.Fragment>
  );
}
