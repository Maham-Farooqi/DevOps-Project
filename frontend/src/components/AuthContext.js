import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null; 
    });

  
    const login = (userData) => {
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData)); // Persist user data in sessionStorage
        sessionStorage.setItem('isLoggedIn', 'true'); // Optionally, store login status
    };

    const logout = () => {
        setUser(null); // Clear the user data from state
        sessionStorage.removeItem('user'); // Remove user data from sessionStorage
        sessionStorage.setItem('isLoggedIn', 'false'); // Optionally, update login status
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
