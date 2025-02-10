import api from "../api/api"
import { useAuthContext } from "../context/auth-context"


const useRefreshToken = () => {
    const { setToken, decodeToken } = useAuthContext()

    const refresh = async () => {
        const response = await api.post('api/token/refresh');
        if (response) {
            console.log({"refresh token data":response.data})
            setToken(response.data.access)
            decodeToken(response.data.access)
        }
        return response.data.access
    }

    return refresh;
}

export default useRefreshToken;