import {useState} from "react";
import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import React from "react";
import {ToastContainer} from 'react-toastify';

import Navbar from "./components/Navbar";
import ApplicantProfilePage from "./pages/ApplicantProfilePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import StudentProfile from './pages/StudentProfile';
import Student from './components/student/Student';
import ViewPostingsPage from "./pages/ViewPostingsPage";
import Applicants from "./pages/Applicants";
import Calendar from './pages/Calendar';
import Inbox from './components/student/Inbox';
import ProtectedRoute from "./components/ProtectedRoute";
import * as fn from './components/Function';
import "./styles/styles.css";


const cookies = fn.cookies;
export default function App() {
    const darkMode = useState(cookies.get("darkMode"));
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
                    <HeaderWrapper/>
                    <main>
                        <ToastContainer/>
                        <Routes>
                            <Route path="/" element={<HomePage {...universalProps} />}/>
                            <Route path="/about" element={<AboutPage {...universalProps} />}/>
                            <Route path="/login" element={<LoginPage {...universalProps} />}/>
                            <Route path="/register" element={<RegisterPage {...universalProps} />}/>
                            <Route
                                path="/profile/:userId"
                                element={
                                    <ProtectedRoute>
                                        <ApplicantProfilePage {...universalProps} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/student/edit/:userId"
                                element={
                                    <ProtectedRoute>
                                        <StudentProfile/>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/postings"
                                element={
                                    <ProtectedRoute>
                                        <ViewPostingsPage {...universalProps} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/applicants"
                                element={
                                    <ProtectedRoute>
                                        <Applicants {...universalProps} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/student/:userId"
                                element={
                                    <ProtectedRoute>
                                        <Student {...universalProps} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/calendar"
                                element={
                                    <ProtectedRoute>
                                        <Calendar {...universalProps} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/inbox"
                                element={
                                    <ProtectedRoute>
                                        <Inbox {...universalProps} />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </main>
                    <FooterWrapper></FooterWrapper>
                </React.Fragment>
            </Router>
        </div>
    );
}


function HeaderWrapper() {
    const location = useLocation();

    if (location.pathname === '/login') {
        return null;
    }

    return <header><Navbar/></header>;
}

function FooterWrapper() {
    const location = useLocation();

    if (location.pathname === '/login') {
        return null;
    }

    return <footer data-testid="footer-1"><p>&copy; Lorem Ipsum</p></footer>;
}
