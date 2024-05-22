import axios from 'axios';

const apiHotels = axios.create({
    baseURL: 'http://127.0.0.1:8080/hotelManagerApi/v1',
    timeout: 5000
});

apiHotels.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem('user');

        if (userDetails) {
            const token = JSON.parse(userDetails).token;
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (e) => {
        return Promise.reject(e);
    }
);

export const login = async (data) => {
    try {
        return await apiHotels.post('/auth/login', data);
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const register = async (data) => {
    try {
        return await apiHotels.post('/auth/register', data);
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};
