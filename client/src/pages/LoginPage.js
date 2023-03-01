import React, { useState } from 'react';
import axios from 'axios';
import FormInput from '../components/FormInput';
import '../styles/login.css';

function LoginPage() {

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
        submitForm();
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const submitForm = async () => {
        await axios.get('http://localhost:4000/login',
            {
                email: values.email.toLowerCase(),
                password: values.password
            })
    };

    return (
        <div className='RegisterPage'>
            <form onSubmit={handleSubmit}>
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

export default LoginPage;