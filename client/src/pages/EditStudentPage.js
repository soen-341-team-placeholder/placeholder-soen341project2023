import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Cookies from "universal-cookie";
import Student from '../components/student/Student';
import {useParams} from 'react-router-dom';

const cookies = new Cookies();

function EditStudentPage() {

    const userId = useParams().userId;

    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/users/' + userId, {
            headers: {
                authorization: `Bearer ${cookies.get('accessToken')}`
            }
        }).then((res) => {
            setUser(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    return (<div>
        <React.Fragment>
            <Student user={user}/>
        </React.Fragment>
    </div>);
}

export default EditStudentPage;
