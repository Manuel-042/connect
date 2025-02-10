import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ThemeContextProvider from "./context/theme-context.tsx";
import AuthProvider from "./context/auth-context.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeContextProvider>
          <AuthProvider>
            <App />
            <ReactQueryDevtools />
          </AuthProvider>
        </ThemeContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
