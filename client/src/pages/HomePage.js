export default function HomePage(props) {
  const { isLoggedIn, cookies } = props;
  return (
    <div className="bg-red-200 shadow-lg rounded-lg p-6 mx-auto mt-10 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Career Service Application</h1>
      <h2 className="text-2xl font-semibold mb-2">Description</h2>
      <p className="mb-4">
        This is a website shared by employers and students. It allows employers
        to advertise their job vacancies to job seekers. As for students, it
        serves as an online marketplace where they can apply for jobs online
        based on their skill, experience, and location.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Objectives</h2>
      <p className="mb-4">
        The objectives of this website will differ for different users. It will
        allow employers to post and manage their job postings and review
        applications from candidates. As for students, it will allow them to
        post and update their portfolio, shortlist their potential jobs.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Core Features</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Sign up/Log in</li>
        <li>Post/Apply for jobs</li>
        <li>Update portfolio</li>
        <li>Job board page</li>
        <li>Send/Receive notifications</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">
        Project Approach and Tech Stack
      </h2>
      <p className="mb-4">
        The Project will be built using the MERN stack (MongoDB, Express,
        ReactJS, NodeJS) because of the following reasons:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Full-stack JavaScript: All components of the MERN stack use
          JavaScript, allowing for a seamless development experience.
        </li>
        <li>
          Popularity: MERN is a widely used and well-supported stack, with a
          large community of developers, making it easy to find resources and
          support.
        </li>
        <li>
          Scalability: The MERN stack has proven to be scalable, making it a
          good choice for developing a career site with potential for growth.
        </li>
        <li>
          Speed: React, one of the components of the MERN stack, is known for
          its fast performance, which is important for a site with a large
          volume of job postings and candidate profiles.
        </li>
        <li>
          User experience: React and Node.js allow for fast and responsive user
          interactions, making the site more user-friendly and easy to navigate.
        </li>
      </ul>
    </div>
  );
}
