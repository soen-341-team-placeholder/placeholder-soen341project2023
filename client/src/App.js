import React from 'react';
import { BrowserRouter as Router, 
  Route, Link ,
Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import ApplicantProfilePage from './pages/ApplicantProfilePage';


export default function App()  {

  return (
    <>
      <Router>
          <header>
        <Navbar />
          </header>
          <main>
            <div className="center-contents">
              <div className="disclaimer">
                <div className="center-contents">
                  <span>
                    <Link to="/about" className="not-real-site-txt">
                      This is a span
                    </Link>{" "}
                  </span>
                </div>
              </div>
            </div>

                <Routes>
          <Route exact path="/" render={() => (
            <div className="max-w-4xl mx-auto px-4 py-8">
              <h1 className="text-4xl font-bold mb-4">Welcome to my React app</h1>
              <p className="mb-4">This is the homepage.</p>
              <Link to="/123456" className="text-blue-500 hover:text-blue-600">View my online CV</Link>
            </div>
          )} />
          <Route path="/profile/:userID" component={ApplicantProfilePage} />
              </Routes>
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

