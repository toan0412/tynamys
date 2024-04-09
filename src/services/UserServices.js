import axios from './customize-axios';

const loginApi = (email, password) => {
    return axios.post('/v1/auth/login', { email, password });
};

export { loginApi };
