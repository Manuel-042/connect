import { useState, createContext, useContext, useCallback } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useUserProfile } from "../hooks/useUserProfile";
import { useToast } from "../hooks/useToast";
import useApiPrivate from "../hooks/useApiPrivate";
import { useQueryClient } from "@tanstack/react-query";
import { ProfileData, User } from "../types";

console.log("AuthProvider re-mounted");

type AuthContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn: boolean;
  userInfo: User | null;
  profileData: ProfileData | undefined;
  decodeToken: (token: string) => void;
  refreshUserProfile: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type Props = { children: React.ReactNode };

interface CustomJwtPayload extends JwtPayload {
  user_id: string;
  username: string;
  email: string;
}

export default function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();
  const apiPrivate = useApiPrivate();
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const decodeToken = useCallback(
    (token: string) => {
      try {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        setIsLoggedIn(true);
        setUserId(decoded.user_id);
        setUserInfo({
          id: decoded.user_id,
          username: decoded.username,
          email: decoded.email,
        });

        queryClient.prefetchQuery({
          queryKey: ["profile", decoded.user_id],
          queryFn: async () => {
            const response = await apiPrivate.get(`/api/profile/${decoded.user_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
          },
        });

      } catch (error) {
        console.error("Token decode error:", error);
        toast.error("Failed to decode token");
        setIsLoggedIn(false);
        setUserId(null);
      }
    },
    [queryClient, apiPrivate]
  );

  const {
    data: profileData,
    refetch: refreshUserProfile,
    error: profileError,
  } = useUserProfile(userId || "");

  console.log({ "profile data in auth context": profileData})

  if (profileError) {
    console.error(profileError)
    toast.error(JSON.stringify(profileError));
  }

  // const mergedUserProfile: ProfileData = userInfo
  // ? {
  //     ...userInfo,
  //     avatar: profileData?.avatar || "https://res.cloudinary.com/diq51knlu/image/upload/user-image_wykazb",           
  //     cover_image: profileData?.cover_image, 
  //     username: profileData?.username,
  //     bio: profileData?.bio,
  //     follower_count: profileData?.follower_count,
  //     following_count: profileData?.following_count,
  //     is_creator: profileData?.is_creator,
  //     is_verified: profileData?.is_verified,
  //     created_at: profileData?.created_at,
  //   }
  // : null;

  const contextValue: AuthContextType = {
    token,
    setToken,
    isLoggedIn,
    userInfo,
    profileData, 
    decodeToken,
    refreshUserProfile,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}
