import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/v1/User`,
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 403 && error.response.data?.error?.name === "TokenExpiredError") {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast.error("Session expired, Please login again")
            window.location.replace('/');
        }
        return Promise.reject(error);
    }
);

export const GenerateAPIKey = (data) => api.post('/GenerateAPIKey', data);
export const GetAPIKey = (data) => api.post('/GetAPIKey', data);
export const DeleteAPIKey = (data) => api.post('/DeleteAPIKey', data);
export const SetAPIKeyExpiration = (data) => api.post('/SetAPIKeyExpirationDate', data);
export const GetCalls = (data) => api.post('/GetCalls', data);
export const GetCallsCount = (data) => api.post('/GetCallsCount', data);
export const SwitchMode = (data) => api.post('/SwitchMode', data);
export const AddWebsite = (data) => api.post('/AddWebsite', data);
export const RemoveWebsite = (data) => api.post('/RemoveWebsite', data);
export const GetUserTransactions = (data) => api.post('/GetUserTransactions', data);
export const GetUserInfo = (username) => api.post(`/GetUser/${username}`);
export const GetUserActivities = (data) => api.post('/GetUserActivities', data);

export default api;
