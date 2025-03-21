import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/posts";
import { useToast } from "./useToast";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (postData: FormData) => {
      const data = await createPost(postData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: Error) => {
      toast.error(`Error creating post: ${error.message}`);
      console.error("Error creating post:", error);
    },
  });
};
