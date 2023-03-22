import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Job from "../components/Job";
import axios from "axios";
import '../styles/ViewPostings.css';

const cookies = new Cookies();

export default function ViewPostings() {

    const [postings, setPostings] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/postings',
            {
                headers:
                {
                    authorization: `Bearer ${cookies.get('accessToken')}`
                }
            })
            .then((res) => {
                setPostings(res.data);
            }).catch((err) => {
                console.log(err);
            });
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