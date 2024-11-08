import ReactDOM from 'react-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button, { buttonStyles } from '../UI/Button';
import { twMerge } from 'tailwind-merge';
import { LuX } from 'react-icons/lu';
import { useEffect } from 'react';


const HeaderPhotoModal = () => {
    const modalRoot = document.getElementById('modal-root');
    const { username } = useParams();
    const location = useLocation();
    const from = location?.state?.previousLocation
    const navigate = useNavigate();

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

    const coverPhoto = location.state?.coverPhoto;

    if (!modalRoot) {
        return null;
    }

    const handleCloseModal = () => {
        navigate(from, { replace: true });
    };

    return ReactDOM.createPortal(
        <div className="modal-overlay2" onClick={handleCloseModal}>
            <Button type="button" onClick={handleCloseModal} className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "close-button bg-transparent hover:bg-gray-400 hover:bg-opacity-10 text-white w-10 h-10")}><LuX className="text-2xl" /></Button>
            <div onClick={e => e.stopPropagation()}>
                {coverPhoto ? (
                    <img src={coverPhoto} alt={`${username} cover photo`} className='w-full h-[28rem] object-contain' />
                ) : (
                    <p>No cover photo available</p>
                )}
            </div>
        </div>,
        modalRoot
    );
}

export default HeaderPhotoModal