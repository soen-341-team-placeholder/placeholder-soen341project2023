import React, {useState, useEffect} from "react";
import Cookies from "universal-cookie";
import PostingTab from "../components/applicants/PostingTab";
import * as fn from '../components/Function'

export default function Applicants() {

    const [pendingApplicationsList, setPendingApplicationsList] = useState([]);
    const [interviewApplicationsList, setInterviewApplicationsList] = useState([]);
    const [acceptedApplicationsList, setAcceptedApplicationsList] = useState([]);

    const cookies = new Cookies();

    const fetchApplications = async () => {
        console.log('fetchApplications')
        setPendingApplicationsList([])
        setInterviewApplicationsList([])
        setAcceptedApplicationsList([])

        const response = await fn.getPostingsByEmployerId(cookies.get('userId'))

        for (const posting of response) {
            const processStudent = async (studentId, applicationType) => {
                const student = await fn.fetchUserProfile(studentId)

                const applicationData = {
                    firstName: student.firstName,
                    lastName: student.lastName,
                    studentId: studentId,
                    biography: student.biography,
                    postingTitle: posting.title,
                    postingId: posting._id
                };

                if (applicationType === 'pending') {
                    setPendingApplicationsList(oldArray => [...oldArray, applicationData])
                } else if (applicationType === 'interview') {
                    setInterviewApplicationsList(oldArray => [...oldArray, applicationData])
                } else if (applicationType === 'accepted') {
                    setAcceptedApplicationsList(oldArray => [...oldArray, applicationData])
                }
            }

            if (posting.pendingApplicantsIds) {
                posting.pendingApplicantsIds.forEach(
                    studentId => processStudent(studentId, 'pending'))
            }

            if (posting.interviewApplicantIds) {
                posting.interviewApplicantIds.forEach(
                    studentId => processStudent(studentId, 'interview'))
            }

            if (posting.acceptedApplicantIds) {
                posting.acceptedApplicantIds.forEach(
                    studentId => processStudent(studentId, 'accepted'))
            }
        }
    }

    const updateApplicationStatus = (studentId, oldStatus, newStatus) => {
        if (oldStatus === newStatus) return
        console.log('updateApplicationStatus')
        let applicationData;

        // Remove student from the old status list
        if (oldStatus === 'pending') {
            applicationData = pendingApplicationsList.find(application => application.studentId === studentId)
            setPendingApplicationsList(pendingApplicationsList.filter(application => application.studentId !== studentId));
        } else if (oldStatus === 'interview') {
            applicationData = interviewApplicationsList.find(application => application.studentId === studentId)
            setInterviewApplicationsList(interviewApplicationsList.filter(application => application.studentId !== studentId));
        } else if (oldStatus === 'accepted') {
            applicationData = acceptedApplicationsList.find(application => application.studentId === studentId)
            setAcceptedApplicationsList(acceptedApplicationsList.filter(application => application.studentId !== studentId));
        }

        if (newStatus === 'pending') {
            setPendingApplicationsList([...pendingApplicationsList, applicationData]);
        } else if (newStatus === 'interview') {
            setInterviewApplicationsList([...interviewApplicationsList, applicationData]);
        } else if (newStatus === 'accepted') {
            setAcceptedApplicationsList([...acceptedApplicationsList, applicationData]);
        }
    };


    useEffect(() => {
        console.log('reload')
        fetchApplications()
    }, []);

    return (<div style={{
        display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '5%'
    }}>
        <PostingTab
            pendingApplicationsList={pendingApplicationsList}
            interviewApplicationsList={interviewApplicationsList}
            acceptedApplicationsList={acceptedApplicationsList}
            updateApplicationStatus={updateApplicationStatus}
        />
    </div>);
}