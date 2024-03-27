import { AuthUser } from "../Type/types";
import axios from "../Axios/axios";

// Function to set user session in local storage and configure axios instance headers
export const setSession = (user: AuthUser) => {
    localStorage.setItem('user', JSON.stringify(user))
    axios.defaults.headers.common.Authorization = `${user.token}`
}
// Function to retrieve user session from local storage
export const getSession = (): AuthUser | null => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    return user
}

// Function to decode JWT token
export function jwtDecode(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
            window
            .atob(base64)
            .split('')
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join('')
    );

    return JSON.parse(jsonPayload);
}


export const isValidToken = (token: string) => {
    if (!token) {
        return false;
    }

    const decoded = jwtDecode(token);

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
};
