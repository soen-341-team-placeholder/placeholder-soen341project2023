import React from 'react';
import Navbar from '../components/student/Navbar';
import Student from '../components/student/Student';
import Home from '../components/student/Home';
import Jobs from '../components/student/Jobs';
import Inbox from '../components/student/Inbox';

function EditStudentPage() {

  let component
  switch (window.location.pathname) {
    case"/Profile":
      component = <Student />
      break
    case"/Home":
      component = <Home />
      break
    case"/Jobs":
      component = <Jobs />
      break
    case"/Inbox":
      component = <Inbox />
      break
    default:
      component = <Student />
  }

  return (
    <div>
      <React.Fragment>
        <Navbar />
        {component}
      </React.Fragment>
  </div>
  );
}

export default EditStudentPage;
