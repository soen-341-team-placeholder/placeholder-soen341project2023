import axios from 'axios';
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify';
import React, { useState } from 'react';

const cookies = new Cookies();
export const backendUrl = "https://4000-walidoow-placeholdersoe-sz79zpqxbl2.ws-us92.gitpod.io/";

// Misc/ testing 
export function hello_world() {
  return ('Hello World');
}


export function fancyPopup(arg) {
  toast(arg, {
    autoClose: 2000,
    progressStyle: { backgroundColor: 'red' }
  });
}

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    const isDarkMode = cookies.get('darkMode') === 'true';
    if (isDarkMode) {
      return true;
    } else {
      cookies.set('darkMode', 'false', { path: '/' });
      return false;
    }
  });

  return [darkMode, setDarkMode];
}

export function useToggleDarkMode() {
  const [darkMode, setDarkMode] = useDarkMode();

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      cookies.set('darkMode', newMode.toString(), { path: '/' });
      return newMode;
    });
  };

  return toggleDarkMode;
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
