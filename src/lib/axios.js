import Axios from 'axios';

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

axios.interceptors.request.use(async (config) => {
    const xsrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

    if (xsrfToken) {
        config.headers['X-CSRF-TOKEN'] = decodeURIComponent(xsrfToken);
    }
    return config;
});

export default axios;
