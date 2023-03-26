import React, { useEffect, useState } from "react";
import Job from "../components/Job";
import '../styles/ViewPostings.css';

import * as fn from '../components/Function';

export default function ViewPostings(props) {
      const { isLoggedIn, cookies, darkMode} = props;
    const [postings, setPostings] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        const data = await fn.getPostings();
        setPostings(data);
    }
    fetchData();
}, []);

return (
    <>
        <span className="new-post">New Post</span>
        <div className="jobs">
            {postings.map((posting) => (
                <Job
                    title={posting.title}
                    description={posting.description}
                    location={posting.location}
                    salary={posting.salary}
                />
            ))}
        </div>
    </>
);
            }