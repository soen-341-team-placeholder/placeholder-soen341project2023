import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export const backendUrl = "https://4000-walidoow-placeholdersoe-sz79zpqxbl2.ws-us92.gitpod.io/";

export function hello_world() {
  return ('Hello World');
}

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
