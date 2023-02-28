import axios from 'axios';
import { useEffect } from 'react';
import data from '../tempData.json';


export default function ApplicantProfilePage(props) {
  const { userID } = props.match.params;
  const [user, setUser] = useState(null);

useEffect(() => {
  // axios.get(`/api/users/${userID}`)
  //   .then(response => {
  //     setUser(response.data);
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
  setUser(data[0]);
}, [userID]);


  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{user.firstName} {user.lastName}</h1>
        <div className="text-gray-600">{user.userType}</div>
      </header>
      <main>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">About Me</h2>
          <p className="mb-4">
            {user.aboutCandidate}
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
                <div className="text-gray-600">{item.company} ({item.startDate}-{item.endDate})</div>
                <ul className="list-disc ml-8">
                  <li className="mb-2">{item.description}</li>
                </ul>
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Projects</h2>
          <ul>
            {user.projects.map(item => (
              <li className="mb-4" key={item._id}>
                <div className="font-bold">{item.title}</div>
                <div className="text-gray-600">{item.organization} ({item.startDate}-{item.endDate})</div>
                <ul className="list-disc ml-8">
                  <li className="mb-2">{item.description}</li>
                </ul>
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Community Involvement</h2>
          <ul>
            {user.communityInvolvment.map(item => (
              <li className="mb-4" key={item._id}>
                <div className="font-bold">{item.title}</div>
                <div className="text-gray-600">{item.organization} ({item.startDate}-{item.endDate})</div>
                <ul className="list-disc ml-8">
                  <li className="mb-2">{item.description}</li>
                </ul>
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Interests</h2>
          <p className="mb-4">
            {user.interests}
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Awards and Certifications</h2>
          <ul>
            {user.awardsAndCertifications.map(item => (
              <li className="mb-4" key={item._id}>
                <div className="font-bold">{item.title}</div>
                <div className="text-gray-600">{item.organization} ({item.date})</div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
