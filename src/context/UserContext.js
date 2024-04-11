import React from 'react';

const UserContext = React.createContext({ auth: false, userInfo: {} });

const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({ auth: false, userInfo: {} });

    const loginContext = (token, userInfo) => {
        setUser((user) => ({
            auth: true,
            userInfo: userInfo,
        }));
        localStorage.setItem('token', token);
    };

    const userInfo = (userInfo) => {
        setUser((user) => ({
            userInfo: userInfo,
        }));
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser((user) => ({
            email: '',
            auth: false,
        }));
    };

    return <UserContext.Provider value={{ user, loginContext, logout, userInfo }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
