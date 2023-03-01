import '../../styles/edit_student/WorkExp.css';
import { useState } from 'react';

function WorkExp() {
    const [formFields, setFormFields] = useState([
        {title: '', employer: '', fromDate: '', toDate: ''}
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
        title: '',
        employer: '',
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
    let x = document.getElementById('edDiv');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
    }

    return (
        <div className="App">
            <table className='table-stud'>
                <tr>
                    <td className='td-stud'><h2>Experience</h2></td>
                    <td className='td-stud'><button onClick={editFields} className='btn'>Edit</button></td>
                </tr>
                <tr>
                    <td className='td-stud'>
                        <div id='edDiv'>
                            <form onSubmit={submit}>
                                <button onClick={addFields} className='btn'>Add</button>
                                <button onClick={submit} className='btn'>Save</button>
                                <br />
                                {formFields.map((form, index) =>  {
                                return (
                                    <div key={index}>
                                        <input
                                            name='title'
                                            placeholder='Title'
                                            onChange={event => handleFormChange(event, index)}
                                            value={form.title}
                                            className='input-stud'
                                        />
                                        <br />
                                        <input
                                            name='employer'
                                            placeholder='Company Name'
                                            onChange={event => handleFormChange(event, index)}
                                            value={form.employer}
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
    );
}

export default WorkExp;