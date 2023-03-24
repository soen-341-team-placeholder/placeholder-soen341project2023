import React from "react"
import *  as fn from "../components/Function";

export default function AboutPage() {
  return (
    <div>
      <h1>welcome to the about page</h1>
      {fn.hello_world()}
      <p>Backend URL: {fn.backendUrl}<br></br>
      if this is wrong, change components/Functions.js</p>
      {/* <p>Login status: {isLoggedIn}</p> */}
    </div>
  );
}
