import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput'
import * as fn from "../components/Function";

const cookies = new Cookies();

export default function LoginPage() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: ""
  });

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
    fn.submitForm(values, cookies);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className='RegisterPage'>
      <form className='form-register'>
        <h1>Login</h1>
        {
          inputs.map((input) => (
            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
          ))
        }
        <button onClick={handleSubmit} className='register-btn'>Login</button>
        <p>New User? <a href="./registration" ><u>Register here</u></a></p>
      </form>
    </div>
  )
}
