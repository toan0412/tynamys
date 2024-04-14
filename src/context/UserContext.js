import React from 'react';

const UserContext = React.createContext({ auth: false, userInfo: {}, companiesLIst: [], companyInfo: {} });

const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({ auth: false, userInfo: {}, companiesList: [], companyInfo: {} });

    const loginContext = (token, workspaceId, userInfo, companiesList, companyInfo = {}) => {
        setUser((user) => ({
            auth: true,
            userInfo,
            companiesList,
            companyInfo,
        }));
        localStorage.setItem('token', token);
        localStorage.setItem('workspaceId', workspaceId);
    };

    const getWorkspaceContext = (companyInfo) => {
        setUser((user) => ({
            ...user,
            companyInfo,
        }));
        localStorage.setItem('workspaceId', companyInfo.companyId);
    };

    const userInfoContext = (userInfo, companiesList) => {
        setUser((user) => ({
            userInfo: userInfo,
            companiesList: companiesList,
        }));
    };

    const logout = () => {
        localStorage.clear();
        setUser((user) => ({
            auth: false,
        }));
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logout, userInfoContext, getWorkspaceContext }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
