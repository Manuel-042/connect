import { useQuery } from '@tanstack/react-query';
import useApiPrivate from './useApiPrivate';

export const useUserByUsername = (username: string, isLoggedInUser: boolean) => {
    const apiPrivate = useApiPrivate();

    const fetchUserByUsername = async () => {
        if (!apiPrivate) {
            throw new Error('API instance is not ready');
        }
        const response = await apiPrivate.get(`/api/users/${username}`);
        return response.data;
    };

    return useQuery({
        queryKey: ["user", username],
        queryFn: fetchUserByUsername,
        enabled: !isLoggedInUser,
    });
};
