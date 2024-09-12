import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://linkbrary-api.vercel.app/8-1',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const strUserInfo = localStorage.getItem('userInfo');

    if (strUserInfo) {
      const { accessToken } = JSON.parse(strUserInfo);
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
