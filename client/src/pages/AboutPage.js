import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/styles.css';

import * as fn from "../components/Function";

export default function AboutPage(props) {
  const { cookies,isLoggedIn, darkMode } = props;
  const [cookieState, setCookieState] = useState({});

  useEffect(() => {
    setCookieState(cookies.getAll());
  }, [cookies]);

  const handleClick = () => {
    fn.fancyPopup('Button clicked!');
  };

  return (
    <div>
      <h1>welcome to the about page</h1>
      {fn.hello_world()}
      <p>Backend URL: {fn.backendUrl}<br />
      if this is wrong, change components/Functions.js</p>
      <p>Login status: {isLoggedIn}</p>
      <p>Current cookies:</p>
      <ul>
        {Object.keys(cookieState).map((key) => (
          <li key={key}>{`${key}: ${cookieState[key]}`}</li>
        ))}
      </ul>
    </div>
  );
}
