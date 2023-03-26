import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import FormInput from '../components/FormInput'
import * as fn from "../components/Function";
import '../styles/Register.css';


export default function LoginPage(props) {
    const { isLoggedIn, cookies, darkMode} = props;
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: ""
  });

   if (isLoggedIn) {
    navigate('/');
    fn.fancyPopup('Already logged in!');
    return null;
  } else{

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "examplename@example.com",
      errorMessage: "Please enter a valid email address",
      label: "Email",
      required: true
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be at least 3 characters",
      label: "Password",
      pattern: ".{3,}",
      required: true
    }
  ]


  const handleSubmit = (e) => {
    e.preventDefault();
    fn.loginUser(values, cookies);

  };

  function onChange(e) {
  setValues({ ...values, [e.target.name]: e.target.value });
}



  return (
    <div className='RegisterPage'>
      <form className='form-register'>
        <h1>Login</h1>
        {
  inputs.map((input) => (
    <div key={input.id} className="form-input-wrapper">
      <label htmlFor={input.name}>{input.label}</label>
      <FormInput {...input} value={values[input.name]} onChange={onChange} label={null} />
    </div>
  ))
}
        <button className = 'register-btn' onClick={handleSubmit}>Log in</button>
        <p>New User?<Link to ="/register" ><u>Register</u></Link></p>
      </form>


    </div>
  )
}
}