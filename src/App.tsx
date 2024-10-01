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

function App() {
  const {theme, setTheme} = useThemeContext()

  return (
    <div className={theme}>
      <div className="container mx-auto dark:bg-neutral-900">
        <Routes>
          <Route index element={<Home />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/forgot-password" element={<Forgot />}/>
          <Route path="/verify-code" element={<OTPVerification email={"ebukaezeanya14@gmail.com" }/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path="/reset-success" element={<Confirmation/>}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
