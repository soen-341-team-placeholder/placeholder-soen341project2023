import React, {useState} from 'react';
import '../styles/login.css';

function LoginPage(){
    const  [email, setEmail] = useState('');
    const  [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);

    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <h2>Login in to "ClientName"</h2>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="examplename@example.com" id="3" name="email" />
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="4" name="password" />
            <button type="submit">Log In</button>
        
        </form>

        <p>New User? <a href="./registration" ><u>Register here</u></a></p>
        
        </>
    )

}

export default LoginPage;