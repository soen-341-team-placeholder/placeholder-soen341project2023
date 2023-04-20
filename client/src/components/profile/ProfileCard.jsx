export default function  ProfileCard( props ){

    const user  = props;
        return (
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                <div className="max-w-md mx-auto">
                    <div className="flex items-center space-x-5">
                        <img
                            src="/placeholder_profile_picture.png"
                            alt="ProfileModal Picture"
                            className="w-20 h-20 object-cover rounded-full"
                        />
                        <div>
                            <h1 className="text-2xl font-semibold">{`${user.firstName} ${user.lastName}`}</h1>
                            <h1 className="text-xl font-semibold">{`Rating: ${rating} ⭐`}</h1>
                            <p className="text-gray-500">{user.email}</p>
                            <p className="text-gray-500">Age: {user.age}</p>
                            {isAnEmployer() && <p className="text-gray-500">Company: {user.companyName}</p>}
                        </div>
                    </div>

                    <div className="mt-5">
                        <p className="text-gray-500">{user.biography}</p>
                    </div>

                    {hasWorkExperience() && (
                        <div className="mt-10">
                            <h2 className="text-xl font-semibold">Work Experience</h2>
                            <div className="mt-4 space-y-4">
                                {user.workExperience.map((exp) => (
                                    <div key={exp.position}>
                                        <h3 className="font-semibold">
                                            {exp.position} at {exp.companyName}
                                        </h3>
                                        <p className="text-gray-500">{`${exp.startDate} - ${exp.endDate}`}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {hasEducation() && (
                        <div className="mt-10">
                            <h2 className="text-xl font-semibold">Education</h2>
                            <div className="mt-4 space-y-4">
                                {user.education.map((edu) => (
                                    <div key={edu.degree}>
                                        <h3 className="font-semibold">
                                            {edu.degree} at {edu.schoolName}
                                        </h3>
                                        <p className="text-gray-500">{`${edu.startDate} - ${edu.endDate}`}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="mt-5">
                        <button
                            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md"
                            onClick={() => fn.downloadCV(user)}>
                            Download CV
                        </button>
                        {isEditable &&
                            (<button
                                className="mt-4 ml-4 bg-green-500 text-white px-6 py-2 rounded-md"
                                onClick={() => setShowModal(true)}>
                                Edit Profile
                            </button>)
                        }
                        {(isAnEmployer() && !isProfileOwner() && !subscribed) &&
                            (<button
                                className="mt-4 ml-4 bg-green-500 text-white px-6 py-2 rounded-md"
                                onClick={() => subscribeToEmployer()}>
                                Subscribe
                            </button>)
                        }
                        {(isAnEmployer() && !isProfileOwner() && subscribed) &&
                            (<button
                                className="mt-4 ml-4 bg-green-500 text-white px-6 py-2 rounded-md">
                                Subscribed!
                            </button>)
                        }
                    </div>
                </div>
            </div>
        )
    }