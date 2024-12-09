import { LuFiles } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';
import { buttonStyles } from '../../../components/UI/Button';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
    images: string[];
}

const AccountMedia = ({ images }: Props) => {
    const count = images.length;
    const navigate = useNavigate();
    const location = useLocation();

    const handleShowPost = () => {
        navigate(`/post/102/photo/0`, { state: { previousLocation: location.pathname }})
    }

    return (
        <div className="p-1">
            <div className="relative w-max" onClick={handleShowPost}>
                <img
                    src={images[0]}
                    alt={`image`}
                    className="object-cover w-44 cursor-pointer h-44"
                />
                {count > 1 && (
                    <div className="absolute right-1 bottom-0">
                        <LuFiles className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "w-11 h-11 cursor-pointer dark:hover:bg-transparent")} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default AccountMedia