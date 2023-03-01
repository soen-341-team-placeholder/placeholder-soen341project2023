import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput'

const cookies = new Cookies();

function LoginPage() {

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
        submitForm();
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const submitForm = async () => {
        await axios.post('http://localhost:4000/login',
            {
                email: values.email.toLowerCase(),
                password: values.password
            }).then((res) => {
                cookies.set('accessToken', res.data.accessToken, { path: '/' });
                cookies.set('refreshToken', res.data.refreshToken, { path: '/' });
                sendToProfile();
            }
            ).catch((err) => {
                console.log(err);
            });
    };

    const sendToProfile = async () => {
        await axios.get('http://localhost:4000/users?email=' + values.email.toLowerCase(),
            {
                headers:
                {
                    authorization: `Bearer ${cookies.get('accessToken')}`
                }
            })
            .then((res) => {
                navigate('/profile/' + res.data._id);
            }).catch((err) => {
                console.log(err);
            });
    }

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

export default LoginPage;