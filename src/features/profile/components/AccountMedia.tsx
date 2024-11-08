import { LuFiles } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';
import { buttonStyles } from '../../../components/UI/Button';

type Props = {
    images: string[];
}

const AccountMedia = ({ images }: Props) => {
    const count = images.length;

    return (
        <div className="p-1">
            <div className="relative w-max">
                <img
                    src={images[0]}
                    alt={`image`}
                    className="object-cover w-52 cursor-pointer h-52"
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