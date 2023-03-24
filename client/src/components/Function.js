import axios from 'axios';
import Cookies from 'universal-cookie';
import * as server from '~/server/server';

const cookies = new Cookies();
const baseURL = getBaseURL();

export function getBaseURL(){
    server.getBaseURL();
}
export function hello_world() {
  console.log("Hello, World!");
}

export const submitForm = async (values) => {
  try {
    const response = await axios.post(`${baseURL}/login`, {
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

export const sendToProfile = async (values, navigate) => {
  try {
    const response = await axios.get(`${baseURL}/users?email=${values.email.toLowerCase()}`, {
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
