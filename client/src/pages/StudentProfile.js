import React from 'react';
import Student from '../components/student/Student';
import { useParams } from 'react-router-dom';

function StudentProfile() {

    const userId = useParams().userId;

    return (<div>
        <React.Fragment>
            <Student userId={userId} />
        </React.Fragment>
    </div>);
}

export default StudentProfile;
