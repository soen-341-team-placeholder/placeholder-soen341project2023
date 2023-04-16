import React, { useEffect, useState } from "react";
import Job from "../components/Job";
import "../styles/ViewPostings.css";
import PostingPopup from "../components/popups/PostingPopup";
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
      console.log(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fn.fetchUserProfile(cookies.get("userId"));
        setUserType(res.userType);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    async function getStudentApplicationStatus() {
      const response = await axios.get("http://localhost:4000/postings", {
        headers: {
          Authorization: `Bearer ${cookies.get("accessToken")}`,
        },
      });
  
      const postings = response.data;
  
      const userId = cookies.get("userId");
      const updatedApplicationStatuses = [];
  
      postings.forEach((posting) => {
        const {
          pendingApplicantsIds,
          interviewApplicantIds,
          acceptedApplicantIds,
          rejectedApplicantIds,
        } = posting;
  
        let status = "Apply?";
  
        if (pendingApplicantsIds.includes(userId)) {
          status = "Application Pending";
        } else if (interviewApplicantIds.includes(userId)) {
          status = "Selected for Interview";
        } else if (acceptedApplicantIds.includes(userId)) {
          status = "Accepted";
        } else if (rejectedApplicantIds.includes(userId)) {
          status = "Rejected";
        }
        
        updatedApplicationStatuses.push({ postingId: posting._id, status });
      });
  
      setApplicationStatuses(updatedApplicationStatuses);
    }
    getStudentApplicationStatus();
  }, []); 
  
  function getUserStatus(postingId) {
    const statusObj = applicationStatuses.find(status => status.postingId === postingId);
    return statusObj?.status || "Apply?";
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
            companyName={posting.company.companyName}
            title={posting.title}
            description={posting.description}
            location={posting.location}
            salary={posting.salary}
            postingId={posting._id}
            employerId={posting.employerId}
            status={getUserStatus(posting._id)}
          />
        ))}
      </div>
    </>
  );
}
