import axios from './customize-axios';

const jwtToken = localStorage.getItem('token');

axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

const loginApi = (email, password) => {
    return axios.post('/v1/auth/login', { email, password });
};

const getAccountInfoApi = () => {
    return axios.get('/v1/users/me');
};

const getCompaniesListApi = () => {
    return axios.get('/v1/companies?sort=id%2C-createdAt&searchFields%5B%5D=displayName');
};

export { loginApi, getAccountInfoApi, getCompaniesListApi };
