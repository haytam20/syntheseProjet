import axios from 'axios';

// Define VITE_BACKEND_URL
const VITE_BACKEND_URL = 'http://127.0.0.1:8000/api/';

// Fetch CSRF token from the backend
const fetchCsrfToken = async () => {
    try {
        const response = await axios.get(`${VITE_BACKEND_URL}/csrf-token`);
        return response.data.token;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Create axios client with baseURL and CSRF token
const createAxiosClient = async () => {a
    const csrfToken = await fetchCsrfToken();

    return axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL || VITE_BACKEND_URL,
        headers: {
            'X-CSRF-TOKEN': csrfToken,
        },
        withCredentials: true,
    });
};

// Export the function to create the axios client
export const axiosClient = createAxiosClient();