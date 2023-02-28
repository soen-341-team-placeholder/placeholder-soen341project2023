import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import ApplicantProfilePage from "./pages/ApplicantProfilePage";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:userID" element={<ApplicantProfilePage />} />
        </Routes>
      </main>

      <footer>
        <div className="text-center">
          <p>&copy; 2023 Placeholder Inc.</p>
        </div>
      </footer>
    </Router>
  );
}
