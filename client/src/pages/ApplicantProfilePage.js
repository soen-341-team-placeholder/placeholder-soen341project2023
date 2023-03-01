import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../styles/styles.css";

import data from "./tempData.json";


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
    const userData = data.find((user) => user.userId === parseInt(userId));
    setUser(userData);
  }, [userId]);

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add user info to the PDF
    doc.text(`Name: ${user.firstName} ${user.lastName}`, 10, 10);
    doc.text(`Email: ${user.email}`, 10, 20);
    doc.text(`Biography: ${user.biography}`, 10, 30);

    // Add work experience to the PDF
    const workExpData = user.workExperience.map((exp) => [exp.position, exp.company, `${exp.startDate} - ${exp.endDate}`]);
    doc.autoTable({
      startY: 50,
      head: [["Position", "Company", "Dates"]],
      body: workExpData,
    });

    // Add education to the PDF
    const educationData = user.education.map((edu) => [edu.degree, edu.school, `${edu.startDate} - ${edu.endDate}`]);
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 10,
      head: [["Degree", "School", "Dates"]],
      body: educationData,
    });

    // Save the PDF
    doc.save(`${user.firstName} ${user.lastName} CV.pdf`);
  };

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
            <button onClick={downloadPDF}>Download CV</button>
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
