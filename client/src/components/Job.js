import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import '../styles/Job.css';

export default function Job(){

    return(
        <div className="post-container">
            <div className="logo">
                <FaPlay style={{fontSize:"3em", color:"white"}}/>
                {/* <img src="/images/postIcon.jpg" alt="img"></img> */}
            </div>
            <div className="part1">
                <div className="company">
                <span className="cname">"Company name"</span> 
                </div>
                <div className="title-position">"Title/Position"</div>
                <div className="details">
                    <span>"Salary"</span>
                    <span>&nbsp;•&nbsp;</span>
                    <span>"location"</span>
                </div>
            </div>
            <div className="part2">
                <span className="description">Lorem ipsum dolor sit amet, in pro justo aliquid epicurei. Percipit signiferumque ne mei, volumus facilisi deseruisse eu qui. Esse singulis disputando ne mea, ne odio convenire eos. Duo mucius omittam offendit no.</span>
            </div>
        </div>
    );
}