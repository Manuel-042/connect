import useApiPrivate from "../hooks/useApiPrivate";

const apiPrivate = useApiPrivate();

// Fetch user details by username
export const getUserByUsername = (username: string) =>
    apiPrivate.get(`/users/${username}`).then((res) => res.data);


