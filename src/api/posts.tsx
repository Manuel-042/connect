import { apiPrivate } from "./api";

//Fetch all posts
export const fetchPosts = async (params: any) => {
  console.log("Called fetched posts...");
  const { data } = await apiPrivate?.get(`api/posts`, { params });
  return data;
};

//Fetch a single post by ID
export const fetchPostById = async (postId: any) => {
  const { data } = await apiPrivate?.get(`api/posts/${postId}`);
  return data;
};

//Create a new post
export const createPost = async (postData: any) => {
  const { data } = await apiPrivate?.post(`api/posts`, postData);
  return data;
};

//Delete a post
export const deletePost = async (postId: any) => {
  const { data } = await apiPrivate?.delete(`api/posts/${postId}`);
  return data;
};
