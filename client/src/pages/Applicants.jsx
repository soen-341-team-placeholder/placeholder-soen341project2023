import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import PostingTab from "../components/applicants/PostingTab";
import * as fn from "../components/Function";

export default function Applicants(props) {
  const { isLoggedIn, cookies } = props;
  const [pendingApplicationsList, setPendingApplicationsList] = useState([]);
  const [interviewApplicationsList, setInterviewApplicationsList] = useState(
    []
  );
  const [acceptedApplicationsList, setAcceptedApplicationsList] = useState([]);

  const fetchApplications = async () => {
    setPendingApplicationsList([]);
    setInterviewApplicationsList([]);
    setAcceptedApplicationsList([]);

    try {
      const response = await fn.getPostingsByEmployerId(cookies.get("userId"));

      for (const posting of response) {
        const processStudent = async (studentId, applicationType) => {
          try {
            const student = await fn.fetchUserProfile(studentId);

            const applicationData = {
              firstName: student.firstName,
              lastName: student.lastName,
              studentId: studentId,
              biography: student.biography,
              postingTitle: posting.title,
              postingId: posting._id,
            };

            if (applicationType === "pending") {
              setPendingApplicationsList((oldArray) => [
                ...oldArray,
                applicationData,
              ]);
            } else if (applicationType === "interview") {
              setInterviewApplicationsList((oldArray) => [
                ...oldArray,
                applicationData,
              ]);
            } else if (applicationType === "accepted") {
              setAcceptedApplicationsList((oldArray) => [
                ...oldArray,
                applicationData,
              ]);
            }
          } catch (error) {
            console.error(error);
          }
        };

        if (posting.pendingApplicantsIds) {
          await Promise.all(
            posting.pendingApplicantsIds.map((studentId) =>
              processStudent(studentId, "pending")
            )
          );
        }

        if (posting.interviewApplicantIds) {
          await Promise.all(
            posting.interviewApplicantIds.map((studentId) =>
              processStudent(studentId, "interview")
            )
          );
        }

        if (posting.acceptedApplicantIds) {
          await Promise.all(
            posting.acceptedApplicantIds.map((studentId) =>
              processStudent(studentId, "accepted")
            )
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateApplicationStatus = (studentId, oldStatus, newStatus) => {
    if (oldStatus === newStatus) return;
    console.log("updateApplicationStatus");
    let applicationData;

    // Remove student from the old status list
    if (oldStatus === "pending") {
      applicationData = pendingApplicationsList.find(
        (application) => application.studentId === studentId
      );
      setPendingApplicationsList(
        pendingApplicationsList.filter(
          (application) => application.studentId !== studentId
        )
      );
    } else if (oldStatus === "interview") {
      applicationData = interviewApplicationsList.find(
        (application) => application.studentId === studentId
      );
      setInterviewApplicationsList(
        interviewApplicationsList.filter(
          (application) => application.studentId !== studentId
        )
      );
    } else if (oldStatus === "accepted") {
      applicationData = acceptedApplicationsList.find(
        (application) => application.studentId === studentId
      );
      setAcceptedApplicationsList(
        acceptedApplicationsList.filter(
          (application) => application.studentId !== studentId
        )
      );
    }

    if (newStatus === "pending") {
      setPendingApplicationsList([...pendingApplicationsList, applicationData]);
    } else if (newStatus === "interview") {
      setInterviewApplicationsList([
        ...interviewApplicationsList,
        applicationData,
      ]);
    } else if (newStatus === "accepted") {
      setAcceptedApplicationsList([
        ...acceptedApplicationsList,
        applicationData,
      ]);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: "5%",
      }}
    >
      <PostingTab
        pendingApplicationsList={pendingApplicationsList}
        interviewApplicationsList={interviewApplicationsList}
        acceptedApplicationsList={acceptedApplicationsList}
        updateApplicationStatus={updateApplicationStatus}
      />
    </div>
  );
}
