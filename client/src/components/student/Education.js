import '../../styles/edit_student/WorkExp.css';
import React, { useState } from 'react';

function Education() {
    const [showEdDiv, setShowEdDiv] = useState(true);

    const toggleDiv = () => { // toggle between static div and editable div
        setShowEdDiv(!showEdDiv);
    };

    const handleSave = (e) => {
        submit(e);
        toggleDiv();
    }

    const [formFields, setFormFields] = useState([
    {institutionName: '', degree: '', startDate: '', endDate: ''}
    ])

    const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value; // to add info to data array
    setFormFields(data); // to type in the box
    }

    const submit = (e) => {
    e.preventDefault(); // prevent the page from refreshing itself when remove button is clicked
    console.log(formFields);
    }

    const addFields = () => {
    let object = {
        institutionName: '',
        degree: '',
        startDate: '',
        endDate: ''
    }
    setFormFields([...formFields, object]) // iterate over formFields so that current object doesn't override previous object
    }

    const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
    }

    return (
        <div className="exp-education-main-divs">
            {showEdDiv ? (
                <div className='show-static-work-exp-div'>
                    <table className='static-stud-prof-table'>
                        <tr>
                            <th className='tdWorkExp'><h2>Education</h2> <hr /></th>
                            <td className='tdWorkExp'><button onClick={toggleDiv} className='btn'>Edit</button></td>
                        </tr>
                        <tr>
                            <th>Institution</th>
                            <th>Degree</th>
                            <th>From</th>
                            <th>To</th>
                        </tr>
                        <tr>
                            <td className='tdWorkExp'>Concordia University</td>
                            <td className='tdWorkExp'>Bachelors in Software Engineering</td>
                            <td className='tdWorkExp'>01/2022</td>
                            <td className='tdWorkExp'>12/2025</td>
                        </tr>
                    </table>
                </div>
            ) : (
                <div className='show-edit-work-exp-div'>
                    <table className='static-stud-prof-table'>
                        <tr>
                            <th className='tdWorkExp'><h2>Education</h2> <hr /></th>
                        </tr>
                        <tr>
                            <td className='tdWorkExp'>
                                <div id='edDiv'>
                                    <form onSubmit={submit}>
                                        <button onClick={addFields} className='btn'>Add</button>
                                        <button onClick={handleSave} className='btn'>Save</button>
                                        <br />
                                        {formFields.map((form, index) =>  {
                                        return (
                                            <div key={index}>
                                                <input
                                                    className='input-edit-stud-profile' 
                                                    name='institutionName'
                                                    placeholder='Institution Name'
                                                    onChange={event => handleFormChange(event, index)}
                                                    value={form.institutionName}
                                                />
                                                <br />
                                                <input
                                                    className='input-edit-stud-profile' 
                                                    name='degree'
                                                    placeholder='Degree'
                                                    onChange={event => handleFormChange(event, index)}
                                                    value={form.degree}
                                                />
                                                <br />
                                                <input 
                                                    type='date'
                                                    className='input-edit-stud-profile' 
                                                    name='startDate'
                                                    onChange={event => handleFormChange(event, index)}
                                                    value={form.startDate}
                                                />
                                                <br />
                                                <input 
                                                    type='date'
                                                    className='input-edit-stud-profile' 
                                                    name='endDate'
                                                    onChange={event => handleFormChange(event, index)}
                                                    value={form.endDate}
                                                />
                                                <br />
                                                <button onClick={() => removeFields(index)} className='btn'>Remove</button>
                                            </div>
                                        )
                                        })}
                                    </form>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Education;