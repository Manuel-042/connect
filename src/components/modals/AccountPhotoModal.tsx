import ReactDOM from 'react-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button, { buttonStyles } from '../UI/Button';
import { twMerge } from 'tailwind-merge';
import { LuX } from 'react-icons/lu';
import { useEffect } from 'react';

const AccountPhotoModal = () => {
    const modalRoot = document.getElementById('modal-root');
    const { username } = useParams();
    const location = useLocation();
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

    const profilePhoto = location.state?.profilePhoto;
    const from = location.state?.previousLocation;

    if (!modalRoot) {
        return null;
    }

    const handleCloseModal = () => {
        navigate(from, { replace: true });
    };

    return ReactDOM.createPortal(
        <div className="modal-overlay2" onClick={handleCloseModal}>
            <Button type="button" onClick={handleCloseModal} className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "close-button bg-transparent hover:bg-opacity-10 hover:bg-gray-400 text-white w-10 h-10")}><LuX className="text-2xl" /></Button>
            <div onClick={e => e.stopPropagation()}>
                {profilePhoto ? (
                    <img src={profilePhoto} alt={`${username} cover photo`} className='w-[20rem] h-[20rem] rounded-full object-contain' />
                ) : (
                    <p>No cover photo available</p>
                )}
            </div>
        </div>,
        modalRoot
    );
}

export default AccountPhotoModal