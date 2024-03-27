import { ReactNode } from "react"
import { useAppSelector } from "../Redux/store"
import { selectAuth } from "../Redux/auth2/auth.selectors"
import { Navigate, useLocation } from "react-router-dom"


type Props = {
    children: ReactNode
}

/**
 * GuestGuard component renders its children only if the user is not authenticated.
 * Otherwise, it redirects to the home page or the page specified in the state.
 * It also shows a loading indicator while authentication status is being initialized.
 * @param children ReactNode representing the children components to be rendered.
 * @returns JSX.Element representing the guarded content or a loading indicator.
 */

export default function GuestGuard({ children }: Props) {
        // Get authentication state and initialization status from Redux store
    const { isAuthanticated, isInitialized } = useAppSelector(selectAuth)
        // Get current location (pathname) from the React Router location hook
    const { state } = useLocation()
    // If the user is authenticated, redirect to the home page or the page specified in the state
    if (isAuthanticated) {
        return <Navigate to={state || '/'} />
    }
    // If the user is not authenticated and authentication status is initialized, render the children components
    if (!isInitialized) {
        return <h1>Loading...</h1>
    }

    return <>{children}</>
}