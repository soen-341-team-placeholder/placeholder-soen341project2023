import React from 'react';
import Navbar from './components/Navbar';

import CandidateProfilePage from "./pages/CandidateProfilePage"

function App() {
  return (
    <div className='main-div'>
      <div>
        <React.Fragment>
          <Navbar />
        </React.Fragment>
        <p>hello world</p>
         <div className="appRoutes">
      <Router>
        <Switch>
          <Routes>
          <Route path="/applicant/profile/:userID" component={ApplicantProfile} />
        </Routes>
        </Switch>
      </Router>
    </div>
      </div>
    </div>
  );
}

export default App;
