import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";

export const useUserPosts = (username?: string) => {
  return useQuery({
    queryKey: ["posts", username],
    queryFn: () => fetchPosts({ username }),
    enabled: !!username,
  });
};
