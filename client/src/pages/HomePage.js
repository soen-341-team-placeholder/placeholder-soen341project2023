import React from 'react';
import Cookies from "universal-cookie";


export default function HomePage() {
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get('refreshToken');
  return (
    <div>
    <h1>Welcome to the homepage</h1>
      <p>Hello world</p>

  <p>Login status: {isLoggedIn}</p>
    </div>
  );
}