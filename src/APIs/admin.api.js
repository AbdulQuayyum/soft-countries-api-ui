import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/v1/Admin`,
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

export const GetAllUsers = () => api.post('/AllUsers')
export const GetUserDetails = (UserID) => api.post(`/UserDetails/${UserID}`)
export const SuspendUser = (UserID) => api.post(`/SuspendUser/${UserID}`)
