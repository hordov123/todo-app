import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MOCKAPI_URL,
    headers: {
        'Custom-Language': 'en',
        'Content-Type': 'application/json'
    },
});

export default api; 