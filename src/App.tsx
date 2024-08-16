import { Route, Routes } from "react-router-dom"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import Signup from "./pages/Signup"

function App() {

  return (
    <div className="container mx-auto">
      <Routes>
        <Route index element={<Home />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  )
}

export default App
