import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as fn from "../Function";
import ProfileModal from "./ProfileModal";
import ProfileCard from "./ProfileCard";
import Cookies from "universal-cookie";

export default function ProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [rating, setRating] = useState(0);
  const [isEditable, setEditable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const cookies = new Cookies();

  useEffect(() => {
    async function fetchData() {
      const user = await fn.fetchUserProfile(userId);
      const rating = await fn.getRating(userId);

      if (user.subscribers)
        setSubscribed(user.subscribers.includes(cookies.get("userId")));

      if (rating && rating.rating) setRating(rating.rating);
      setUser(user);
    }

    fetchData();

    setEditable(
      cookies.get("userId") === userId || cookies.get("userType") === "admin"
    );
  }, [userId]);

  const subscribeToEmployer = async () => {
    const res = await fn.subscribeTo(userId); // Employer's id
    if (res) setSubscribed(true);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const isAnEmployer = () => {
    return user.userType === "employer";
  };

  const isProfileOwner = () => {
    if (user._id) return user._id.toString() === cookies.get("userId");
    else return false;
  };

  const hasWorkExperience = () => {
    return user.workExperience && user.workExperience.length !== 0;
  };

  const hasEducation = () => {
    return user.education && user.education.length !== 0;
  };

  const cardProps = {
    rating,
    isAnEmployer,
    hasWorkExperience,
    hasEducation,
    isEditable,
    setShowModal,
    isProfileOwner,
    subscribed,
    subscribeToEmployer,
  };

  return (
    <div className="h-full bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      {showModal &&
        isEditable && ( // Conditionally render the modal
          <ProfileModal
            user={user}
            onClose={() => setShowModal(false)}
            onSave={(updatedUser) => {
              setUser(updatedUser);
              setShowModal(false);
            }}
            isAnEmployer={isAnEmployer()}
          />
        )}
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <ProfileCard {...cardProps} />
      </div>
    </div>
  );
}
