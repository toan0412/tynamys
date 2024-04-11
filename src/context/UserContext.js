import React from 'react';

const UserContext = React.createContext({ auth: false, userInfo: {}, companiesLIst: [] });

const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({ auth: false, userInfo: {}, companiesList: [] });

    const loginContext = (token, userInfo, companiesList) => {
        setUser((user) => ({
            auth: true,
            userInfo: userInfo,
            companiesList: companiesList,
        }));
        localStorage.setItem('token', token);
    };

    const userInfoContext = (userInfo, companiesList) => {
        setUser((user) => ({
            userInfo: userInfo,
            companiesList: companiesList,
        }));
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser((user) => ({
            email: '',
            auth: false,
        }));
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logout, userInfoContext }}>{children}</UserContext.Provider>
    );
};

export { UserContext, UserProvider };
