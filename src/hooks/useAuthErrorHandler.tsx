import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useAuthErrorHandler = (error) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (error?.response?.status === 401) {
            localStorage.clear();
            navigate('/');
        }
    }, [error, location, navigate]);
};
