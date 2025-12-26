import axios from 'axios';

const api = axios.create({
    baseURL: 'https://pulseassignment.onrender.com/api', // Production Backend URL
});

api.interceptors.request.use(
    (config) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo.token) {
            config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
