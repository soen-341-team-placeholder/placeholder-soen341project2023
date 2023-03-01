import React from 'react';
import '../../styles/edit_student/StudProfile.css';
import pic from './images/youssef.jpg';
import { FaEdit } from "react-icons/fa";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function StudProfile() {

    return (
        <div className='container'>
            <div className='top'>
            </div>
            <div className='bottom'>
                <br /> <br />
                <img src={pic} alt='profile pic' />
                <h3 style={{marginLeft:'170px'}}>Youssef Alsheghri <FaEdit style={{ marginLeft: '9rem' }} /></h3>
                <p>Software Engineering Major at Concordia University <br /> 
                Montreal, Canada - <Popup trigger={<button className='btn-contact'>Contact info</button>} position='right center'>
                    <div>Email: youssef.alsheghri@gmail.com</div></Popup></p>
            </div>
        </div>
    );
}

export default StudProfile;