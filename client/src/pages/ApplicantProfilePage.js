import React, { useState, useEffect } from "react";
import data from "../tempData.json";

export default function ApplicantProfilePage(props) {
  const { userID } = props.match.params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Uncomment this code to use axios to fetch user data from an API
    // axios.get(`/api/users/${userID}`)
    //   .then(response => {
    //     setUser(response.data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    // Comment out the code below if you're using axios
    const userData = data.find((user) => user.userID === userID);
    setUser(userData);
  }, [userID]);

  if (!user) {
    return <div>Loading...</div>;
  }
  
  return(

   <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{user.firstName} {user.lastName}</h1>
        <div className="text-gray-600">{user.userType}</div>
      </header>
      <main>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">About Me</h2>
          <p className="mb-4">
            {user.biography}
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Education</h2>
          <ul>
            {user.education.map(item => (
              <li className="mb-4" key={item._id}>
                <div className="font-bold">{item.degree} in {item.fieldOfStudy}</div>
                <div className="text-gray-600">{item.school} ({item.startDate}-{item.endDate})</div>
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
          <ul>
            {user.workExperience.map(item => (
              <li className="mb-4" key={item._id}>
                <div className="font-bold">{item.position}</div>
                <div className="text-gray-600">{item.companyName} ({item.startDate}-{item.endDate})</div>
                <ul className="list-disc ml-8">
                  <li className="mb-2">{item.jobDescription}</li>
                </ul>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
