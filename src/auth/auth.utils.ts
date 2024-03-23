import { AuthUser } from "../Type/types";
import axios from "../Axios/axios";

export const setSession = (user: AuthUser) => {
    localStorage.setItem('user', JSON.stringify(user))
    // if(!axios.defaults.headers.common.Authorization)
    console.log(user)
    axios.defaults.headers.common.Authorization = `${user.token}`
}

export const getSession = (): AuthUser | null => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    return user
}

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
