import '../../styles/edit_student/WorkExp.css';
import { useState } from 'react';

function Education() {
    const [formFields, setFormFields] = useState([
    {institutionName: '', degree: '', fromDate: '', toDate: ''}
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
        fromDate: '',
        toDate: ''
    }
    setFormFields([...formFields, object]) // iterate over formFields so that current object doesn't override previous object
    }

    const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
    }

    const editFields = () => {
    let x = document.getElementById('expDiv');
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
                        <td className='td-stud'><h2>Education</h2></td>
                        <td className='td-stud'><button onClick={editFields} className='btn'>Edit</button></td>
                    </tr>
                    <tr>
                        <td className='td-stud'>
                            <div id='expDiv'>
                                <form onSubmit={submit}>
                                    <button onClick={addFields} className='btn'>Add</button>
                                    <button onClick={submit} className='btn'>Save</button>
                                    <br />
                                    {formFields.map((form, index) =>  {
                                    return (
                                        <div key={index}>
                                            <input
                                                name='institutionName'
                                                placeholder='Institution Name'
                                                onChange={event => handleFormChange(event, index)}
                                                value={form.institutionName}
                                                className='input-stud'
                                            />
                                            <br />
                                            <input
                                                name='degree'
                                                placeholder='Degree'
                                                onChange={event => handleFormChange(event, index)}
                                                value={form.degree}
                                                className='input-stud'
                                            />
                                            <br />
                                            <input 
                                                name='fromDate'
                                                placeholder='From (mm/yyyy)'
                                                onChange={event => handleFormChange(event, index)}
                                                value={form.fromDate}
                                                className='input-stud'
                                            />
                                            <br />
                                            <input 
                                                name='toDate'
                                                placeholder='To (mm/yyyy)'
                                                onChange={event => handleFormChange(event, index)}
                                                value={form.toDate}
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

export default Education;