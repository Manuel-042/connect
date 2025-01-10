import { apiPrivate } from '../api/api';
import { useAuthContext } from '../context/auth-context';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import { AxiosInstance } from 'axios';

const useApiPrivate = (): AxiosInstance => {
    const { token } = useAuthContext();
    const refresh = useRefreshToken();

    useEffect(() => {        
        if (!token) {
            console.log("No token found, skipping interceptors setup.");
            return;
        }

        const requestInterceptor = apiPrivate.interceptors.request.use(
            (config) => {
                if (!config?.headers['Authorization']) {
                    console.log("Setting Authorization header:", token);
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );


        const responseInterceptor = apiPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return apiPrivate(prevRequest);
                }
                return Promise.reject(error)
            }
        );

        return () => {
            apiPrivate.interceptors.request.eject(requestInterceptor);
            apiPrivate.interceptors.request.eject(responseInterceptor);
        };
    }, [token, refresh]);

    return apiPrivate;
}

export default useApiPrivate;

