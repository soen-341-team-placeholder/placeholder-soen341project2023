import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Navbar from './components/Navbar';
import ApplicantProfilePage from "./pages/ApplicantProfilePage";

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
          <Route exact path="/" render={() => (
            <div className="max-w-4xl mx-auto px-4 py-8">
              <h1 className="text-4xl font-bold mb-4">Welcome to my React app</h1>
              <p className="mb-4">This is the homepage.</p>
              <Link to="/123456" className="text-blue-500 hover:text-blue-600">View my online CV</Link>
            </div>
          )} />
          <Route path="profile/:userID" component={ApplicantProfilePage} />
        </Switch>
      </Router>
    </div>
      </div>
    </div>
  );
}

export default App;
