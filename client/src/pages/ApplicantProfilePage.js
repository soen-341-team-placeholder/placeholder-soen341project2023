import React, { useState, useEffect } from "react";
import data from "./tempData.json";

export default function ApplicantProfilePage(props) {
  const { userId } = props.match.params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Uncomment this code to use axios to fetch user data from an API
    // axios.get(`/api/users/${userId}`)
    //   .then(response => {
    //     setUser(response.data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    // Comment out the code below if you're using axios
    const userData = data.find((user) => user.userId === userId);
    setUser(userData);
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return <div>{JSON.stringify(user)}</div>;
}
