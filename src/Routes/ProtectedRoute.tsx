import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/auth-context";


export const ProtectedRoute = () => {
    const Location = useLocation();
    const { isLoggedIn } = useAuthContext();
    
    console.log("re Rendering compononent")
    console.log({isLoggedIn})

    return (
        isLoggedIn ? 
        <Outlet/> : 
        <Navigate to="/login" state={{ from: Location }} replace />
    )
}