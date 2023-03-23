import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Job from "../components/Job";
import axios from "axios";
import '../styles/ViewPostings.css';
import PostingPopup from "../components/PostingPopup";

const cookies = new Cookies();

export default function ViewPostings() {
    const [buttonPopup, setButtonPopup] = useState(false);
    const [postings, setPostings] = useState([]);
    const [userType, setUserType] = useState('student');
    var bool;

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
                console.log(res)
            }).catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:4000/users/' + cookies.get('userId'),
            {
                headers:
                {
                    authorization: `Bearer ${cookies.get('accessToken')}`
                }
            })
            .then((res) => {
                console.log(res)
                setUserType(res.data.userType);
                console.log(userType);
                {userType === "student" ? bool = false : bool = true}
                console.log(bool);
            }).catch((err) => {
                console.log(err);
            });
    }, []);
            console.log("I WANNA VERIFY IT");
            console.log(userType);
            console.log(userType === "employer");
        
    return (
        <>
            {userType === "employer" ? <span className="new-post" onClick={()=> setButtonPopup(true)}>New Post</span> : <p>Fam the condition works in reverse</p> }
            <PostingPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
            </PostingPopup>
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