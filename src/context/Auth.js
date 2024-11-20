// AuthService.js
"use client"
let isLoggedIn = false;

export const Authlogin = () => {
    // Perform login logic, set isLoggedIn to true if login successful
    isLoggedIn = true;
};

export const logout = () => {
    // Perform logout logic, set isLoggedIn to false
    isLoggedIn = false;
};

export const isUserLoggedIn = () => {
    return isLoggedIn;
};
