import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute: React.FC<{
    children: React.ReactNode;
    requiredRole?: 'ADMIN' | 'USER'
}> = ({ children, requiredRole }) => {
    const { user, isAuthenticated } = useAuth();
    const role = user?.role;

    if (!isAuthenticated) return <Navigate to="/login" />;

    if (requiredRole && role !== requiredRole) {
        // Redirect based on role if they try to access unauthorized area
        return <Navigate to={role === 'ADMIN' ? '/admin' : '/'} />;
    }

    return <>{children}</>;
};
