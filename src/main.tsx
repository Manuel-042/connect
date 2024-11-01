import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ThemeContextProvider from './context/theme-context.tsx'
import AuthProvider from "./context/auth-context.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
