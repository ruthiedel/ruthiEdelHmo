import { ReactNode, useEffect } from "react"
import { useAppDispatch } from "../Redux/store"
import { AuthUser } from "../Type/types"
import { getSession, isValidToken } from "./auth.utils"
import { setInitialize, setUser } from "../Redux/auth2/auth.slice"
import axios from "../Axios/axios";

type Props = {
    children: ReactNode
}

export default function InitializeAuth({ children }: Props) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const authUser: AuthUser | null = getSession()
        if (authUser?.token && isValidToken(authUser.token)) {
            // בדיקה האם הטוקן שווה לנתוני היוזר
            dispatch(setUser(authUser.user))
            console.log(authUser)
            axios.defaults.headers.common['Authorization'] = `${authUser?.token}`;
            console.log( axios.defaults.headers.common.Authorization )
        }
        // axios.defaults.headers.common['Authorization'] = `Bearer token ${authUser?.token}`;
        dispatch(setInitialize())
    }, [])
    
    return <>{children}</>
}