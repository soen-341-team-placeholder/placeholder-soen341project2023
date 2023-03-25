import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import {ToastContainer } from 'react-toastify';

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



const cookies = fn.cookies;
export default function App() {
  const darkMode= useState(cookies.get("darkMode") );
  const isLoggedIn = !!cookies.get('refreshToken');

  const universalProps = {
    darkMode,
    cookies,
    isLoggedIn
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Router>
        <React.Fragment>
          <header>
            <Navbar {...universalProps}/>
          </header>
          <ToastContainer />
          <main>
            <Routes>
              <Route path="/" element={<HomePage {...universalProps} />} />
              <Route path="/about" element={<AboutPage {...universalProps} />} />
              <Route path="/login" element={<LoginPage {...universalProps} />} />
              <Route path="/profile/:userId" element={<ApplicantProfilePage {...universalProps} />}/>
              <Route path="/register" element={<RegisterPage {...universalProps} />} />
              <Route path="/student/edit/:userId" element={<EditStudentPage {...universalProps} />} />
              <Route path="/postings" element={<ViewPostingsPage {...universalProps} />} />
              <Route path="/applicants" element={<Applicants {...universalProps} />} />
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
