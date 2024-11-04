import { createContext, useContext, useState } from 'react';


type TenorImagePreview = {
    url: string;
    width: number;
    height: number;
}

type GifContextType = {
    gifPreview: TenorImagePreview | null;
    setGifPreview: React.Dispatch<React.SetStateAction<TenorImagePreview | null>>
}

const GifContext = createContext<GifContextType>({} as GifContextType);

type Props = { children: React.ReactNode }

export const GifProvider = ({ children }: Props) => {
    const [gifPreview, setGifPreview] = useState<TenorImagePreview | null>(null);

    return (
        <GifContext.Provider value={{ gifPreview, setGifPreview }}>
            {children}
        </GifContext.Provider>
    );
};

// Custom hook to use the GifContext
export const useGifContext = () => useContext(GifContext);