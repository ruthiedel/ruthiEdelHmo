import { ReactNode, useEffect } from "react"
import { useAppDispatch } from "../Redux/store"
import { AuthUser } from "../Type/types"
import { getSession, isValidToken } from "./auth.utils"
import { setInitialize, setUser } from "../Redux/auth2/auth.slice"
import axios from "../Axios/axios";

type Props = {
    children: ReactNode
}
/**
 * InitializeAuth component initializes the authentication state when the application loads.
 * It checks if there is a valid user session stored in local storage.
 * If a valid session exists, it sets the user and authentication token in the Redux store
 * and configures axios with the authentication token.
 * @param children ReactNode representing the children components to be rendered.
 * @returns JSX.Element representing the children components.
 */
export default function InitializeAuth({ children }: Props) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const authUser: AuthUser | null = getSession()
         // If a valid session exists with a valid token, set the user in the Redux store
        // and configure axios with the authentication token
        if (authUser?.token && isValidToken(authUser.token)) {
            dispatch(setUser(authUser.user))
            console.log(authUser)
            axios.defaults.headers.common['Authorization'] = `${authUser?.token}`;
            console.log( axios.defaults.headers.common.Authorization )
        }
        dispatch(setInitialize())
    }, [])
    
    return <>{children}</>
}