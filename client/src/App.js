import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import ApplicantProfilePage from './pages/ApplicantProfilePage';

function App() {
  return (
    <div className="main-div">
      <Router>
        <Navbar />
        <Route exact path="/">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">Welcome to my React app</h1>
            <p className="mb-4">This is the homepage.</p>
            <Link to="/123456" className="text-blue-500 hover:text-blue-600">
              View my online CV
            </Link>
          </div>
        </Route>
        <Route path="/profile/:userID" component={ApplicantProfilePage} />
      </Router>
    </div>
  );
}

export default App;
