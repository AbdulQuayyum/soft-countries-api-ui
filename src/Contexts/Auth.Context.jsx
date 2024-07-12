import { createContext, useState, useContext } from 'react';

import { SignInAccount } from '../APIs/auth.api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null
    });

    const signin = async (email, password) => {
        const response = await SignInAccount(email, password);
        const { token, data } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(data));
        setAuthState({ token, user: data });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({ token: null, user: null });
    };

    return (
        <AuthContext.Provider value={{ authState, signin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UseAuth = () => useContext(AuthContext);
