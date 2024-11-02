// src/apiUtils.js
import axios from 'axios';
import { toast } from 'react-toastify';
//import { logoutAndRedirect } from './authUtils';

// Create an Axios instance with default configurations
const api = axios.create({
    baseURL: 'http://localhost:8804/', // Set your base URL here
    timeout: 10000, // Timeout after 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercept request to add authorization token if available
api.interceptors.request.use(
    (config) => {
        const token = JSON.parse(window.localStorage.getItem('authToken'));
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn('No auth token found in localStorage.');
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Intercept response to handle 401 errors and redirect if needed
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn('Unauthorized request, redirecting...');
            toast.error('Session expired. Please log in again.');
            // logoutAndRedirect();
        }
        return Promise.reject(error);
    }
);

// Base function to handle API calls
export const fetchData = async (url, method = 'GET', data = null) => {
    try {
        const response = await api({
            url,
            method,
            data,
        });

        // Success response
        return { success: true, data: response.data };
    } catch (error) {
        // Enhanced error handling with toast notifications
        if (error.response) {
            // Server responded with a status other than 2xx
            toast.error(`Error: ${error.response.data.message || 'Something went wrong'}`);
        } else if (error.request) {
            // No response received
            toast.error('Error: No response from the server. Please try again.');
        } else {
            // Other errors
            toast.error(`Error: ${error.message}`);
        }

        return { success: false, error: error.message };
    }
};
