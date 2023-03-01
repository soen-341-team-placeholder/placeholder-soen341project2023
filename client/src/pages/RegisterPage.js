import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormInput from '../components/FormInput';
import '../styles/Register.css';
import '../styles/FormInput.css';

function RegisterPage() {

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
      errorMessage: "Password should be at least 3 characters",
      label: "Password",
      pattern: ".{3,}",
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
      min: 13,
      max: 100
    },


  ]

  const handleSubmit = (e) => {
    console.log(values);
    e.preventDefault();
    submit();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    let valuesToSubmit = values;
    delete valuesToSubmit.confirmPassword;
    valuesToSubmit.userType = values.userType.toLowerCase();

    (await axios.post('http://localhost:4000/users', valuesToSubmit)).then((res) => {
      navigate('/login');
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className='RegisterPage'>

      <form>
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
            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
          ))
        }
        <button onClick={handleSubmit} className='register-btn'>Register</button>
        <p>Already registered? <a href="./login" ><u>Login</u></a></p>
      </form>


    </div>
  );
}

export default RegisterPage;
