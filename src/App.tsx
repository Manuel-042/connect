import { Route, Routes } from "react-router-dom"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import Forgot from "./pages/auth/ForgotPassword/Forgot"
import OTPVerification from "./pages/auth/ForgotPassword/OTPVerification"
import ResetPassword from "./pages/auth/ForgotPassword/ResetPassword"
import Confirmation from "./pages/auth/ForgotPassword/Confirmation"
import { useThemeContext } from "./context/theme-context"
import { ProtectedRoute } from "./Routes/ProtectedRoute"
import AuthProvider from "./context/auth-context"
import { useEffect } from "react"
import api from "./api/api"
import { AxiosError } from "axios"

function App() {
  const { theme } = useThemeContext();

  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const response = await api.get('api/set-csrf');
        console.log(response.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (!err.response) {
            console.error("No server response")
          } else {
            console.error(err.response?.data);  
          }
        } else {
          console.error("Non Axios error:", err)
        }
      }
    }

    fetchCSRFToken();
  }, []);

  

  return (
    <AuthProvider>
      <div className={theme}>
        <div className="container mx-auto dark:bg-neutral-900">
          <Routes>
            <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<Forgot />} />
            <Route path="/verify-code" element={<OTPVerification email={"ebukaezeanya14@gmail.com"} />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-success" element={<Confirmation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  )
}

export default App
