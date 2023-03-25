import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import {ToastContainer } from 'react-toastify';
import Cookies from 'universal-cookie';

import Navbar from "./components/Navbar";
import ApplicantProfilePage from "./pages/ApplicantProfilePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import EditStudentPage from './pages/EditStudentPage';
import ViewPostingsPage from "./pages/ViewPostingsPage";
import Applicants from "./pages/Applicants";

import * as fn from './components/Function';

import "./styles/styles.css";

const cookies = new Cookies();

export default function App() {

  const [darkMode, toggleDarkMode] = fn.useDarkMode();
  
  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Router>
        <React.Fragment>
          <header>
          <Navbar toggleDarkMode={toggleDarkMode} />
          </header>
          <ToastContainer />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile/:userId" element={<ApplicantProfilePage />}/>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/student/edit/:userId" element={<EditStudentPage />} />
              <Route path="/postings" element={<ViewPostingsPage />} />
              <Route path="/applicants" element={<Applicants />} />
            </Routes>
          </main>
          <footer>
            <p>&copy; Lorem Ipsum</p>
          </footer>
        </React.Fragment>
      </Router>
    </div>
  );

}
