import { ReactNode } from "react"
import { useAppSelector } from "../Redux/store"
import { selectAuth } from "../Redux/auth2/auth.selectors"
import { Navigate, useLocation } from "react-router-dom"

type Props = {
    children: ReactNode
}

// AuthGuard component responsible for handling authentication and authorization
export default function AuthGuard({ children }: Props) {
    const { isAuthanticated, isInitialized } = useAppSelector(selectAuth)
    const { pathname } = useLocation()
    // If authentication status is not initialized yet, display loading message
    if (!isInitialized) {
        return <h1>Loading...</h1>
    }
    // If user is not authenticated, redirect to login page with the original pathname as state
    if (!isAuthanticated) {
        return <Navigate to={'/login'} state={pathname} />
    }

    return <>{children}</>
}