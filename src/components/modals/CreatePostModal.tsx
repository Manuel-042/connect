import ReactDOM from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthContext } from '../../context/auth-context';
import { CreatePost } from '../../features/post';
import Button, { buttonStyles } from '../UI/Button';
import { twMerge } from 'tailwind-merge';
import { LuX } from 'react-icons/lu';
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import MobileCreatePost from '../../features/post/components/MobileCreatePost';

const CreatePostModal = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const modalRoot = document.getElementById('modal-root');
    const { profileData } = useAuthContext();

    const from = location?.state?.previousLocation || '/home';
    console.log({ from })

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

    if (!modalRoot || !profileData) {
        return null;
    }

    useEffect(() => {
        disableBodyScroll(document.body);
        return () => {
            enableBodyScroll(document.body);
        };
    }, []);

    const handleCloseModal = () => {
        navigate(from, { replace: true });
    };

    return ReactDOM.createPortal(
        <div className="modal-overlay1" onClick={handleCloseModal}>

            <div onClick={e => e.stopPropagation()} className='w-full h-screen sm:w-[50%] sm:h-auto'>
                {profileData && (
                    <div className="flex flex-col sm:-mt-52 w-full h-full px-4 py-5 gap-4 bg-black sm:rounded-2xl">
                        <div className='hidden sm:flex items-center justify-between'>
                            <Button onClick={handleCloseModal} className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "bg-transparent text-white")}><LuX className='w-48 h-48' /></Button>
                            <Button className="bg-transparent text-secondary font-semibold text-sm hover:bg-secondary-100 dark:hover:bg-opacity-15 px-3 py-1">Drafts</Button>
                        </div>
                        
                        <div className="block sm:hidden">
                            <MobileCreatePost />
                        </div>

                        <div className='hidden sm:flex'>
                            <div className="rounded-full w-10 h-10 bg-neutral-300 flex items-center justify-center cursor-pointer w-30">
                                <img src={profileData?.avatar} className="rounded-full w-full h-full object-contain object-center" alt={`${profileData?.user.username} profile image`} />
                            </div>
                            <CreatePost />
                        </div>
                    </div>
                )}
            </div>

        </div>,
        modalRoot
    );
}

export default CreatePostModal