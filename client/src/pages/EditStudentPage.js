import React from 'react';
import Student from '../components/student/Student';
import { useParams } from 'react-router-dom';

function EditStudentPage() {

  const userId = useParams().userId;
  const user = {
    firstName: "Youssef",
    lastName: "Alsheghri",
    email: "youssef.alsheghri@gmail.com",
    biography: "Software Engineering Major at Concordia University",
    location: "Montreal, Canada"
  }

  return (
    <div>
      <React.Fragment>
        <Student user={user} />
      </React.Fragment>
    </div>
  );
}

export default EditStudentPage;
