import { useQuery } from "@tanstack/react-query";
import useApiPrivate from "./useApiPrivate";
import { ProfileData } from "../types";

export const useUserProfile = (userId: string) => {
  const apiPrivate = useApiPrivate();

  if (!apiPrivate) {
    throw new Error("API instance is not ready");
  }

  return useQuery<ProfileData, Error>({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const response = await apiPrivate.get(`/api/profile/${userId}`);
      return response.data;
    },
    enabled: Boolean(userId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
