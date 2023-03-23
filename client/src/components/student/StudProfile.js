import React, { useState, useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import Popup from 'reactjs-popup';
import axios from 'axios';

import Education from './Education';
import Skills from './Skills';
import WorkExp from './WorkExp';

import 'reactjs-popup/dist/index.css';
import '../../styles/edit_student/StudProfile.css';

import pic from './images/youssef.jpg';


const formReducer = (state, event) => {
    if (event.reset) {
        return {
            firstName: 'Youssef',
            lastName: 'Alsheghri',
            schoolName: '',
            major: '',
            email: 'youssef.alsheghri@gmail.com',
            location: 'Montreal, Canada',
            biography: '',
            education: [
                {
                    schoolName: '',
                    degree: '',
                    startDate: 0,
                    endDate: 0
                }
            ],
            workExperience: [
                {
                    companyName: '',
                    position: '',
                    startDate: 0,
                    endDate: 0
                }
            ],
        }
    }
    return {
        ...state,
        [event.name]: event.value
    }
}

function StudProfile({ firstName, lastName, email, biography, location }) {

    // code for form

    const [formData, setFormData] = useReducer(formReducer, {
        firstName,
        lastName,
        schoolName: 'Concordia University',
        major: 'Software Engineering',
        email,
        location,
        biography: 'Hello, this is my bio!',
        education: [
            {
                schoolName: '',
                degree: '',
                startDate: 0,
                endDate: 0
            }
        ],
        workExperience: [
            {
                companyName: '',
                position: '',
                startDate: 0,
                endDate: 0
            }
        ],
    });

    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
            setFormData({
                reset: true
            })
        }, 3000)
    }

    const submitForm = async () => {
        await axios.post('http://localhost:4000/student/edit/:userId',
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

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    // code for form ends here

    const [showDiv, setShowDiv] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(false);

    const toggleDiv = () => {
        setShowDiv(!showDiv);
        setShowSaveButton(true);
    };

    const handleSaveClick = () => {
        setShowDiv(false);
        setShowSaveButton(false);
    };

    return (
        <div className='container'>
            <div className='bottom'>
                <br /> <br />
                <div>
                    {showSaveButton ? (
                        <button onClick={handleSaveClick} type='submit' disabled={submitting} className='btn'>Save</button>
                    ) : (
                        <div>
                            <img className='studImgEdit' src={pic} alt='profile pic' />
                            <h3>{formData.firstName} {formData.lastName}</h3>
                            <p>{formData.major} at {formData.schoolName}  <br />
                                {formData.location} - <Popup trigger={<button className='btn-contact'>Contact info</button>} position='right center'>
                                    <div>{formData.email}</div></Popup></p>
                            <div>{formData.biography}</ div>
                            <button onClick={toggleDiv} className='btn'>Edit</button>
                            <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
                        </div>
                    )}
                    {showDiv && <div className='wrapper'>
                        <br />
                        <h3>Editing Personal Info</h3>
                        <br />
                        {submitting && <div>
                            Saving ...
                            <ul>
                                {Object.entries(formData).map(([name, value]) => (
                                    <li key={name}><strong>{name}</strong>: {value.toString()}</li>
                                ))}
                            </ul>
                        </div>}
                        <form onSubmit={handleSubmit} className='edit-stud-form'>
                            <fieldset disabled={submitting}>
                                <label>
                                    <table className='stud-profile-edit-info-table'>
                                        <tr>
                                            <td>
                                                <p className='stud-form-edit-p-tag'>First Name</p> <br />
                                                <input className='input-edit-stud-profile' name='firstName' onChange={handleChange} value={formData.firstName || ''} />
                                            </td>
                                            <td>
                                                <p className='stud-form-edit-p-tag'>Last Name</p> <br />
                                                <input className='input-edit-stud-profile' name='lastName' onChange={handleChange} value={formData.lastName || ''} />
                                            </td>
                                        </tr>
                                        <br />
                                    </table>
                                    <p className='stud-form-edit-p-tag'>Institution Name &nbsp;</p>
                                    <input className='input-edit-stud-profile' name='schoolName' onChange={handleChange} value={formData.schoolName || ''} />
                                    <br />
                                    <p className='stud-form-edit-p-tag'>Major &nbsp;</p>
                                    <input className='input-edit-stud-profile' name='major' onChange={handleChange} value={formData.major || ''} />
                                    <br />
                                    <p className='stud-form-edit-p-tag'>Email Address &nbsp;</p>
                                    <input className='input-edit-stud-profile' name='email' onChange={handleChange} value={formData.email || ''} />
                                    <br />
                                    <p className='stud-form-edit-p-tag'>Location &nbsp;</p>
                                    <input className='input-edit-stud-profile' name='location' onChange={handleChange} value={formData.location || ''} />
                                    <br />
                                    <p className='stud-form-edit-p-tag'>Biography</p>
                                    <br />
                                    <textarea className='input-edit-stud-profile' name='biography' onChange={handleChange} value={formData.biography || ''} />

                                </label>
                            </fieldset>
                        </form>
                    </div>}
                </div>

                <Routes>
                    <Route path='/experience' element={<WorkExp />} />
                    <Route path='/education' element={<Education />} />
                    <Route path='/skills' element={<Skills />} />
                </Routes>
            </div>
        </div>
    );
}

export default StudProfile;