import React, {useState} from "react";
import "../../styles/PostingPopup.css";
import PostingPopupInput from "./PostingPopupInput";
import {FaRegTimesCircle} from "react-icons/fa";
import * as fn from "../Function"
import {cookies} from "../Function";

export default function PostingPopup(props) {
    const [values, setValues] = useState({
        companyName: "",
        title: "",
        location: "",
        salary: "",
        description: "",
    });

    const inputs = [
        {
            id: 1,
            name: "companyName",
            type: "text",
            placeholder: "Company Name",
            label: "Company Name",
        },
        {
            id: 2,
            name: "title",
            type: "text",
            placeholder: "Job Title",
            label: "Job Title",
        },
        {
            id: 3,
            name: "location",
            type: "text",
            placeholder: "Location",
            label: "Location",
        },
        {
            id: 4,
            name: "salary",
            type: "number",
            placeholder: "Salary",
            label: "Salary",
        },
        {
            id: 5,
            name: "description",
            type: "text",
            placeholder: "Description",
            label: "Description",
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        values.company = {
            companyName: values.companyName
        }
        delete values.companyName
        values.employerId = cookies.get("userId")
        fn.addNewPosting(values).then(r => props.setTrigger(!props.trigger))
    };

    function onChange(e) {
        setValues({...values, [e.target.name]: e.target.value});
    }

    return props.trigger ? (
        <div className="popup">
            <div className="popup-inner">
                <div className="popup-header">
                    <h1 className="popup-title">Post a Job</h1>
                </div>
                <div className="close-btn" onClick={() => props.setTrigger(false)}>
                    {" "}
                    <FaRegTimesCircle style={{fontSize: "1.8em"}}/>
                    {props.childern}
                </div>
                <form className="form-popout" onSubmit={handleSubmit}>
                    {inputs.map((input) => (
                        <PostingPopupInput
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            onChange={onChange}
                        />
                    ))}
                </form>
                <div className="popup-footer">
                    <button className="popup-submit" type="submit" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    ) : (
        ""
    );
}
