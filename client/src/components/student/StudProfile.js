import React from 'react';
import pic from './images/youssef.jpg';
import { FaEdit } from "react-icons/fa";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Link, Routes, Route } from 'react-router-dom';
import Education from './Education';
import Skills from './Skills';
import WorkExp from './WorkExp';
import StudEditForm from './StudEditForm';

import '../../styles/edit_student/StudProfile.css';

function StudProfile({ firstName, lastName, email, biography, location }) {

    return (
        <div className='container'>
            <div className='bottom'>
                <br /> <br />
                <img src={pic} alt='profile pic' />
                <h3>Youssef Alsheghri</h3>
                <p>Software Engineering Major at Concordia University <br /> 
                Montreal, Canada - <Popup trigger={<button className='btn-contact'>Contact info</button>} position='right center'>
                    <div>Email: youssef.alsheghri@gmail.com</div></Popup></p>
                    <Link to='/studEditForm'><FaEdit /></Link>
                    
                    <Routes>
                        <Route path='/studEditForm' element={<StudEditForm />} />
                        <Route path='/experience' element={<WorkExp />} />
                        <Route path='/education' element={<Education />} />
                        <Route path='/skills' element={<Skills />} />
                    </Routes>
            </div>
        </div>
    );
}

export default StudProfile;