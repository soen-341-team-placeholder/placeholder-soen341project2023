import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import FormInput from '../components/FormInput';
import '../styles/Register.css';
import '../styles/FormInput.css';
import * as fn from "../components/Function";

function RegisterPage(props) {
    const { isLoggedIn, cookies, darkMode} = props;
  const navigate = useNavigate();
    const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    userType: "",
  });
  
  
  if (isLoggedIn) {
    navigate('/');
    fn.fancyPopup('Already logged in!');
    return null;
  } else
{


  const handleSelect = (event) => {
    const { name, value } = event.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };


  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      errorMessage: "Please enter only alphabetical characters",
      label: "First Name",
      pattern: "^[A-Z-a-z]+$",
      required: true,
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      errorMessage: "Please enter only alphabetical characters",
      label: "Last Name",
      pattern: "^[A-Z-a-z]+$",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "examplename@example.com",
      errorMessage: "Please enter a valid email address",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be between 8-20 characters",
      label: "Password",
      pattern: ".{8,}",
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords do not match",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
    {
      id: 6,
      name: "age",
      type: "number",
      placeholder: "Age",
      errorMessage: "You must be thirteen or older to register",
      label: "Age",
      required: true,
      min: 14
    },


  ]

const handleSubmit = (e) => {
  e.preventDefault();
  fn.registerUser(values).then((confirm) => {
    if (confirm) {
      navigate('/login');
    }
  });
};


  function onChange(e) {
  setValues({ ...values, [e.target.name]: e.target.value });
}





  return (
    <div className='RegisterPage'>
      <form className='form-register'>
        <h1>Sign Up</h1>
        <label>Account Type</label>
        <div className="customSelect">
          <select className="userSelectType" name="userType" onChange={handleSelect} required={true}>
            <option value="">Select</option>
            <option value="Student">Student</option>
            <option value="Employer">Employer</option>
          </select>
        </div>
        {
  inputs.map((input) => (
    <div key={input.id} className="form-input-wrapper">
      <label htmlFor={input.name}>{input.label}</label>
      <FormInput {...input} value={values[input.name]} onChange={onChange} label={null} />
    </div>
  ))
}
        <button className = 'register-btn' onClick={handleSubmit}>Register</button>
        <p>Already registered? <Link to ="./login" ><u>Login</u></Link></p>
      </form>


    </div>
  );
}
}
export default RegisterPage;
