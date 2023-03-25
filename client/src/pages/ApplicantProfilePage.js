import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import "../styles/styles.css";
import * as fn from "../components/Function";

const CandidateCard = ({ children }) => (
  <div className="candidate-card">
    {children}
  </div>
);

const CandidateCardHeader = ({ children }) => (
  <div className="candidate-card-header">{children}</div>
);

const CandidateCardBody = ({ children }) => <div className="candidate-card-body">{children}</div>;

export default function ApplicantProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const user = await fn.fetchUserProfile(userId);
      setUser(user);
    }
    fetchData();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="applicant_profile_container">
      <div id="pdf-download">
        <CandidateCard>
          <img
            src="/placeholder_profile_picture.png"
            alt="Profile Picture"
            id="profile-picture"
          />
          <CandidateCardHeader>
            <h1>{`${user.firstName} ${user.lastName}`}</h1>
            <p>{user.email}</p>
          </CandidateCardHeader>
          <CandidateCardBody>
            <p>{user.biography}</p>
            <button className = 'standard-btn' onClick={() => fn.downloadCV(user)}>Download CV</button>
          </CandidateCardBody>
        </CandidateCard>

        <CandidateCard>
          <CandidateCardHeader>
            <h2>Work Experience</h2>
          </CandidateCardHeader>
          <CandidateCardBody>
            {user.workExperience.map((exp) => (
              <div key={exp.position}>
                <h3>
                  {exp.position} at {exp.company}
                </h3>
                <p>{`${exp.startDate} - ${exp.endDate}`}</p>
                <br></br>
              </div>
            ))}
          </CandidateCardBody>
        </CandidateCard>

        <CandidateCard>
          <CandidateCardHeader>
            <h2>Education</h2>
          </CandidateCardHeader>
          <CandidateCardBody>
            {user.education.map((edu) => (
              <div key={edu.degree}>
                <h3>
                  {edu.degree} at {edu.school}
                </h3>
                <p>{`${edu.startDate} - ${edu.endDate}`}</p>
                <br></br>
              </div>
            ))}
          </CandidateCardBody>
        </CandidateCard>
      </div>
    </div>
  );
}
