import { useState, createContext, useContext } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

console.log("Re-Mounts");

type UserProfile = {
    id?: string;
    name: string;
    email: string;
}

type AuthContextType = {
    user: UserProfile | null;
    token: string | null;
    setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    isLoggedIn: boolean;
    decodeToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type Props = { children: React.ReactNode }

interface CustomJwtPayload extends JwtPayload {
    user_id: string;
    name: string;
    email: string;
}

export default function AuthProvider({ children } : Props) {
    const [token, setToken] = useState<string>("");
    const [user, setUser] = useState<UserProfile | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    console.log(isLoggedIn);
    

    const decodeToken = (token: string) => {
        console.log("Thisbwas called from the login screen");
        try {
            const response = jwtDecode<CustomJwtPayload>(token);
            console.log({response});
            setUser({ id: response.user_id, name: response.name, email: response.email });
            setIsLoggedIn(true);
        } catch (error) {
            console.log("resets isLoggedIn here");
            console.error("Token decode error:", error);
            setUser(null);
            setIsLoggedIn(false);
        }
    };

    return (
        <AuthContext.Provider value={{user, token, setUser, setToken, isLoggedIn, decodeToken}}>{children}</AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthContext must be used within a AuthContextProvider");    
    }

    return context;
}