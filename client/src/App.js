import React from 'react';
import Navbar from './components/Navbar';

import ApplicantProfilePage from "./pages/ApplicantProfilePage"

function App() {
  return (
    <div className='main-div'>
      hello world
      <div>
        <React.Fragment>
          <Navbar />
        </React.Fragment>
        <p>hello world</p>
         <div className="appRoutes">
      <Router>
        <Switch>
          <Routes>
          <Route path="/applicant/profile/:userID" component={ApplicantProfilePage} />
        </Routes>
        </Switch>
      </Router>
    </div>
      </div>
    </div>
  );
}

export default App;
