import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Job from "../components/Job";
import axios from "axios";
import "../styles/ViewPostings.css";
import PostingPopup from "../components/PostingPopup";

const cookies = new Cookies();

export default function ViewPostings() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [postings, setPostings] = useState([]);
  const [userType, setUserType] = useState("student");
  const [applicationStatuses, setApplicationStatuses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/postings", {
        headers: {
          authorization: `Bearer ${cookies.get("accessToken")}`,
        },
      })
      .then((res) => {
        setPostings(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
          status = "Pending";
        } else if (interviewApplicantIds.includes(userId)) {
          status = "Interview";
        } else if (acceptedApplicantIds.includes(userId)) {
          status = "Accepted";
        } else if (rejectedApplicantIds.includes(userId)) {
          status = "Rejected";
        }
        
        updatedApplicationStatuses.push({ postingId: posting.postingId, status });
      });

      setApplicationStatuses(updatedApplicationStatuses);
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
            status={getUserStatus(posting._id)}
          />
        ))}
      </div>
    </>
  );
}