import React from 'react';
import { BrowserRouter as Router, Route, Link , Switch} from 'react-router-dom';
import Navbar from './components/Navbar';

import ApplicantProfilePage from './pages/ApplicantProfilePage';
import HomePage from "./pages/HomePage"

export default function App() {
  return (
    <>
      <Router>
        <header>
          <Navbar />
        </header>

        <main>
          <div className="center-contents">
            <div>
              <Link to="/about" className="not-real-site-txt">
                This is a link
              </Link>{" "}
            </div>
          </div>
        <Switch>
          <Route exact path="/" component ={HomePage}/>
          <Route path="/profile/:userID" component={ApplicantProfilePage} />
        </Switch>


        </main>

        <footer>
          <br></br>
          {/* <h1 className="square-logo">DR</h1> */}

          <div className="text-center">
            <p className="copyright-txt">
              {" "}
              &#169; Copyright text here
            </p>
          </div>
        </footer>
      </Router>
    </>
  );
}
