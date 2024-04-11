import axios from './customize-axios';

const jwtToken = localStorage.getItem('token');

axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

const loginApi = (email, password) => {
    return axios.post('/v1/auth/login', { email, password });
};

const getAccountInfo = () => {
    return axios.get('/v1/users/me');
};

export { loginApi, getAccountInfo };
