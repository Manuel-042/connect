import ReactDOM from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import GifPicker, { TenorImage } from 'gif-picker-react';
import { Theme } from 'gif-picker-react';
import { useThemeContext } from '../../context/theme-context';
import Button, { buttonStyles } from '../UI/Button';
import { twMerge } from 'tailwind-merge';
import { LuXCircle } from 'react-icons/lu';
import { useGifContext } from '../../context/gif-context';

const GIFModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/messages";
    console.log({from});
    const modalRoot = document.getElementById('modal-root');
    const {theme} = useThemeContext();
    const { setGifPreview } = useGifContext();

    const tenorApiKey = import.meta.env.VITE_TENOR_API_KEY;

    if (!modalRoot) {
        return null;
    }

    const onGifClick = ({ preview }: TenorImage) => {
        console.log({preview});
        setGifPreview(preview);
        navigate(-1);
    };

    const handleCloseModal = () => {
        navigate(from, { replace: true });
    };

    if (!tenorApiKey) return null

    return ReactDOM.createPortal(
        <div className="modal flex items-center justify-center h-screen">
            <Button type="button" onClick={handleCloseModal} className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "dark:text-neutral-300 cursor-pointer bg-transparent absolute top-5 right-10")}><LuXCircle className="text-lg" /></Button>
            <div>
                <GifPicker onGifClick={onGifClick} tenorApiKey={tenorApiKey} height={600} width={600} theme={theme as Theme} />
            </div>
        </div>,
        modalRoot
    );
}

export default GIFModal