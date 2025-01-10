import ReactDOM from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import Button, { buttonStyles } from '../UI/Button';
import { twMerge } from 'tailwind-merge';
import EditProfileForm from '../../features/profile/components/EditProfileForm';
import { LuX } from 'react-icons/lu';
import { useEffect } from 'react';

const EditProfileModal = () => {
    const modalRoot = document.getElementById('modal-root');
    // const { username } = useParams();

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

    const location = useLocation();
    const navigate = useNavigate();

    const user = location.state?.user;
    const from = location.state?.previousLocation;

    console.log({ user });

    if (!modalRoot || !user) {
        return null;
    }

    const handleCloseModal = () => {
        navigate(from, { replace: true });
    };

    return ReactDOM.createPortal(
        <div className="modal-overlay1" onClick={handleCloseModal}>
            <div onClick={e => e.stopPropagation()} className='w-2/4'>
                {user && (
                    <div className='bg-black rounded-2xl w-full px-2 pt-2 pb-4'>
                        <div className='flex items-center justify-between mb-2'>
                            <div className='flex items-center justify-center gap-2'>
                                <Button onClick={handleCloseModal} className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "bg-transparent text-neutral-300")}><LuX className='w-48 h-48' /></Button>
                                <h1 className='dark:text-neutral-300 font-bold text-xl'>Edit Profile</h1>
                            </div>
                            <Button className={twMerge(buttonStyles(), 'cursor-pointer bg-white text-black hover:bg-neutral-300 font-bold')} disabled={true}>Save</Button>
                        </div>

                        <EditProfileForm displayname={user?.displayname} bio={user?.bio} coverPhoto={user?.coverPhoto} image={user?.image} />
                    </div>
                )}
            </div>
        </div>,
        modalRoot
    );
}

export default EditProfileModal