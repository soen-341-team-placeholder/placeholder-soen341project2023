import axios from "axios"; // Importing axios module for making HTTP requests
import Cookies from "universal-cookie"; // Importing universal-cookie module for handling cookies
import { toast } from "react-toastify"; // Importing react-toastify module for showing notifications
import React from "react"; // Importing react module and useState hook
import {
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"; // Importing react-router-dom module for routing
import { Document, Packer, Paragraph, TextRun } from "docx"; // Importing docx module for creating Word documents

export const cookies = new Cookies(); // Creating an instance of Cookies
export const backendUrl = "http://127.0.0.1:4000";

// Misc/ testing
export function hello_world() {
  return "Hello World"; // Returns 'Hello World' string
}

/**
 * Function to show a fancy popup notification
 * @param {string} arg - The message to be shown in the notification
 */
export function fancyPopup(arg) {
  toast.error(arg, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
    // progressStyle: { backgroundColor: 'red' },
  });
}

/**
 * Function to show a fancy popup notification
 * @param {string} arg - The message to be shown in the notification
 */
export function fancyConfirmationPopup(arg) {
  toast.success(arg, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
  });
}

/**
 * Function to toggle dark mode
 * @returns {boolean} - The new value of the darkMode cookie
 */
export function toggleDarkMode() {
  const darkMode = cookies.get("darkMode");
  console.log("darkmode " + darkMode);
  if (typeof darkMode === "undefined") {
    // If the 'darkmode' cookie does not exist, create it and set it to false
    const newDarkMode = false;
    console.log("new darkmode " + newDarkMode);
    cookies.set("darkMode", newDarkMode, { path: "/" });
    return false;
  } else {
    // If the 'darkmode' cookie exists, toggle its value
    const newDarkMode = !darkMode;
    console.log("new darkmode " + newDarkMode);
    cookies.set("darkMode", newDarkMode, { path: "/" });
    return newDarkMode;
  }
}

/**
 * Function to create and download a Word document with user information
 * @param {object} user - The user object containing firstName, lastName, email, biography, workExperience, and education
 */
export function downloadCV(user) {
  const doc = new Document();

  // Add user info to the document
  doc.addSection({
    children: [
      new Paragraph({
        children: [
          new TextRun(`Name: ${user.firstName} ${user.lastName}`),
          new TextRun("\n"),
          new TextRun(`Email: ${user.email}`),
          new TextRun("\n"),
          new TextRun(`Biography: ${user.biography}`),
        ],
      }),
    ],
  });

  // Add work experience to the document
  doc.addSection({
    children: [
      new Paragraph({ text: "Work Experience" }),
      new Paragraph({
        children: [
          new TextRun("Position"),
          new TextRun("\t"),
          new TextRun("Company"),
          new TextRun("\t"),
          new TextRun("Dates"),
        ],
      }),
      ...user.workExperience.map(
        (exp) =>
          new Paragraph({
            children: [
              new TextRun(exp.position),
              new TextRun("\t"),
              new TextRun(exp.company),
              new TextRun("\t"),
              new TextRun(`${exp.startDate} - ${exp.endDate}`),
            ],
          })
      ),
    ],
  });

  // Add education to the document
  doc.addSection({
    children: [
      new Paragraph({ text: "Education" }),
      new Paragraph({
        children: [
          new TextRun("Degree"),
          new TextRun("\t"),
          new TextRun("School"),
          new TextRun("\t"),
          new TextRun("Dates"),
        ],
      }),
      ...user.education.map(
        (edu) =>
          new Paragraph({
            children: [
              new TextRun(edu.degree),
              new TextRun("\t"),
              new TextRun(edu.school),
              new TextRun("\t"),
              new TextRun(`${edu.startDate} - ${edu.endDate}`),
            ],
          })
      ),
    ],
  });

  // Save the document
  Packer.toBlob(doc).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${user.firstName} ${user.lastName} CV.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  });
}

/**
 * Function to redirect to login page and show a notification if user is not logged in
 * @returns {JSX.Element} - The Navigate component that redirects to the login page
 */
export function loginRedirector() {
  console.log("login redirected!");
  fancyPopup("Please log in first");
  return <Navigate to="./login" />;
}

// API Request

/**
 * Function to check if user is logged in
 * @returns {boolean} - Returns true if user is logged in, false otherwise
 */
export function isLoggedIn() {
  return !!cookies.get("refreshToken");
}

/**
 * Function to log in user with provided email and password
 * @param {object} values - An object containing email and password values
 */
