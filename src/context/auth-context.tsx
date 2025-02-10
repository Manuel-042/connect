import { useState, createContext, useContext, useEffect, useCallback } from "react";
import {jwtDecode, JwtPayload } from "jwt-decode";
import { useUserProfile } from "../hooks/useUserProfile";
import { useToast } from "../hooks/useToast";

console.log("AuthProvider re-mounted");

type User = {
  id: string;
  name: string;
  email: string;
};

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

export type UserProfile = User & Partial<Profile>;

type AuthContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  isLoggedIn: boolean;
  userProfile: UserProfile | null;
  decodeToken: (token: string) => void;
  refreshUserProfile: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type Props = { children: React.ReactNode };

interface CustomJwtPayload extends JwtPayload {
  user_id: string;
  name: string;
  email: string;
}

export default function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string>("");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  const decodeToken = useCallback((token: string) => {
    try {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      setUserProfile({
        id: decoded.user_id,
        name: decoded.name,
        email: decoded.email,
      });
      setIsLoggedIn(true);
      console.log("Token decoded:", decoded);
    } catch (error) {
      console.error("Token decode error:", error);
      setUserProfile(null);
      setIsLoggedIn(false);
    }
  }, []);

  const {
    data: fullProfileData,
    refetch: refetchUserProfile,
    error: profileError,
  } = useUserProfile(userProfile?.id || "", token || "");

  profileError && toast.error(JSON.stringify(profileError))

  useEffect(() => {
    if (fullProfileData && userProfile) {
      setUserProfile((prev) =>
        prev
          ? {
              ...prev,
              image: fullProfileData.avatar,
              coverPhoto: fullProfileData.cover_image,
              username: fullProfileData.username,
              bio: fullProfileData.bio,
              followerCount: fullProfileData.follower_count,
              followingCount: fullProfileData.following_count,
              isCreator: fullProfileData.is_creator,
              isVerified: fullProfileData.is_verified,
              createdAt: fullProfileData.created_at,
            }
          : null
      );
    }
  }, [fullProfileData]);

  const refreshUserProfile = useCallback(() => {
    refetchUserProfile();
  }, [refetchUserProfile]);

  const contextValue: AuthContextType = {
    token,
    setToken,
    isLoggedIn,
    userProfile,
    decodeToken,
    refreshUserProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthContext must be used within a AuthContextProvider");
    }

    return context;
}