import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import "../styles/Job.css";
import EditPopup from "../components/EditPopup";
import { FaEllipsisV } from "react-icons/fa";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Job({
  title,
  location,
  salary,
  description,
  postingId,
}) {
  const [buttonMenu, setButtonMenu] = useState(false);
  const [userType, setUserType] = useState("student");
  const [editPopup, setEditPopup] = useState(false);

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

  console.log(title, location, salary, description);

  // added code for Apply button popup form
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleApplyClick = () => {
    setShowModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here, e.g. sending data to server
    setShowModal(false);
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 2000);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  // added code for Apply button popup form ends here

  return (
    <div className="post-container">
      <div className="logo">
        <FaPlay style={{ fontSize: "3em", color: "white" }} />
        {/* <img src="/images/postIcon.jpg" alt="img"></img> */}
      </div>
      <div className="part1">
        <div className="company">
          <span className="cname">"Company name"</span>
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
            <ul className="dropdown-list">
              {userType === "employer" ? (
                <>
                  <li
                    className="dropdown-button"
                    onClick={() => setEditPopup(true)}
                  >
                    Edit
                  </li>
                  <li className="dropdown-button">Delete</li>
                  <EditPopup
                    trigger={editPopup}
                    setTrigger={setEditPopup}
                    postingId={postingId}
                  ></EditPopup>
                </>
              ) : (
                <>
                  <li className="dropdown-button" onClick={handleApplyClick}>Apply</li>
                  <li className="dropdown-button">Save</li>
                </>
              )}
            </ul>
            {/* added code for Apply button popup form */}
            <div>
              {showModal && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#FF5555', padding: '20px', borderRadius: '10%' }}>
                  <h2>Apply</h2>
                  <form onSubmit={handleSubmit}>
                    <label>
                      Upload Resume: &nbsp;
                      <input type="file" name="resume" accept=".pdf,.doc,.docx" required />
                    </label>
                    <br /><br />
                    <label>
                      Upload Cover Letter: &nbsp;
                      <input type="file" name="cover-letter" accept=".pdf,.doc,.docx" required />
                    </label>
                    <br /><br />
                    <label>
                      Upload Transcript: &nbsp;
                      <input type="file" name="transcript" accept=".pdf,.doc,.docx" required />
                    </label>
                    <br /><br />
                    <button className="dropdown-button" type="submit">Submit</button>
                  </form>
                  <button className="dropdown-button" onClick={handleModalClose}>Close</button>
                </div>
              )}
              {showConfirmation && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'green', padding: '20px', borderRadius: '10%' }}>
                  <h2>Application sent!</h2>
                </div>
              )}
            </div>
            {/* added code for Apply button popup ends here */}
          </div>
        )}
      </div>
    </div>
  );
}
