import { useQuery } from "@tanstack/react-query";
import { fetchPostsByUserId } from "../api/posts";

export const useUserPosts = (userId: number) => {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: () => fetchPostsByUserId(userId),
    enabled: !!userId,
  });
};
