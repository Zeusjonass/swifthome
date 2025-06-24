import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';

const API_GATEWAY_URL = "https://nf1g01mx8d.execute-api.us-east-1.amazonaws.com";

const axiosInstance = axios.create({
  baseURL: API_GATEWAY_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const session = await fetchAuthSession();
      const token = session?.tokens?.accessToken?.toString() || "";

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving Cognito token via fetchAuthSession", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
