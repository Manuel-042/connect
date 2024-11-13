import { ElementType } from 'react';
import { LuBookmark, LuSettings } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { buttonStyles } from '../UI/Button';

type MoreDisplayProps = {
    isOpen: boolean;
    toggleMoreDisplayOpen: () => void;
}

const MoreDisplay = ({ isOpen, toggleMoreDisplayOpen }: MoreDisplayProps) => {
    const sidebarItems = [
        { Icon: LuBookmark, url: "/i/bookmarks", title: "Bookmark" },
        { Icon: LuSettings, url: "/settings", title: "Settings and Privacy" },
    ];


    return (
        <div className={`${isOpen ? 'block' : 'hidden'} fixed top-[18rem] rounded-2xl bg-black text-white shadow-sm shadow-white px-3 py-2 z-50`}>
            <div className="flex flex-col gap-4 w-full">
                {sidebarItems.map((item, index) => (
                    <SmallSidebarItem
                        key={index}
                        Icon={item.Icon}
                        url={item.url}
                        title={item.title}
                        toggleMoreDisplayOpen={toggleMoreDisplayOpen}
                    />
                ))}
            </div>
        </div>
    );
}

type SmallSidebarItemProps = {
    Icon: ElementType;
    url: string;
    title: string;
    toggleMoreDisplayOpen: () => void;
}

const SmallSidebarItem = ({ Icon, url, title, toggleMoreDisplayOpen }: SmallSidebarItemProps) => {
    return <Link
        to={url}
        onClick={toggleMoreDisplayOpen}
        className={twMerge(
            buttonStyles({ variant: "ghost" }),
            "flex items-center gap-5 justify-start dark:hover:bg-transparent dark:focus:bg-transparent py-2 px-0"
        )}
    >
        <Icon className="w-6 h-6" />
        <div className="text-lg font-semibold dark:text-white">{title}</div>
    </Link>
}


export default MoreDisplay