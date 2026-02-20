import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser } from '../services/authService';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToast } = useToast();

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const userData = await loginUser(email, password);
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));

            if (userData.role === 'admin') {
                addToast('Welcome back, Admin', 'success');
            } else {
                addToast(`Welcome back, ${userData.name}`, 'success');
            }

            return { success: true };
        } catch (error) {
            addToast(error.message, 'error');
            return { success: false, error: error.message };
        }
    };

    const signup = async (name, email, password) => {
        try {
            const userData = await registerUser(name, email, password);
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            addToast('Account created successfully', 'success');
            return { success: true };
        } catch (error) {
            addToast(error.message, 'error');
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
        localStorage.removeItem('user');
        addToast('Logged out successfully', 'info');
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            signup,
            logout,
            loading,
            isAuthenticated: !!user,
            isAdmin: user?.role === 'admin'
        }}>
            {children}
        </AuthContext.Provider>
    );
};
