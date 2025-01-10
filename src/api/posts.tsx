// import useApiPrivate from "../hooks/useApiPrivate";

//const apiPrivate = useApiPrivate();

// Fetch all posts
// export const fetchPosts = async (params: any) => {
//     const { data } = await apiPrivate?.get(`api/posts`, { params });
//     return data; 
// };

// Fetch posts by username
//export const getPostsByUsername = (username: string) => apiPrivate.get(`/posts?username=${username}`).then((res) => res.data);

// Fetch a single post by ID
// export const fetchPostById = async (postId: any) => {
//     const { data } = await apiPrivate?.get(`api/posts/${postId}`);
//     return data;
// };

// Create a new post
// export const createPost = async (postData: any) => {
//     const { data } = await apiPrivate?.post(`api/posts`, postData);
//     return data;
// };

// Delete a post
// export const deletePost = async (postId: any) => {
//     const { data } = await apiPrivate?.delete(`api/posts/${postId}`);
//     return data;
// };