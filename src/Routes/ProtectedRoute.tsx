import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/auth-context";

type Props = { children: ReactNode }

export const ProtectedRoute = ({children} : Props) => {
    const Location = useLocation();
    const { isLoggedIn } = useAuthContext();
    console.log("Value at point of navigate " + isLoggedIn);

    return isLoggedIn ? (
        <>{children}</>
    ) : (
        <Navigate to="/login" state={{ from: Location }} replace />
    )
}