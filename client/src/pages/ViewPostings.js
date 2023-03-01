import React, { useEffect, useState } from "react";
import Job from "../components/Job";
import '../styles/ViewPostings.css';

export default function ViewPostings(){

    return(
        <>
        <span className="new-post">New Post</span>
        <div className="jobs">
        
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
        
        </div>
        
        </>
    );
}