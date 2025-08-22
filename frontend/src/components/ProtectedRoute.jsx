import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
    // State to track if the user is authorized (true), unauthorized (false), or not yet determined (null)
    const [isAuthorized, setIsAuthorized] = useState(null);

    // Run the authentication check when the component mounts
    useEffect(() => {
        // Call auth function and if it throws, set authorization to false
        auth().catch(() => setIsAuthorized(false));
    }, []);

    // Function to refresh the access token using the refresh token
    const refreshToken = async () => {
        // Get the stored refresh token from localStorage
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            // Make POST request to refresh endpoint with the refresh token
            const res = await api.post('/auth/token/refresh/', { 
                refresh: refreshToken 
            });
            // If successful (HTTP 200), update access token in localStorage and mark authorized
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                // Otherwise, mark unauthorized
                setIsAuthorized(false);
            }
        } catch (error) {
            // Log error and mark unauthorized in case of request failure
            console.error(error);
            setIsAuthorized(false);
        }
    }

    // Function to check if the current access token is valid or needs refreshing
    const auth = async () => {
        // Get the access token from localStorage
        const token = localStorage.getItem(ACCESS_TOKEN);
        // If no token found, immediately mark unauthorized
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        // Decode the JWT token to extract expiration timestamp
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        // Get current time in seconds (JWT exp claims are in seconds)
        const now = Date.now() / 1000;

        // If the token is expired (expiration < current time), try to refresh it
        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            // If token still valid, mark authorized
            setIsAuthorized(true);
        }
    }

    // While the authorization state is unknown (initial load or auth check in progress),
    // show a loading message
    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    // If authorized, render the protected page(s) wrapped inside this component,
    // otherwise redirect to the login page
    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;