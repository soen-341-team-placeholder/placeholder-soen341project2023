import React, { useEffect, useState } from 'react';
import axios from "axios";
import Cookies from "universal-cookie";
import WorkExp from './WorkExp';
import Education from './Education';
import StudProfile from './StudProfile';


function Student({ userId }) {

    const cookies = new Cookies();

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

    return (
        <div>
            <div>
                <React.Fragment>
                    <StudProfile
                        user={user}
                        userId={userId}
                    />
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
        </div>
    );
}

export default Student;