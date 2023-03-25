import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import * as fn from "../components/Function";

export default function AboutPage(props) {
  const { cookies } = props;
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
      <br />

      <p>Current Cookies:</p>
      <ul>
        {Object.entries(cookieState).map(([name, value]) => (
          <li key={name}>{name}: {value}</li>
        ))}
      </ul>
      <button onClick={handleClick} style={{ backgroundColor: 'red', color: 'white', borderRadius: '50px', padding: '10px 20px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Random Button</button>

      {/* <p>Login status: {isLoggedIn}</p> */}
    </div>
  );
}
