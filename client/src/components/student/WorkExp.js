import '../../styles/edit_student/WorkExp.css';
import React, { useState } from 'react';

function WorkExp() {
    const [showEdDiv, setShowEdDiv] = useState(true);

    const toggleDiv = () => { // toggle between static div and editable div
        setShowEdDiv(!showEdDiv);
    };

    const [formFields, setFormFields] = useState([
        { title: '', employer: '', startDate: '', endDate: '' }
    ])

    const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value; // to add info to data array
        setFormFields(data); // to type in the box
    }

    const submit = (e) => {
        e.preventDefault(); // prevent the page from refreshing itself when remove button is clicked
    }

    const handleSave = (e) => {
        submit(e);
        toggleDiv();
    }

    const addFields = () => {
        let object = {
            title: '',
            employer: '',
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
                            <th className='tdWorkExp'><h2>Experience</h2> <hr /></th>
                            <td className='tdWorkExp'><button onClick={toggleDiv} className='btn'>Edit</button></td>
                        </tr>
                        <tr>
                            <th>Position</th>
                            <th>Company name</th>
                            <th>From</th>
                            <th>To</th>
                        </tr>
                        {formFields.map((form, index) => {
                            return (
                                <tr key={index}>
                                    <td className='tdWorkExp'>{form.title}</td>
                                    <td className='tdWorkExp'>{form.employer}</td>
                                    <td className='tdWorkExp'>{form.startDate}</td>
                                    <td className='tdWorkExp'>{form.endDate}</td>
                                </tr>
                            );
                        })}
                    </table>
                </div>
            ) : (
                <div className='show-edit-work-exp-div'>
                    <table className='static-stud-prof-table'>
                        <tr>
                            <th className='tdWorkExp'><h2>Experience</h2> <hr /></th>
                        </tr>
                        <tr>
                            <td className='tdWorkExp'>
                                <div id='edDiv'>
                                    <form onSubmit={submit}>
                                        <button onClick={addFields} className='btn'>Add</button>
                                        <button onClick={handleSave} className='btn'>Save</button>
                                        <br />
                                        {formFields.map((form, index) => {
                                            return (
                                                <div key={index}>
                                                    <input
                                                        className='input-edit-stud-profile'
                                                        name='title'
                                                        placeholder='Title'
                                                        onChange={event => handleFormChange(event, index)}
                                                        value={form.title}
                                                    />
                                                    <br />
                                                    <input
                                                        className='input-edit-stud-profile'
                                                        name='employer'
                                                        placeholder='Company Name'
                                                        onChange={event => handleFormChange(event, index)}
                                                        value={form.employer}
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

export default WorkExp;