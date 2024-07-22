import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/v1/Auth`,
    headers: { 'Content-Type': 'application/json' }
});

const changePasswordApi = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/v1/Auth`,
    headers: { 'Content-Type': 'application/json' }
});

// Add the interceptor to include the token in the request headers
changePasswordApi.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const CreateAccount = async (email, password) => {
    return api.post('/CreateAccount', { email, password });
};

export const SignInAccount = async (email, password) => {
    return api.post('/SignIn', { email, password });
};

export const ForgotPassword = async (email) => {
    return api.post('/ForgotPassword', { email });
};

export const ResetPassword = async (email, code, newPassword) => {
    return api.post('/ResetPassword', { email, code, newPassword });
};

export const ChangePassword = async (currentPassword, newPassword) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user.email;

    return changePasswordApi.post('/ChangePassword', { email, currentPassword, newPassword });
}