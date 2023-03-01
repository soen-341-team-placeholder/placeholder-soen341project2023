import React from 'react';
import WorkExp from './WorkExp';
import Education from './Education';
import Skills from './Skills';
import StudProfile from './StudProfile';

function Student() {
  return (
    <div>
      <div>
        <React.Fragment>
          <StudProfile />
        </React.Fragment>
      </div>
      <br /> <br /> <br />
      <div className='inner'>
        <React.Fragment>
          <WorkExp />
        </React.Fragment>
      </div>
      <br /> <br /> <br />
      <div className='inner'>
        <React.Fragment>
          <Education />
        </React.Fragment>
      </div>
      <br /> <br /> <br />
      <div className='inner'>
        <React.Fragment>
          <Skills />
        </React.Fragment>
      </div>
      <br /> <br /> <br />
    </div>
  );
}

export default Student;