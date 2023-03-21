import '../../styles/edit_student/WorkExp.css';
import React, { useState } from 'react';

function Skills() {
    const [showEdDiv, setShowEdDiv] = useState(true);

    const toggleDiv = () => { // toggle between static div and editable div
        setShowEdDiv(!showEdDiv);
    };

    const handleSave = (e) => {
        submit(e);
        toggleDiv();
    }

    const [formFields, setFormFields] = useState([
        {skill: '', placeObtained: ''}
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
            skill: '',
            placeObtained: ''
        }
        setFormFields([...formFields, object]) // iterate over formFields so that current object doesn't override previous object
    }

    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
    }

    const editFields = () => {
        let x = document.getElementById('skillDiv');
        if (x.style.display === 'block') {
            x.style.display = 'none';
        } else {
            x.style.display = 'block';
        }
    }

    return (
        <div className="App">
            {showEdDiv ? (
                <div className='show-static-work-exp-div'>
                    <table className='static-stud-prof-table'>
                        <tr>
                            <td className='tdWorkExp'><h2>Skills</h2> <hr /></td>
                            <td className='tdWorkExp'><button onClick={toggleDiv} className='btn'>Edit</button></td>
                        </tr>
                        <tr>
                            <td className='tdWorkExp'>React JS</td>
                            <td className='tdWorkExp'>Education</td>
                        </tr>
                    </table>
                 </div>
            ) : (
                <div className='show-edit-work-exp-div'>
                    <table className='static-stud-prof-table'>
                        <tr>
                            <td className='tdWorkExp'><h2>Skills</h2> <hr /></td>
                            <td className='tdWorkExp'><button onClick={editFields} className='btn'>Edit</button></td>
                        </tr>
                        <tr>
                            <td className='tdWorkExp'>
                                <div id='skillDiv'>
                                    <form onSubmit={submit}>
                                        <button onClick={addFields} className='btn'>Add</button>
                                        <button onClick={handleSave} className='btn'>Save</button>
                                        <br />
                                        {formFields.map((form, index) =>  {
                                        return (
                                            <div key={index}>
                                                <input
                                                    className='input-edit-stud-profile' 
                                                    name='skill'
                                                    placeholder='Skill'
                                                    onChange={event => handleFormChange(event, index)}
                                                    value={form.skill}
                                                />
                                                <br />
                                                <input
                                                    className='input-edit-stud-profile' 
                                                    name='placeObtained'
                                                    placeholder='Education or Work Experience?'
                                                    onChange={event => handleFormChange(event, index)}
                                                    value={form.placeObtained}
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

export default Skills;