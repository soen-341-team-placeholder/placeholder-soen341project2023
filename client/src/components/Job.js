import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import '../styles/Job.css';

export default function Job({ title, location, salary, description }) {


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
        </div>
    );
}