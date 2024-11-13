import { ElementType } from 'react';
import { UserProps } from '../../types';
import { formatCount } from '../../utils/formatCount';
import { LuUserPlus2, LuBookmark, LuSettings, LuLogOut, LuPlusCircle } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import Button, { buttonStyles } from '../UI/Button';


type MobileSideBarProps = {
    isOpen: boolean;
    onClose: () => void;
    user: UserProps
}

const MobileSidebar = ({ isOpen, onClose, user }: MobileSideBarProps) => {

    const sidebarItems = [
        { Icon: LuUserPlus2, url: `/${user.username}`, title: "Profile" },
        { Icon: LuBookmark, url: "/i/bookmarks", title: "Bookmark" },
        { Icon: LuSettings, url: "/settings", title: "Settings and Privacy" },
        { Icon: LuLogOut, url: "/logout", title: "Logout" }
    ];


    return (
        <div className={`fixed top-0 z-50 overflow-hidden left-0 h-full w-full max-w-xs bg-overlay transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
            }`} onClick={onClose}>
            <div className={`w-[85%] bg-black h-full shadow-md shadow-white`}>
                <div className="p-4 text-white">
                    <div className='flex items-start justify-between'>
                        <img src={user.image} alt={`${user.displayname} profile`} className="rounded-full w-10 h-10 mb-1" />
                        <Button  className={twMerge(buttonStyles({ variant: "ghost" }), "bg-transparent dark:focus:bg-transparent p-0")}><LuPlusCircle className="text-2xl"/></Button>
                    </div>
                    <h2 className='font-extrabold'>{user.displayname}</h2>
                    <p className='text-sm text-dark-text mb-2'>@{user.username}</p>

                    <div className='flex items-center gap-4 text-sm'>
                        <p className='text-dark-text'><span className='text-white'>{formatCount(user.followingCount)}</span> Following</p>
                        <p className='text-dark-text'><span className='text-white'>{formatCount(user.followerCount)}</span> Followers</p>
                    </div>

                    <nav className="flex flex-col gap-3 w-full mt-7">
                        {sidebarItems.map((item, index) => (
                            <SmallSidebarItem
                                key={index}
                                Icon={item.Icon}
                                url={item.url}
                                title={item.title}
                            />
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}

type SmallSidebarItemProps = {
    Icon: ElementType;
    url: string;
    title: string;
}

const SmallSidebarItem = ({ Icon, url, title }: SmallSidebarItemProps) => {
    return <Link
        to={url}
        className={twMerge(
            buttonStyles({ variant: "ghost" }),
            "flex items-center gap-3 justify-start dark:focus:bg-transparent py-2 px-0"
        )}
    >
        <Icon className="w-6 h-6" />
        <div className="text-lg font-semibold dark:text-white">{title}</div>
    </Link>
}

export default MobileSidebar