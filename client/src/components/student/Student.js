import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WorkExp from './WorkExp';
import Education from './Education';
import StudProfile from './StudProfile';
import * as fn from "../Function";

function Student(props) {
  const { isLoggedIn, cookies, darkMode } = props;
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const user = await fn.fetchUserProfile(userId);
      setUser(user);
    }
    fetchData();
  }, [userId]);

  return (
    <div>
      <div>
        <React.Fragment>
          <StudProfile user={user} userId={userId} cookies={cookies} />
        </React.Fragment>
      </div>
      <br /> <br /> <br />
      <div className="inner">
        <React.Fragment>
          <WorkExp />
        </React.Fragment>
      </div>
      <br /> <br /> <br />
      <div className="inner">
        <React.Fragment>
          <Education />
        </React.Fragment>
      </div>
      <br /> <br /> <br />
    </div>
  );
}

export default Student;
