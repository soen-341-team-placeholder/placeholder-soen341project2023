import React, { useEffect, useState } from "react";
import "../styles/Job.css";
import EditPopup from "./popups/EditPopup";
import { FaEllipsisV } from "react-icons/fa";
import axios from "axios";
import Cookies from "universal-cookie";
import * as fn from "../components/Function";
import { stringify } from "querystring";
import { FaPlay } from "react-icons/fa";

const cookies = new Cookies();

export default function Job({
  companyName,
  title,
  location,
  salary,
  description,
  postingId,
  status,
}) {
  const [buttonMenu, setButtonMenu] = useState(false);
  const [userType, setUserType] = useState("student");
  const [editPopup, setEditPopup] = useState(false);
  const userId = cookies.get("userId");

  useEffect(() => {
    axios
      .get("http://localhost:4000/users/" + userId, {
        headers: {
          authorization: `Bearer ${cookies.get("accessToken")}`,
        },
      })
      .then((res) => {
        setUserType(res.data.userType);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // added code for Apply button popup form
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleApplyClick = () => {
    fn.getPosting(postingId).then((posting) => {
      const alreadyApplied = (() => {
        return (
          posting.pendingApplicantsIds.includes(userId) ||
          posting.acceptedApplicantIds.includes(userId) ||
          posting.rejectedApplicantIds.includes(userId) ||
          posting.interviewApplicantIds.includes(userId)
        );
      })();

      if (!alreadyApplied) {
        posting.pendingApplicantsIds.push(userId);
        fn.fancyConfirmationPopup("Applied successfully!");
        fn.updatePosting(postingId, posting);
      } else {
        fn.fancyPopup("You have already applied to this posting!");
      }
      setButtonMenu(!buttonMenu);
    });
  };

  return (
    <div className="post-container">
      <div className="logo">
        {userType === "employer" ? (
          <>
            <FaPlay style={{ fontSize: "3em", color: "white" }} />
          </>
        ) : (
          <>
            <p>Status: {status}</p>
          </>
        )}
      </div>
      <div className="part1">
        <div className="company">
          <span className="cname">{companyName}</span>
        </div>
        <div className="title-position">{title}</div>
        <div className="details">
          <span>${salary}/h</span>
          <span>&nbsp;•&nbsp;</span>
          <span>Location: {location}</span>
        </div>
      </div>
      <div className="part2">
        <span className="description">{description}</span>
      </div>
      <div className="posting-button">
        <FaEllipsisV
          className="button-menu"
          style={{ color: "black" }}
          onClick={() => setButtonMenu(!buttonMenu)}
        />
        {buttonMenu && (
          <div className="dropdown-menu">
            {userType === "employer" ? (
              <>
                <ul className="dropdown-list">
                  <li
                    className="dropdown-button"
                    onClick={() => setEditPopup(true)}
                  >
                    Edit
                  </li>
                  <li
                    className="dropdown-button"
                    onClick={() => fn.deletePosting(postingId)}
                  >
                    Delete
                  </li>
                  <EditPopup
                    trigger={editPopup}
                    setTrigger={setEditPopup}
                    postingId={postingId}
                  ></EditPopup>
                </ul>
              </>
            ) : (
              <>
                <div>
                  {showConfirmation && (
                    <div
                      style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "green",
                        padding: "20px",
                        borderRadius: "10%",
                      }}
                    >
                      <h2>Application sent!</h2>
                    </div>
                  )}
                </div>
                <ul className="dropdown-list">
                  <li className="dropdown-button" onClick={handleApplyClick}>
                    Apply
                  </li>
                  <li className="dropdown-button">Save</li>
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
