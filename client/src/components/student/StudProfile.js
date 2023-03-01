import React from 'react';
import pic from './images/youssef.jpg';
import { FaEdit } from "react-icons/fa";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import '../../styles/edit_student/StudProfile.css';

function StudProfile({ firstName, lastName, email, biography, location }) {

    return (
        <div className='container' style={{ padding: "10% 0% 0% 0%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <img src={pic} alt='profile pic' />
            <h3 >{firstName} {lastName} </h3>
            <p>{biography} <br />
                {location}- <Popup trigger={<button className='btn-contact'>Contact info</button>} position='right center'>
                    <div>Email: {email}</div></Popup></p>
            <FaEdit />

        </div>
    );
}

export default StudProfile;