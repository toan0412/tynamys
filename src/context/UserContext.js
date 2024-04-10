import React from 'react';

const UserContext = React.createContext({ email: '', auth: false, userInfo: {} });

const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({ email: '', auth: false, userInfo: {} });

    const loginContext = (email, token, userInfo) => {
        setUser((user) => ({
            email: email,
            auth: true,
            userInfo: userInfo,
        }));
        localStorage.setItem('token', token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser((user) => ({
            email: '',
            auth: false,
        }));
    };

    return <UserContext.Provider value={{ user, loginContext, logout }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
