import React from 'react';

const UserContext = React.createContext({
    auth: false,
    userInfo: {},
    companiesLIst: [],
    companyInfo: {},
    departmentUpdate: false,
});

const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({
        auth: false,
        userInfo: {},
        companiesList: [],
        companyInfo: {},
        departmentUpdate: false,
    });

    const loginContext = (token, workspaceId, userInfo, companiesList, companyInfo = {}) => {
        setUser((user) => ({
            auth: true,
            userInfo,
            companiesList,
            companyInfo,
        }));
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('workspaceId', workspaceId);
        localStorage.setItem('listCompany', JSON.stringify(companiesList));
        localStorage.setItem('companySelect', JSON.stringify(companyInfo));
    };

    const getWorkspaceContext = (companyInfo) => {
        setUser((user) => ({
            ...user,
            companyInfo,
        }));
        localStorage.setItem('companySelect', JSON.stringify(companyInfo));
    };

    const isDepartmentUpdate = (departmentUpdate) => {
        setUser((user) => ({
            ...user,
            departmentUpdate,
        }));
    };

    const logout = () => {
        localStorage.clear();
        setUser((user) => ({
            auth: false,
        }));
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logout, getWorkspaceContext, isDepartmentUpdate }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
