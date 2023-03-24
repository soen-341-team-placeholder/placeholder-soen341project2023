import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

export function hello_world() {
  console.log("Hello, World!");
}

export const submitForm = async (values, cookies) => {
  try {
    const response = await axios.post('http://localhost:4000/login', {
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

export const sendToProfile = async (values, cookies, navigate) => {
  try {
    const response = await axios.get('http://localhost:4000/users?email=' + values.email.toLowerCase(), {
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
