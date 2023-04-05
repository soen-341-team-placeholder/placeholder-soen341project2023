import React, { useEffect, useState } from "react";
import Job from "../components/Job";
import "../styles/ViewPostings.css";
import PostingPopup from "../components/PostingPopup";
import * as fn from "../components/Function";
import axios from "axios";

export default function ViewPostings(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [userType, setUserType] = useState("student");
  const { isLoggedIn, cookies, darkMode } = props;
  const [postings, setPostings] = useState([]);
  const [applicationStatuses, setApplicationStatuses] = useState([]);

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
        const res = await fn.fetchUserProfile(cookies.get('userId'));
        setUserType(res.userType);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    async function getStudentApplicationStatus() {
      try {
        const response = await axios.get("http://localhost:4000/postings", {
          headers: {
            Authorization: `Bearer ${cookies.get("accessToken")}`,
          },
        });
        setApplicationStatuses(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    getStudentApplicationStatus();
  }, []);

  function getUserStatus(postingId) {
    const status = applicationStatuses.find(
      (status) => status.postingId === postingId
    );
    return status ? status.status : "Want to Apply?";
  }

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
            status={getUserStatus(posting._id)}
          />
        ))}
      </div>
    </>
  );
}
