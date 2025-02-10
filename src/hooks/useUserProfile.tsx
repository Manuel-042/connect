import { useQuery } from "@tanstack/react-query";
import useApiPrivate from "./useApiPrivate";

export type ProfileData = {
  avatar: string;
  cover_image: string;
  username: string;
  bio: string;
  follower_count: number;
  following_count: number;
  is_creator: boolean;
  is_verified: boolean;
  created_at: string;
};

export const useUserProfile = (userId: string, token: string) => {
  const apiPrivate = useApiPrivate();

  if (!apiPrivate) {
    throw new Error("API instance is not ready");
  }

  return useQuery<ProfileData, Error>({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const response = await apiPrivate.get(`/api/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    enabled: Boolean(userId) && Boolean(token),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
