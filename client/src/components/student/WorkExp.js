import '../../styles/edit_student/WorkExp.css';
import React, { useState } from 'react';

function WorkExp() {
    
    const [showEdDiv, setShowEdDiv] = useState(true);

    const toggleDiv = () => { // toggle between static div and editable div
        setShowEdDiv(!showEdDiv);
    };

    const [formData, setFormData] = useState([
        { position: '', companyName: '', startDate: '', endDate: '' }
    ])

    const handleFormChange = (event, index) => {
        let data = [...formData];
        data[index][event.target.name] = event.target.value; // to add info to data array
        setFormData(data); // to type in the box
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
            position: '',
            companyName: '',
            startDate: '',
            endDate: ''
        }
        setFormData([...formData, object]) // iterate over formFields so that current object doesn't override previous object
    }

    const removeFields = (index) => {
        let data = [...formData];
        data.splice(index, 1)
        setFormData(data)
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
                        {formData.map((form, index) => {
                            return (
                                <tr key={index}>
                                    <td className='tdWorkExp'>{form.position}</td>
                                    <td className='tdWorkExp'>{form.companyName}</td>
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
                                        {formData.map((form, index) => {
                                            return (
                                                <div key={index}>
                                                    <input
                                                        className='input-edit-stud-profile'
                                                        name='position'
                                                        placeholder='Position'
                                                        onChange={event => handleFormChange(event, index)}
                                                        value={form.position}
                                                    />
                                                    <br />
                                                    <input
                                                        className='input-edit-stud-profile'
                                                        name='companyName'
                                                        placeholder='Company Name'
                                                        onChange={event => handleFormChange(event, index)}
                                                        value={form.companyName}
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