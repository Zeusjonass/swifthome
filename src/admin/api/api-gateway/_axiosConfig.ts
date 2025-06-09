import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://nf1g01mx8d.execute-api.us-east-1.amazonaws.com', // import.meta.env.VITE_API_URL
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
});


export default axiosInstance;