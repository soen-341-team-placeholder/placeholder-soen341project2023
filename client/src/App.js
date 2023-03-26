import { useState } from "react";
import { Navigate, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import {ToastContainer } from 'react-toastify';

import Navbar from "./components/Navbar";
import ApplicantProfilePage from "./pages/ApplicantProfilePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import EditStudentPage from './pages/EditStudentPage';
import Student from './components/student/Student';
import ViewPostingsPage from "./pages/ViewPostingsPage";
import Applicants from "./pages/Applicants";
import Calendar from './pages/Calendar';
import ViewPostings from "./pages/ViewPostingsPage";
import Inbox from './components/student/Inbox';

import * as fn from './components/Function';
import "./styles/styles.css";


const cookies = fn.cookies;
export default function App() {
  const darkMode= useState(cookies.get("darkMode") );
  const isLoggedIn = fn.isLoggedIn();

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
          <main>
                      <ToastContainer />
            <Routes>
              <Route path="/" element={<HomePage {...universalProps} />} />
              <Route path="/about" element={<AboutPage {...universalProps} />} />
              <Route path="/login" element={<LoginPage {...universalProps} />} />
              <Route path="/register" element={<RegisterPage {...universalProps} />} />
              <Route
                path="/profile/:userId"
                element={isLoggedIn ? <ApplicantProfilePage {...universalProps} /> :  <Navigate to='/login' />}
              />
              <Route
                path="/student/edit/:userId"
                element={isLoggedIn ? <EditStudentPage {...universalProps} /> :  <Navigate to='/login' />}
              />
              <Route
                path="/postings"
                element={isLoggedIn ? <ViewPostingsPage {...universalProps} /> :  <Navigate to='/login' />}
              />
              <Route
                path="/applicants"
                element={isLoggedIn ? <Applicants {...universalProps} /> :  <Navigate to='/login' />}
              />
              <Route
                path="/student/:userId"
                element={isLoggedIn ? <Student {...universalProps} /> :  <Navigate to='/login' />}
              />
              <Route
                path="/calendar"
                element={isLoggedIn ? <Calendar {...universalProps} /> :  <Navigate to='/login' />}
              />
              <Route
                path="/inbox"
                element={isLoggedIn ? <Inbox {...universalProps} /> :  <Navigate to='/login' />}
              />
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
