import axios from './customize-axios';

const jwtToken = localStorage.getItem('token');

// Set default authorization header for all axios requests
axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

// Authentication API
const loginApi = (email, password) => {
    return axios.post('/v1/auth/login', { emailOrUsername: email, password });
};

// User Account API
const patchAccountInfoApi = (workspaceId) => {
    return axios.patch('/v1/users/me', { profile: { workspaceId: workspaceId } });
};
const getAccountInfoApi = () => {
    return axios.get('/v1/users/me');
};

// Company API
const getCompaniesListApi = () => {
    return axios.get('/v1/companies?sort=id%2C-createdAt&searchFields%5B%5D=displayName');
};
const createCompanyApi = (displayName, website, category, contactPhone, contactEmail, memberSize) => {
    return axios.post('v1/companies', { displayName, website, category, contactPhone, contactEmail, memberSize });
};

// Notification API
const getNotificationApi = (applyType) => {
    return axios.get(`/v1/notifications?filter=%7B%22applyType%22:${applyType}%7D&pageSize=80&pageNumber=1`);
};
const setAllAsReadApi = (applyType) => {
    const applyTypeNumber = parseInt(applyType);
    return axios.post('v1/notifications/set-all-as-read', { applyType: applyTypeNumber });
};

// Task API
const getDayTaskApi = (standDate_gte, standDate_lt) => {
    const workspaceId = localStorage.getItem('workspaceId');
    const apiUrl = `/v1/tasks?filter=%7B%22standDate_gte%22:%22${standDate_gte}%22,%22standDate_lt%22:%22${standDate_lt}%22%7D`;
    return axios.get(apiUrl, { headers: { 'X-Company-Id': workspaceId } });
};

// Goal API
const getGoalApi = (applyType, standDate_gte, standDate_lt) => {
    const workspaceId = localStorage.getItem('workspaceId');
    const apiUrl = `v1/goals?filter=%7B%22applyType%22:${applyType},%22standDate_gte%22:%22${standDate_gte}%22,%22standDate_lt%22:%22${standDate_lt}%22%7D`;
    return axios.get(apiUrl, { headers: { 'X-Company-Id': workspaceId } });
};

// Department API
const getDepartmentApi = () => {
    const workspaceId = localStorage.getItem('workspaceId');
    return axios.get(`v1/departments`, { headers: { 'X-Company-Id': workspaceId } });
};
const getDepartmentByFilter = (type) => {
    const workspaceId = localStorage.getItem('workspaceId');
    return axios.get(`v1/departments?filter=%7B%22type%22:%22${type}%22%7D`, {
        headers: { 'X-Company-Id': workspaceId },
    });
};
const patchDepartmentApi = (id, displayName, description, isPrivate) => {
    const workspaceId = localStorage.getItem('workspaceId');
    const apiUrl = `v1/departments/${id}`;
    return axios.patch(apiUrl, { displayName, description, isPrivate }, { headers: { 'X-Company-Id': workspaceId } });
};
const postDepartment = (type, displayName, description, numberOfMember, isPrivate) => {
    const workspaceId = localStorage.getItem('workspaceId');
    return axios.post(
        `v1/departments`,
        { type, displayName, description, numberOfMember, isPrivate },
        { headers: { 'X-Company-Id': workspaceId } },
    );
};
const deleteDepartment = (id, isForce) => {
    const workspaceId = localStorage.getItem('workspaceId');
    const apiUrl = `v1/departments/${id}`;
    const payload = { isForce };
    return axios.delete(apiUrl, { data: payload, headers: { 'X-Company-Id': workspaceId } });
};

// Ability API
const getAbilityApi = (id) => {
    const workspaceId = localStorage.getItem('workspaceId');
    const apiUrl = `v1/departments/${id}`;
    return axios.get(apiUrl, { headers: { 'X-Company-Id': workspaceId } });
};
const getAbilitiesByDepartmentApi = (search, deptId) => {
    const workspaceId = localStorage.getItem('workspaceId');
    const apiUrl = `v1/abilities?filter=%7B%22abilityDepts.deptId_in%22:[${deptId}],%22abilityUserStatus_in%22:[0,5]%7D&search=${search}&searchFields[]=user.fullName&searchFields[]=user.email&searchFields[]=user.username`;
    return axios.get(apiUrl, { headers: { 'X-Company-Id': workspaceId } });
};
const patchDepartmentAbility = (deptId, userIds) => {
    const workspaceId = localStorage.getItem('workspaceId');
    const apiUrl = 'v1/abilities/bulk-update-dept';
    return axios.patch(apiUrl, { deptId, userIds }, { headers: { 'X-Company-Id': workspaceId } });
};

//Position API

const getPositionApi = (id) => {
    const workspaceId = localStorage.getItem('workspaceId');
    const filter = id ? `%7B%22deptId%22:${id}%7D` : '{}';
    const apiUrl = `v1/positions?searchFields[]=displayName&search=&filter=${filter}`;
    return axios.get(apiUrl, { headers: { 'X-Company-Id': workspaceId } });
};

export {
    loginApi,
    patchAccountInfoApi,
    getAccountInfoApi,
    getCompaniesListApi,
    createCompanyApi,
    getNotificationApi,
    setAllAsReadApi,
    getDayTaskApi,
    getGoalApi,
    getDepartmentApi,
    getAbilitiesByDepartmentApi,
    getAbilityApi,
    patchDepartmentApi,
    patchDepartmentAbility,
    postDepartment,
    deleteDepartment,
    getDepartmentByFilter,
    getPositionApi,
};
