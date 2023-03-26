import React, { useEffect, useState } from "react";
import Job from "../components/Job";
import "../styles/ViewPostings.css";
import PostingPopup from "../components/PostingPopup";
import * as fn from "../components/Function";

export default function ViewPostings(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [userType, setUserType] = useState("student");
  const { isLoggedIn, cookies, darkMode } = props;
  const [postings, setPostings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fn.getPostings();
      setPostings(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fn.fetchUserProfile();
        setUserType(res.data.userType);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
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
      <PostingPopup trigger={buttonPopup} setTrigger={setButtonPopup} />
      <div className="jobs">
        {postings.map((posting) => (
          <Job
            key={posting._id}
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
