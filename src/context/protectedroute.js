// ProtectedRoute.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (WrappedComponent) => {
    const Wrapper = (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            // Check if user is authenticated
            const token = localStorage.getItem("token");
            if (!token) {
                // Redirect to login if not authenticated
                navigate("/login");
            }
        }, []);

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default ProtectedRoute;
