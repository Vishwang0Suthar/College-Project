// src/context/AuthContext.js
"use client"
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to handle login
    const login = async (userData) => {
        // Implement your login logic here
        // e.g., make a POST request to the server and update the user state
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (response.ok) {
            setUser(data.user);
        } else {
            // Handle login error
        }
    };

    // Function to handle logout
    const logout = () => {
        // Implement your logout logic here
        // e.g., clear the user state and remove any stored session information
        setUser(null);
    };

    useEffect(() => {
        // Check if the user is already logged in (e.g., from a previous session)
        // and update the user state accordingly
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};