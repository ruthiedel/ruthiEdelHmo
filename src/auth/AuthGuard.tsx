import { ReactNode } from "react"
import { useAppSelector } from "../Redux/store"
import { selectAuth } from "../Redux/auth2/auth.selectors"
import { Navigate, useLocation } from "react-router-dom"

type Props = {
    children: ReactNode
}

export default function AuthGuard({ children }: Props) {
    const { isAuthanticated, isInitialized } = useAppSelector(selectAuth)
    const { pathname } = useLocation()

    if (!isInitialized) {
        return <h1>Loading...</h1>
    }

    if (!isAuthanticated) {
        return <Navigate to={'/login'} state={pathname} />
    }

    return <>{children}</>
}