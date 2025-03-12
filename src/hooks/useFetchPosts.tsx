import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 60000,
  });
};
