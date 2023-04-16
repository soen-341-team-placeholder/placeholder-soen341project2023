import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import React from "react";
import {ToastContainer} from 'react-toastify';

import Navbar from "./components/Navbar";
import ProfilePage from "./components/profile/ProfilePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import ViewPostingsPage from "./pages/ViewPostingsPage";
import Applicants from "./pages/Applicants";
import Calendar from './pages/Calendar';
import Inbox from './components/Inbox';
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileModal from "./components/profile/ProfileModal";

import "./styles/styles.css";

import * as fn from './components/Function';


const cookies = fn.cookies;
export default function App() {
    const isLoggedIn = fn.isLoggedIn();

    const universalProps = {
        cookies,
        isLoggedIn
    };


    return (
        <div className={'h-screen'}>
            <Router>
                <React.Fragment>
                    <main className={'flex flex-col h-full'}>
                        <HeaderWrapper/>
                        <div className={'flex-grow'}>
                            <ToastContainer/>
                            <Routes>
                                <Route path="/" element={<HomePage/>}/>
                                <Route path="/about" element={<AboutPage {...universalProps} />}/>
                                <Route path="/login" element={<LoginPage {...universalProps} />}/>
                                <Route path="/register" element={<RegisterPage {...universalProps} />}/>
                                <Route
                                    path="/profile/:userId"
                                    element={
                                        <ProtectedRoute>
                                            <ProfilePage/>
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/profiles/:userId"
                                    element={
                                        <ProtectedRoute>
                                            <ProfileModal/>
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
                        </div>
                        <FooterWrapper/>
                    </main>
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

    return (
        <div data-testid="footer-1" className="bg-gray-800 text-white py-4 px-6">
            <p className="text-center text-sm">
                &copy; {new Date().getFullYear()} Career Service Application. All rights reserved. | A platform
                connecting
                job seekers and employers for a better career.
            </p>
        </div>)
}