export async function loginUser(values) {
  try {
    const response = await axios.post(`${backendUrl}/login`, {
      email: values.email.toLowerCase(),
      password: values.password,
    });
    cookies.set("accessToken", response.data.accessToken, { path: "/" });
    cookies.set("refreshToken", response.data.refreshToken, { path: "/" });
    await sendToProfile(values);
  } catch (error) {
    console.log(error);
  }
}

export async function refreshToken() {
  const body =  {
      refreshToken: cookies.get("refreshToken")
  }

  try {
    await axios.post(`${backendUrl}/tokens`, body)
        .then((res) => {
            cookies.set("accessToken", res.data.accessToken)
        });
    return true;
  } catch (error) {
    const errorMessage =
        error.response?.data?.message ||
        "Invalid Token"
    fancyPopup(errorMessage);
    return false;
  }
}

/**
 * Function to send user to their profile page after logging in
 * @param {object} values - An object containing email and password values
 */
export async function sendToProfile(values) {
  if (!isLoggedIn()) {
    fancyPopup("Please log in first.");
    return;
  }
  try {
    const response = await axios.get(
      `${backendUrl}/users?email=${values.email.toLowerCase()}`,
      {
        headers: {
          authorization: `Bearer ${cookies.get("accessToken")}`,
        },
      }
    );
    cookies.set("userId", response.data._id, { path: "/" });
  } catch (error) {
    console.log(error);
  }
}

/**
 * Function to fetch user profile information
 * @param {string} userId - The id of the user whose profile to fetch
 * @returns {object|null} - The user profile object, or null if not logged in or an error occurred
 */
export async function fetchUserProfile(userId) {
  if (!isLoggedIn()) {
    return null;
  }
  try {
    const response = await axios.get(`${backendUrl}/users/${userId}`, {
      headers: {
        authorization: `Bearer ${cookies.get("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 * Function to update user profile
 * @param {string} userId - The id of the user whose profile to update
 * @param {object} data - An object containing user profile data
 * @returns {boolean} - Returns true if user profile update was successful, false otherwise
 */
export async function updateUserProfile(userId, data) {
  try {
    if (!isLoggedIn()) {
      fancyPopup("Please login first");
      return false;
    }
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    await axios.patch(`${backendUrl}/users/${userId}`, formData, {
      headers: {
        authorization: `Bearer ${cookies.get("accessToken")}`,
      },
    });
    return true;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while updating the user profile.";
    fancyPopup(errorMessage);
    return false;
  }
}

/**
 * Function to register a new user
 * @param {object} values - An object containing email, password, userType, firstName, and lastName values
 * @returns {boolean} - Returns true if user registration was successful, false otherwise
 */
export async function registerUser(values) {
  const { email, password, userType, firstName, lastName, age } = values;
  const user = {
    email,
    password,
    userType: userType.toLowerCase(),
    firstName,
    lastName,
    age,
  };
  try {
    const response = await axios.post(`${backendUrl}/users`, user);
    return true;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while submitting the form.";
    fancyPopup(errorMessage);
    return false;
  }
}

/**
 * Function to get all job postings
 * @returns {object|null} - The job postings object, or null if not logged in or an error occurred
 */
export async function getPostings() {
  try {
    if (!isLoggedIn()) {
      fancyPopup("Please log in first.");
      return;
    }
    const response = await axios.get(`${backendUrl}/postings`, {
      headers: {
        authorization: `Bearer ${cookies.get("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    fancyPopup(error);
  }
}

export async function getPosting(postingId) {
  try {
    if (!isLoggedIn()) {
      fancyPopup("Please log in first.");
      return;
    }
    const response = await axios.get(`${backendUrl}/postings/${postingId}`, {
      headers: {
        authorization: `Bearer ${cookies.get("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    fancyPopup(error);
  }
}

export async function updatePosting(postingId, data) {
  try {
    if (!isLoggedIn()) {
      fancyPopup("Please log in first.");
      return;
    }
    await axios.patch(`${backendUrl}/postings/${postingId}`, data, {
      headers: {
        authorization: `Bearer ${cookies.get("accessToken")}`,
      },
    });
    fancyConfirmationPopup("Posting edited")
    return true;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while updating the the posting with " +
        "id=" +
        postingId;
    fancyPopup(errorMessage);
    return false;
  }
}

export async function addNewPosting(data) {
  try {
    if (!isLoggedIn()) {
      fancyPopup("Please log in first.");
      return;
    }
    await axios.post(`${backendUrl}/postings`, data, {
      headers: {
        authorization: `Bearer ${cookies.get("accessToken")}`,
      },
    });
    fancyConfirmationPopup("Posting created")
    return true;
  } catch (error) {
    const errorMessage =
        error.response?.data?.message ||
        "An error occurred while creating the the posting"
    fancyPopup(errorMessage);
    return false;
  }
}
