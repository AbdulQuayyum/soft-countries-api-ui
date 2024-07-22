import { createContext, useState, useContext, useEffect } from 'react';
import { SignInAccount } from '../APIs/auth.api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null,
        lastVisitedRoute: sessionStorage.getItem('lastVisitedRoute') || '/Dashboard'
    });

    const signin = async (email, password) => {
        const response = await SignInAccount(email, password);
        const { token, ...userData } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setAuthState((prevState) => ({ ...prevState, token, user: userData }));
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({ token: null, user: null, lastVisitedRoute: '/Dashboard' });
    };

    const setLastVisitedRoute = (route) => {
        sessionStorage.setItem('lastVisitedRoute', route);
        setAuthState((prevState) => ({ ...prevState, lastVisitedRoute: route }));
    };

    return (
        <AuthContext.Provider value={{ authState, signin, logout, setLastVisitedRoute }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UseAuth = () => useContext(AuthContext);
