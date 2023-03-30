import React, {useState, useEffect} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import PostingTab from "../components/applicants/PostingTab";

export default function Applicants() {

    const [pendingApplicationsList, setPendingApplicationsList] = useState([]);
    const [interviewApplicationsList, setInterviewApplicationsList] = useState([]);
    const [acceptedApplicationsList, setAcceptedApplicationsList] = useState([]);

    useEffect(() => {
        const cookies = new Cookies();

        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:4000/postings?employerId=' + cookies.get('userId'), {
                    headers: {authorization: `Bearer ${cookies.get('accessToken')}`},
                });

                let pendingApplications = [];
                let interviewApplications = [];
                let acceptedApplications = [];

                for (const posting of res.data) {
                    const processStudent = async (studentId, applicationType) => {
                        try {
                            const student = await axios.get('http://localhost:4000/users/' + studentId, {
                                headers: {authorization: `Bearer ${cookies.get('accessToken')}`},
                            });

                            const applicationData = {
                                firstName: student.data.firstName,
                                lastName: student.data.lastName,
                                studentId: studentId,
                                biography: student.data.biography,
                                postingTitle: posting.title,
                                postingId: posting._id
                            };

                            if (applicationType === 'pending') {
                                pendingApplications.push(applicationData);
                            } else if (applicationType === 'interview') {
                                interviewApplications.push(applicationData);
                            } else if (applicationType === 'accepted') {
                                acceptedApplications.push(applicationData);
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    };

                    if (posting.pendingApplicantsIds) {
                        for (const studentId of posting.pendingApplicantsIds) {
                            await processStudent(studentId, 'pending');
                        }
                    }

                    if (posting.interviewApplicantIds) {
                        for (const studentId of posting.interviewApplicantIds) {
                            await processStudent(studentId, 'interview');
                        }
                    }

                    if (posting.acceptedApplicantIds) {
                        for (const studentId of posting.acceptedApplicantIds) {
                            await processStudent(studentId, 'accepted');
                        }
                    }
                }

                setPendingApplicationsList(pendingApplications);
                setInterviewApplicationsList(interviewApplications);
                setAcceptedApplicationsList(acceptedApplications);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center',
            paddingTop: '5%'
        }}>
            <PostingTab
                pendingApplicationsList={pendingApplicationsList}
                interviewApplicationsList={interviewApplicationsList}
                acceptedApplicationsList={acceptedApplicationsList}
            />
        </div>
    );
}