import axios from 'axios';
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { Document, Packer, Paragraph, TextRun } from "docx";

export const cookies = new Cookies();
export const backendUrl = "https://4000-walidoow-placeholdersoe-sz79zpqxbl2.ws-us92.gitpod.io/";

// Misc/ testing 
export function hello_world() {
  return ('Hello World');
}


export function fancyPopup(arg) {
  toast(arg, {
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

// API Request
export async function submitForm(values) {
  try {
    const response = await axios.post(`${backendUrl}/login`, {
      email: values.email.toLowerCase(),
      password: values.password
    });
    cookies.set('accessToken', response.data.accessToken, { path: '/' });
    cookies.set('refreshToken', response.data.refreshToken, { path: '/' });
    sendToProfile();
  } catch (error) {
    console.log(error);
  }
};

export async function sendToProfile(values, navigate) {
  try {
    const response = await axios.get(`${backendUrl}/users?email=${values.email.toLowerCase()}`, {
      headers:
      {
        authorization: `Bearer ${cookies.get('accessToken')}`
      }
    })
    navigate('/profile/' + response.data._id);
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUserProfile(userId) {
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
