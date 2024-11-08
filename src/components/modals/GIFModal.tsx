import ReactDOM from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import GifPicker, { TenorImage } from 'gif-picker-react';
import { Theme } from 'gif-picker-react';
import { useThemeContext } from '../../context/theme-context';
import Button, { buttonStyles } from '../UI/Button';
import { twMerge } from 'tailwind-merge';
import { LuX } from 'react-icons/lu';
import { useGifContext } from '../../context/gif-context';
import { useEffect } from 'react';

const GIFModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.previousLocation
    const modalRoot = document.getElementById('modal-root');
    const { theme } = useThemeContext();
    const { setGifPreview } = useGifContext();

    const tenorApiKey = import.meta.env.VITE_TENOR_API_KEY;

    useEffect(() => {
        const appRoot = document.getElementById("root");
        const modalRoot = document.getElementById("modal-root");

        const appInnerDiv = appRoot?.firstElementChild;

        if (appInnerDiv && modalRoot && appInnerDiv.classList.contains("dark")) {
            modalRoot.classList.add("dark");
        } else if (modalRoot) {
            modalRoot.classList.remove("dark");
        }
    }, []);

    if (!modalRoot) {
        return null;
    }

    const onGifClick = ({ preview }: TenorImage) => {
        console.log({ preview });
        setGifPreview(preview);
        navigate(-1);
    };

    const handleCloseModal = () => {
        navigate(from, { replace: true });
    };

    if (!tenorApiKey) return null

    return ReactDOM.createPortal(
        <div className="modal-overlay1" onClick={handleCloseModal}>
                <Button
                    type="button"
                    onClick={handleCloseModal}
                    className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "close-button bg-gray-400 hover:bg-transparent text-white w-10 h-10")}
                >
                    <LuX className="text-2xl" />
                </Button>
            <div onClick={(e) => e.stopPropagation()}>
                <GifPicker
                    onGifClick={onGifClick}
                    tenorApiKey={tenorApiKey}
                    height={600}
                    width={600}
                    theme={theme as Theme}
                />
            </div>
        </div>,
        modalRoot
    );
    
}

export default GIFModal