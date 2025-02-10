import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useAuthContext } from "../context/auth-context";
import { Oval } from "react-loader-spinner";
import { useToast } from "../hooks/useToast";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { token } = useAuthContext();
    const { toast } = useToast();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error(error);
                toast.error(JSON.stringify(error));
            } finally {
                setIsLoading(false);
            }
        };

        if (!token) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }
    }, [token, refresh]);


    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {isLoading ? (
                <Oval
                    visible={true}
                    height="70"
                    width="70"
                    color="#ffffff"
                    ariaLabel="oval-loading"
                />
            ) : (
                <Outlet />
            )}
        </div>
    );
    
};

export default PersistLogin;
