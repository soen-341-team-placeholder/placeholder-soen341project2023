import React, { useEffect, useState } from "react";
import Job from "../components/Job";
import '../styles/ViewPostings.css';
import PostingPopup from "../components/PostingPopup";


import * as fn from '../components/Function';


export default function ViewPostings(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [userType, setUserType] = useState("student");
  const { isLoggedIn, cookies, darkMode} = props;
    const [postings, setPostings] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        const data = await fn.getPostings();
        setPostings(data);
    }
    fetchData();
}, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/users/" + cookies.get("userId"), {
        headers: {
          authorization: `Bearer ${cookies.get("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUserType(res.data.userType);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {userType === "employer" ? (
        <span className="new-post" onClick={() => setButtonPopup(true)}>
          New Post
        </span>
      ) : (
        <>
          <br />
          <br />
          <br />
        </>
      )}
      <PostingPopup
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
      ></PostingPopup>
      <div className="jobs">
        {postings.map((posting) => (
          <Job
            title={posting.title}
            description={posting.description}
            location={posting.location}
            salary={posting.salary}
            postingId={posting._id}
          />
        ))}
      </div>
    </>
  );
}
