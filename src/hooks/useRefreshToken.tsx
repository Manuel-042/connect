import api from "../api/api"
import { useAuthContext } from "../context/auth-context"


const useRefreshToken = () => {
    const { setToken, decodeToken } = useAuthContext()

    const refresh = async () => {
        const response = await api.get('api/token/refresh');
        if (response) {
            console.log(response.data)
            setToken(response.data.accessToken)
            decodeToken(response.data.accessToken)
        }
        return response.data.accessToken
    }

    return refresh;
}

export default useRefreshToken;