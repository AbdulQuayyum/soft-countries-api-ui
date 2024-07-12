import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/v1/Auth`,
    headers: { 'Content-Type': 'application/json' }
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
