// import { useQuery } from "@tanstack/react-query";
// import { getPostsByUsername } from "../api/posts";

// export const usePostsByUsername = (username: string) => {
//   return useQuery({
//     queryKey: ["posts", username],
//     queryFn: () => getPostsByUsername(username),
//     enabled: !!username, // Only fetch if username exists
//   });
// };