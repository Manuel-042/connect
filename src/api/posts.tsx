import { apiPrivate } from "./api";

//Fetch all posts
export const fetchPosts = async () => {
  console.log("Called fetched posts...");
  const { data } = await apiPrivate?.get(`api/posts`);
  return data;
};

export const fetchPostsByUserId = async (userId: number) => {
  console.log("Called fetchPostsByUserId...");
  const { data } = await apiPrivate?.get(`api/users/${userId}/posts`);
  return data;
};

export const fetchPostById = async (postId: number) => {
  console.log("Called fetchPostById...");
  const { data } = await apiPrivate?.get(`api/posts/${postId}`);
  return data;
};

//Create a new post
export const createPost = async (postData: FormData) => {
  const { data } = await apiPrivate.post('api/post', postData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

//Delete a post
export const deletePost = async (postId: any) => {
  const { data } = await apiPrivate?.delete(`api/posts/${postId}`);
  return data;
};
