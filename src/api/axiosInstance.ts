import axios from 'axios';

const axiosInstance = axios.create({
    //   baseURL: `${import.meta.env.BASE_URL}`,
    // baseURL: '/api',
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

export default axiosInstance;