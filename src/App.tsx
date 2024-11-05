import { Route, Routes } from "react-router-dom"
import NotFound from "./pages/NotFound"
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import Forgot from "./pages/auth/ForgotPassword/Forgot"
import OTPVerification from "./pages/auth/ForgotPassword/OTPVerification"
import ResetPassword from "./pages/auth/ForgotPassword/ResetPassword"
import Confirmation from "./pages/auth/ForgotPassword/Confirmation"
import { useThemeContext } from "./context/theme-context"
import { ProtectedRoute } from "./Routes/ProtectedRoute"
import { useEffect } from "react"
import api from "./api/api"
import { AxiosError } from "axios"
import PostModal from "./components/general/PostModal"
import Layout from "./components/UI/Layout"
import HomePageContent from "./pages/HomePage/HomePageContent"
import HomeRightContent from "./pages/HomePage/HomeRightContent"
import SearchPageContent from "./pages/SearchPage/SearchPageContent"
import SearchRightContent from "./pages/SearchPage/SearchRightContent"
import ConnectPageContent from "./pages/ConnectPage/ConnectPageContent"
import ConnectRightContent from "./pages/ConnectPage/ConnectRightContent"
import TrendsPageContent from "./pages/TrendsPage/TrendsPageContent"
import TrendsRightContent from "./pages/TrendsPage/TrendsRightContext"
import NotificationPageContent from "./pages/NotificationPage/NotificationPageContent"
import NotificationRightContent from "./pages/NotificationPage/NotificationRightContent"
import MessagePageContent from "./pages/MessagePage/MessagePageContent"
import MessageRightContent from "./pages/MessagePage/MessageRightContent"
import ProfilePageContent from "./pages/ProfilePage/ProfilePageContent"
import ProfileRightContent from "./pages/ProfilePage/ProfileRightContent"
import GIFModal from "./components/general/GIFModal"
import { GifProvider } from "./context/gif-context"

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
    <div className={theme}>
      <GifProvider>
        <div className="container mx-auto dark:bg-black">
          <Routes>

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Layout rightComponent={HomeRightContent} />}>
                <Route index element={<HomePageContent />} />
              </Route>

              <Route path="post/:postId/photo/:photoId" element={<PostModal />} />

              <Route path="explore" element={<Layout rightComponent={SearchRightContent} />}>
                <Route index element={<SearchPageContent />} />
              </Route>

              <Route path="i/connect_people" element={<Layout rightComponent={ConnectRightContent} />}>
                <Route index element={<ConnectPageContent />} />
              </Route>

              <Route path="i/trends" element={<Layout rightComponent={TrendsRightContent} />}>
                <Route index element={<TrendsPageContent />} />
              </Route>

              <Route path="notifications" element={<Layout rightComponent={NotificationRightContent} />}>
                <Route index element={<NotificationPageContent />} />
              </Route>

              <Route path="messages" element={<Layout rightComponent={MessageRightContent} />}>
                <Route index element={<MessagePageContent />} />
              </Route>

              <Route path="messages/:user_id/:account_id" element={<Layout rightComponent={MessageRightContent} />}>
                <Route index element={<MessagePageContent />} />
              </Route>

              <Route path="i/foundmedia/search" element={<GIFModal />} />

              <Route path="/:username" element={<Layout rightComponent={ProfileRightContent} />}>
                <Route index element={<ProfilePageContent />} />
              </Route>

            </Route>

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<Forgot />} />
            <Route path="/verify-code" element={<OTPVerification email={"ebukaezeanya14@gmail.com"} />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-success" element={<Confirmation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </GifProvider>
    </div>
  )
}

export default App
