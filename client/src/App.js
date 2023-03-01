import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import ApplicantProfilePage from "./pages/ApplicantProfilePage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  return (
    <>
    <Router>
          <React.Fragment>
            <Navbar />
         </React.Fragment>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile/:userID" element={<ApplicantProfilePage />} />
          <Route path="/registration" element={<RegisterPage />} />
        </Routes>
      </main>
    </Router>
    </>
  );
}
