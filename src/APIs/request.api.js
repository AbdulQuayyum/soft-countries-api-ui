import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/v1/Service`,
    headers: { 'Content-Type': 'application/json' }
});

export const GetData = async (type) => {
    try {
        const response = await api.post(`/GetService/${type}`, {}, {
            headers: { 'username': import.meta.env.VITE_USERNAME, 'apikey': import.meta.env.VITE_API_KEY }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data.error : new Error('An error occurred');
    }
};
