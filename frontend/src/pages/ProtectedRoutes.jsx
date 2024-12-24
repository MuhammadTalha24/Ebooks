import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedEmail }) => {
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve user from local storage

    if (user?.email !== allowedEmail) {
        return <Navigate to="/" replace />; // Redirect to home if unauthorized
    }

    return children; // Render the children components if authorized
};

export default ProtectedRoute;
