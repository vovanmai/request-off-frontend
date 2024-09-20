import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
export const getAccessToken = () => {
  if (localStorage.getItem('access_token')) {
    return `Bearer ${localStorage.getItem('access_token')}`
  }
  return null
};
const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authorization = getAccessToken();
    if (authorization) {
      config.headers.Authorization = authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
