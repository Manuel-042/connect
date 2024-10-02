import { useState, ReactNode, createContext, useContext } from "react";

type Theme = 'light' | 'dark';

type ThemeContextPoviderProps = {
    children: ReactNode
}

type ThemeContextType = {
    theme: Theme,
    setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export default function ThemeContextProvider({ children }: ThemeContextPoviderProps) {
    const [theme, setTheme] = useState<Theme>('dark');

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>{children}</ThemeContext.Provider>
    );
}

export function useThemeContext() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useThemeContext must be used within a ThemeContextProvider");    
    }

    return context;
}