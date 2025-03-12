import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/posts";
import { CreatePostData } from "../types";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (postData: CreatePostData) => {
      const data = await createPost(postData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: Error) => {
      console.error("Error creating post:", error);
    },
  });
};
