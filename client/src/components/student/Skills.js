import '../../styles/edit_student/WorkExp.css';
import { useState } from 'react';

function Skills() {
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
        if (x.style.display === 'none') {
            x.style.display = 'block';
        } else {
            x.style.display = 'none';
        }
    }

    return (
        <div className="App">
            <div className='main'>
                <table className='table-stud'>
                    <tr>
                        <td className='td-stud'><h2>Skills</h2></td>
                        <td className='td-stud'><button onClick={editFields} className='btn'>Edit</button></td>
                    </tr>
                    <tr>
                        <td className='td-stud'>
                            <div id='skillDiv'>
                                <form onSubmit={submit}>
                                    <button onClick={addFields} className='btn'>Add</button>
                                    <button onClick={submit} className='btn'>Save</button>
                                    <br />
                                    {formFields.map((form, index) =>  {
                                    return (
                                        <div key={index}>
                                            <input
                                                name='skill'
                                                placeholder='Skill'
                                                onChange={event => handleFormChange(event, index)}
                                                value={form.skill}
                                                className='input-stud'
                                            />
                                            <br />
                                            <input
                                                name='placeObtained'
                                                placeholder='Education or Work Experience?'
                                                onChange={event => handleFormChange(event, index)}
                                                value={form.placeObtained}
                                                className='input-stud'
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
        </div>
    );
}

export default Skills;