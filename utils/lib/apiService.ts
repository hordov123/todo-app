import axios from 'axios';

const api = axios.create({
    baseURL: 'https://654ff49b358230d8f0cdd0fb.mockapi.io/todo/',
    headers: {
        'Custom-Language': 'en',
        'Content-Type': 'application/json'
    },
});

export default api; 