import '../../styles/Tabs.css'
import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

async function getPosting(postingId) {
    const res = await axios.get('http://localhost:4000/postings/' + postingId, {
        headers: {authorization: `Bearer ${cookies.get('accessToken')}`},
    }).catch((err) => {
        console.log(err);
    })
    return res.data
}

async function patchPosting(postingId, posting) {
    axios.patch('http://localhost:4000/postings/' + postingId, posting, {
        headers: {authorization: `Bearer ${cookies.get('accessToken')}`},
    }).catch((err) => {
        console.log(err);
    })
}

export default function PostingActions({studentId, postingId, canInterview, canAccept, canRescind, onHidePostingCard}) {

    const sendToInterview = async (studentId, postingId) => {
        const posting = await getPosting(postingId)
        if (posting.pendingApplicantsIds.includes(studentId))
            posting.pendingApplicantsIds = posting.pendingApplicantsIds.filter(e => e !== studentId);
        else if (posting.acceptedApplicantIds.includes(studentId))
            posting.acceptedApplicantIds = posting.acceptedApplicantIds.filter(e => e !== studentId);
        else if (posting.rejectedApplicantIds.includes(studentId))
            posting.rejectedApplicantIds = posting.rejectedApplicantIds.filter(e => e !== studentId);

        posting.interviewApplicantIds.push(studentId)

        await patchPosting(postingId, posting)
        onHidePostingCard();
    }

    const sendToAccepted = async (studentId, postingId) => {
        const posting = await getPosting(postingId)
        if (posting.pendingApplicantsIds.includes(studentId))
            posting.pendingApplicantsIds = posting.pendingApplicantsIds.filter(e => e !== studentId);
        else if (posting.interviewApplicantIds.includes(studentId))
            posting.interviewApplicantIds = posting.interviewApplicantIds.filter(e => e !== studentId);
        else if (posting.rejectedApplicantIds.includes(studentId))
            posting.rejectedApplicantIds = posting.rejectedApplicantIds.filter(e => e !== studentId);

        posting.acceptedApplicantIds.push(studentId)

        await patchPosting(postingId, posting)
        onHidePostingCard();
    }

    const sendToRescinded = async (studentId, postingId) => {
        const posting = await getPosting(postingId)
        if (posting.pendingApplicantsIds.includes(studentId))
            posting.pendingApplicantsIds = posting.pendingApplicantsIds.filter(e => e !== studentId);
        else if (posting.interviewApplicantIds.includes(studentId))
            posting.interviewApplicantIds = posting.interviewApplicantIds.filter(e => e !== studentId);
        else if (posting.acceptedApplicantIds.includes(studentId))
            posting.acceptedApplicantIds = posting.acceptedApplicantIds.filter(e => e !== studentId);

        posting.rejectedApplicantIds.push(studentId)

        await patchPosting(postingId, posting)
        onHidePostingCard();
    }

    return (
        <div style={{display: 'flex', marginTop: 20, justifyContent: 'space-evenly'}}>
            {canInterview && (
                <button className="Button black" onClick={() => sendToInterview(studentId, postingId)}>Invite to
                    Interview</button>)}
            {canAccept && (
                <button className="Button black" onClick={() => sendToAccepted(studentId, postingId)}>Accept</button>)}
            {canRescind && (
                <button className="Button red" onClick={() => sendToRescinded(studentId, postingId)}>Rescind</button>)}
        </div>)
}