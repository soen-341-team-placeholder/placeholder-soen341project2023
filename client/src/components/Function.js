import axios from 'axios';
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { Navigate, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Document, Packer, Paragraph, TextRun } from "docx";

export const cookies = new Cookies();
export const backendUrl = "http://127.0.0.1:4000";//"https://4000-walidoow-placeholdersoe-sz79zpqxbl2.ws-us92.gitpod.io";

// Misc/ testing 
export function hello_world() {
  return ('Hello World');
}


export function fancyPopup(arg) {
  toast.error(arg, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
    // progressStyle: { backgroundColor: 'red' },
  });
}


export function toggleDarkMode() {
  const darkMode = cookies.get('darkMode');
  console.log('darkmode ' + darkMode);
  if (typeof darkMode === 'undefined') {
    // If the 'darkmode' cookie does not exist, create it and set it to false
    const newDarkMode = false;
    console.log('new darkmode ' + newDarkMode);
    cookies.set('darkMode', newDarkMode, { path: '/' });
    return false;
  } else {
    // If the 'darkmode' cookie exists, toggle its value
    const newDarkMode = !darkMode;
    console.log('new darkmode ' + newDarkMode);
    cookies.set('darkMode', newDarkMode, { path: '/' });
    return newDarkMode;
  }
}

export function downloadCV (user) {
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
      ...user.workExperience.map((exp) =>
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
      ...user.education.map((edu) =>
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

export function loginRedirector() {
  fancyPopup('Please log in first');
  return <Navigate to='/login' />;
}


// API Request

export function isLoggedIn() {
  return !!cookies.get('refreshToken');
}

export async function loginUser(values) {
  try {
    const response = await axios.post(`${backendUrl}/login`, {
      email: values.email.toLowerCase(),
      password: values.password
    });
    cookies.set('accessToken', response.data.accessToken, { path: '/' });
    cookies.set('refreshToken', response.data.refreshToken, { path: '/' });
    await sendToProfile(values);
  } catch (error) {
    console.log(error);
  }
}

export async function sendToProfile(values){
  if (!isLoggedIn()) {
    fancyPopup('Please log in first.');
    return;
  }
  try {
    console.log(values)
    const response = await axios.get(`${backendUrl}/users?email=${values.email.toLowerCase()}`, {
      headers:
      {
        authorization: `Bearer ${cookies.get('accessToken')}`
      }
    })
    cookies.set('userId', response.data._id, { path: '/' });
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUserProfile(userId) {
  if (!isLoggedIn()) {
    return null;
  }
  try {
    const response = await axios.get(`${backendUrl}/users/${userId}`, {
      headers: {
        authorization: `Bearer ${cookies.get('accessToken')}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function registerUser(values) {
  const { email, password, userType, firstName, lastName } = values;
  const user = { email, password, userType: userType.toLowerCase(), firstName, lastName };
  try {
    const response = await axios.post(`${backendUrl}/users`, JSON.stringify(user));
    return true;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred while submitting the form.";
    fancyPopup(errorMessage);
    return false;
  }
}


export async function getPostings() {
  try {
    if (!isLoggedIn()) {
      fancyPopup('Please log in first.');
      return;
    }
    const response = await axios.get(`${backendUrl}/postings`, {
      headers: {
        authorization: `Bearer ${cookies.get('refreshToken')}`
      }
    });
    return response.data;
  } catch (error) {
    fancyPopup(error); 
  }
}

export async function updateUserProfile(userId, data) {
  try {
    if (!isLoggedIn()) {
      fancyPopup('Please login first');
      return false;
    }
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    await axios.patch(`${backendUrl}/users/${userId}`, formData, {
      headers: {
        'authorization': `Bearer ${cookies.get('refreshToken')}`
      }
    });
    return true;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred while updating the user profile.";
    fancyPopup(errorMessage);
    return false;
  }
}

