import React, { useState, useReducer } from 'react';
import pic from './images/youssef.jpg';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Routes, Route } from 'react-router-dom';
import Education from './Education';
import Skills from './Skills';
import WorkExp from './WorkExp';
import '../../styles/edit_student/StudProfile.css';

const formReducer = (state, event) => {
    if(event.reset) {
      return {
        fName: '',
        lName: '',
        schoolName: '',
        major: '',
        email: '',
        building: '',
        street: '',
        appart: '',
        city: '',
        province: '',
        country: '',
        postal: '',
      }
    }
    return {
      ...state,
      [event.name]: event.value
    }
  }

function StudProfile({ firstName, lastName, email, biography, location }) {

    // code for form

    const [formData, setFormData] = useReducer(formReducer, {});
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
                            <button onClick={handleSaveClick} type='submit' disabled={submitting}>Save</button>
                        ) : (
                            <div>
                                <img className='studImgEdit' src={pic} alt='profile pic' />
                                <h3>Youssef Alsheghri</h3>
                                <p>Software Engineering Major at Concordia University <br /> 
                                Montreal, Canada - <Popup trigger={<button className='btn-contact'>Contact info</button>} position='right center'>
                                <div>Email: youssef.alsheghri@gmail.com</div></Popup></p>
                                <button onClick={toggleDiv}>Edit</button>
                                <br /> <br /> <br /> <br /> <br />
                            </div>
                        )}
                        {showDiv && <div className='wrapper'>
                            <br />
                        <h1>Editing Personal Info</h1>
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
                                    <table>
                                        <tr>
                                        <td>
                                            <p>First Name</p>
                                            <input className='input-edit-stud-profile' name='fName' onChange={handleChange} value={formData.fName || ''} />
                                        </td>
                                        <td>
                                            <p>Last Name</p>
                                            <input className='input-edit-stud-profile' name='lName' onChange={handleChange} value={formData.lName || ''} />
                                        </td>
                                        </tr>
                                    </table>
                                    <p>Institution Name</p>
                                    <input className='input-edit-stud-profile' name='schoolName' onChange={handleChange} value={formData.schoolName || ''} />
                                    <p>Major</p>
                                    <input className='input-edit-stud-profile' name='major' onChange={handleChange} value={formData.major || ''} />
                                    <p>Email Address</p>
                                    <input className='input-edit-stud-profile' name='email' onChange={handleChange} value={formData.email || ''} />
                                    <hr />
                                    <p>Address</p>
                                    <table>
                                        <tr>
                                        <td>
                                            <p>Building number</p>
                                            <input className='input-edit-stud-profile' name='building' onChange={handleChange} value={formData.building || ''} />
                                        </td>
                                        <td>
                                            <p>Street name</p>
                                            <input className='input-edit-stud-profile' name='street' onChange={handleChange} value={formData.street || ''} />
                                        </td>
                                        <td>
                                            <p>Appartment/Suite</p>
                                            <input className='input-edit-stud-profile' name='appart' onChange={handleChange} value={formData.appart || ''} />
                                        </td>
                                        </tr>
                                        <tr>
                                        <td>
                                            <p>City</p>
                                            <input className='input-edit-stud-profile' name='city' onChange={handleChange} value={formData.city || ''} />
                                        </td>
                                        <td>
                                            <p>Province</p>
                                            <input className='input-edit-stud-profile' name='province' onChange={handleChange} value={formData.province || ''} />
                                        </td>
                                        <td>
                                            <p>Country</p>
                                            <input className='input-edit-stud-profile' name='country' onChange={handleChange} value={formData.country || ''} />
                                        </td>
                                        <td>
                                            <p>Postal Code</p>
                                            <input className='input-edit-stud-profile' name='postal' onChange={handleChange} value={formData.postal || ''} />
                                        </td>
                                        </tr>
                                    </table>
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