import React from 'react';
import Cookies from "universal-cookie";
import *  as fn from "../components/Function";

export default function HomePage() {
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get('accessToken');
  return (
    <div>
    <h1>Welcome to the homepage</h1>

     {fn.hello_world()}

  <p>Login status: {isLoggedIn}</p>
    </div>
  );
}