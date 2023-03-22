import React from "react";
import PostingTab from "../components/applicants/PostingTab";

let applicants = [
    {
        firstName: 'Jamil',
        lastName: 'Dubois',
        postingTitle: 'Full Stack Amazon Web Developer',
        userBio: 'Meet Jamil Dubois, the ingenious Full Stack Software Developer who loves turning wild ideas into digital realities. With a passion for coding that knows no bounds, Jamil is your go-to guy for all things tech. 🚀👨‍💻'
    }
]

export default function Applicants() {
    return (
        <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center',
            paddingTop: '5%'
        }}>
            <PostingTab applicants={applicants}/>
        </div>
    );
}