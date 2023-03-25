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
                  <li className="dropdown-button">Apply</li>
                  <li className="dropdown-button">Save</li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
