import { useState, createContext, useContext, useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import api from "../api/api";

console.log("Re-Mounts");

type User = {
    id: string;
    name: string;
    email: string;
}

type Profile = {
    image: string;
    coverPhoto: string;
    username: string;
    bio: string;
    followerCount: number;
    followingCount: number;
    isCreator: boolean;
    isVerified: boolean;
    createdAt: string;
};

type UserProfile = User & Partial<Profile>


type AuthContextType = {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    isLoggedIn: boolean;
    userProfile: UserProfile | null;
    decodeToken: (token: string) => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type Props = { children: React.ReactNode }

interface CustomJwtPayload extends JwtPayload {
    user_id: string;
    name: string;
    email: string;
}

export default function AuthProvider({ children }: Props) {
    const [token, setToken] = useState<string>("");
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    console.log(isLoggedIn);

    const decodeToken = (token: string) => {
        console.log("This was called from the login or signup screen");
        try {
            const response = jwtDecode<CustomJwtPayload>(token);
            console.log({ response });
            setUserProfile({
                id: response.user_id,
                name: response.name,
                email: response.email,
            });
            setIsLoggedIn(true);
        } catch (error) {
            console.log("resets isLoggedIn here");
            console.error("Token decode error:", error);
            setUserProfile(null);
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!userProfile && !token) {
                console.log("No user and token provided.");
                return;
            }

            try {
                const response = await api.get(`/api/profile/${userProfile?.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = response?.data;
                console.log({ "Profile Data": data });

                if (response?.status === 200) {
                    const updatedProfile: UserProfile = {
                        id: userProfile?.id || '', 
                        name: userProfile?.name || '', 
                        email: userProfile?.email || '', 
                        image: data.avatar,
                        coverPhoto: data.cover_image,
                        username: data.username,
                        bio: data.bio,
                        followerCount: data.follower_count,
                        followingCount: data.following_count,
                        isCreator: data.is_creator,
                        isVerified: data.is_verified,
                        createdAt: data.created_at,
                    };
                    setUserProfile(updatedProfile);
                } else {
                    console.log(response?.data);
                }
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
            }
        };

        if (token && userProfile?.id) {
            fetchUserProfile();
        }

    }, [token, userProfile?.id]);

    return (
        <AuthContext.Provider value={{ token, userProfile, setToken, isLoggedIn, decodeToken }}>{children}</AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthContext must be used within a AuthContextProvider");
    }

    return context;
}