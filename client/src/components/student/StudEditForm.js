import React, { useReducer, useState } from 'react';
import '../../styles/edit_student/StudEditForm.css';
import { Link, Routes, Route } from 'react-router-dom';
import StudProfile from './StudProfile';

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

function StudEditForm() {

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

  return (
    <div className="wrapper">
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
       <Link to='/studForm'><button type='submit' disabled={submitting}>Save</button></Link>
       <Routes>
        <Route path='/studForm' element={StudProfile} />
       </Routes>
       
      </form>
    </div>
  );
}

export default StudEditForm;