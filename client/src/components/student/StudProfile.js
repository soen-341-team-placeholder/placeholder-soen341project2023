import React, { useState, useReducer, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';

import Education from './Education';
import Skills from './Skills';
import WorkExp from './WorkExp';
import 'reactjs-popup/dist/index.css';
import '../../styles/edit_student/StudProfile.css';
// @TODO: store images in db
import pic from './images/youssef.jpg';
import * as fn from '../Function';

function StudProfile(props) {
  const cookies = props.cookies;
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const user = await fn.fetchUserProfile(userId);
      setUser(user);
    }
    fetchData();
  }, [userId]);

  const initialState = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    age: user?.age || '',
    email: user?.email || '',
    biography: user?.biography || '',
    education: user?.education || [
      {
        schoolName: '',
        degree: '',
        startDate: 0,
        endDate: 0
      }
    ],
    workExperience: user?.workExperience || [
      {
        companyName: '',
        position: '',
        startDate: 0,
        endDate: 0
      }
    ]
  };

  const formReducer = () => (state, event) => {
    if (event.reset) {
      return initialState;
    }
    return {
      ...state,
      [event.name]: event.value
    };
  };
  // code for form
  const [formData, setFormData] = useReducer(formReducer(), initialState);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setFormData({
      reset: true
    });
  }, [user]);

  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitting(true);

    const result = await fn.updateUserProfile(userId, formData);

    if (result) {
      fn.fancyPopup('Profile updated');
    }

    setSubmitting(false);
    setFormData({
      reset: true
    });
  };

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value
    });
  };

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
                        <button onClick={handleSaveClick} type='submit' disabled={submitting}
                            className='btn'>Save</button>
                    ) : (
                        <div>
                            <img className='studImgEdit' src={pic} alt='profile pic' />
                            <h3>{formData.firstName} {formData.lastName}</h3>
                            <p>{formData.age} years old<br />
                                <Popup
                                    trigger={<button className='btn-contact'>Contact info</button>}
                                    position='right center'>
                                    <div>{formData.email}</div>
                                </Popup></p>
                            <div>{formData.biography}</div>
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
                                                <input className='input-edit-stud-profile' name='firstName'
                                                    onChange={handleChange} value={formData.firstName || ''} />
                                            </td>
                                            <td>
                                                <p className='stud-form-edit-p-tag'>Last Name</p> <br />
                                                <input className='input-edit-stud-profile' name='lastName'
                                                    onChange={handleChange} value={formData.lastName || ''} />
                                            </td>
                                        </tr>
                                        <br />
                                    </table>
                                    <p className='stud-form-edit-p-tag'>Email Address &nbsp;</p>
                                    <input className='input-edit-stud-profile' name='email' onChange={handleChange}
                                        value={formData.email || ''} />
                                    <br />
                                    <p className='stud-form-edit-p-tag'>Biography</p>
                                    <br />
                                    <textarea className='input-edit-stud-profile' name='biography'
                                        onChange={handleChange} value={formData.biography || ''} />
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