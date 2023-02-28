import React from 'react';
import Navbar from './components/Navbar';

import ApplicantProfilePage from "./pages/ApplicantProfilePage"
import { BrowserRouter, Routes, Route, Link, Router } from "react-router-dom";

function App() {
  return (
    <div className='main-div'>
      <div>
        <React.Fragment>
          <Navbar />
        </React.Fragment>
        <p>hello world</p>
         <div className="appRoutes">
      {/* <Router>
          <Routes>
          <Route path="/applicant/profile/:userID" component={ApplicantProfilePage} />
        </Routes>
      </Router> */}
    </div>
      </div>
    </div>
  );
}

export default App;
