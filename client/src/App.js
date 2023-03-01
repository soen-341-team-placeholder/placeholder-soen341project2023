import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ApplicantProfilePage from "./pages/ApplicantProfilePage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import EditStudentPage from './pages/EditStudentPage';

export default function App() {
  return (

    <Router>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile/:userId" element={<ApplicantProfilePage />} />
          <Route path="/profile/edit/:userId" element={<EditStudentPage />} />
          <Route path="/registration" element={<RegisterPage />} />
        </Routes>
      </main>

  
    </Router>
  );

}
