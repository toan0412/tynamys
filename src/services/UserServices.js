import axios from './customize-axios';

const jwtToken = localStorage.getItem('token');

axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

const loginApi = (email, password) => {
    return axios.post('/v1/auth/login', { emailOrUsername: email, password });
};

const getAccountInfoApi = () => {
    return axios.get('/v1/users/me');
};

const patchAccountInfoApi = (workspaceId) => {
    return axios.patch('/v1/users/me', { profile: { workspaceId: workspaceId } });
};

const getCompaniesListApi = () => {
    return axios.get('/v1/companies?sort=id%2C-createdAt&searchFields%5B%5D=displayName');
};

const getNotificationApi = (applyType) => {
    return axios.get(`/v1/notifications?filter=%7B%22applyType%22:${applyType}%7D&pageSize=80&pageNumber=1`);
};

const setAllAsReadApi = (applyType) => {
    const applyTypeNumber = parseInt(applyType);
    return axios.post('v1/notifications/set-all-as-read', { applyType: applyTypeNumber });
};

const createCompanyApi = (displayName, website, category, contactPhone, contactEmail, memberSize) => {
    return axios.post('v1/companies', { displayName, website, category, contactPhone, contactEmail, memberSize });
};
export {
    loginApi,
    patchAccountInfoApi,
    getAccountInfoApi,
    getCompaniesListApi,
    createCompanyApi,
    getNotificationApi,
    setAllAsReadApi,
};
