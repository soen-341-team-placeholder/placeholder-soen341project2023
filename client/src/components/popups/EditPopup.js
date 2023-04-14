import React, { useEffect, useState } from "react";
import "../../styles/PostingPopup.css";
import PostingPopupInput from "./PostingPopupInput";
import { FaRegTimesCircle } from "react-icons/fa";
import Cookies from "universal-cookie";
import * as fn from "../Function";
import axios from "axios";

const cookies = new Cookies();

export default function PostingPopup(props) {
  const [postings, setPostings] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/postings/" + props.postingId, {
        headers: {
          authorization: `Bearer ${cookies.get("accessToken")}`,
        },
      })
      .then((res) => {
        setPostings(res.data);
        console.log(res.data.company.companyName);
        setValues({
          companyName: res.data.company.companyName,
          title: res.data.title,
          location: res.data.location,
          salary: res.data.salary,
          description: res.data.description,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      companyName: values.companyName,
    };
    delete values.companyName;
    console.log(values);
    console.log(props.postingId);
    fn.updatePosting(props.postingId, values).then((r) =>
      props.setTrigger(!props.trigger)
    );
  };

  function onChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-header">
          <h1 className="popup-title">Edit Job</h1>
        </div>
        <div className="close-btn" onClick={() => props.setTrigger(false)}>
          {" "}
          <FaRegTimesCircle style={{ fontSize: "1.8em" }} />
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

          <div className="popup-footer">
            <button className="popup-submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
}
