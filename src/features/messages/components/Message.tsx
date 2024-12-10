import { Link } from "react-router-dom";
import users from "../../../data/users.json"
import { LuBadgeCheck, LuDot, LuMoreHorizontal } from "react-icons/lu";
import formatDate from "../../../utils/formatDate";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../../../components/UI/Button";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/auth-context";


type MessageProps = {
    user_id: string;
    last_message: string;
    last_message_date: string;
    is_unread: boolean;
    conversation: {
        message_id: string;
        sender_id: string;
        receiver_id: string;
        message: string;
        timestamp: string;
        is_read: boolean;
    }[];
    onClick: (user_id: string, account_id: any) => void;
    active: boolean;
};


type UserProps = {
    image: string;
    displayname: string;
    username: string;
    bio: string;
    followerCount: string;
    followingCount: string;
    variant?: "default" | "large";
    showBio?: boolean;
    show_creator?: boolean;
}


function Message({ user_id, last_message, last_message_date, is_unread, onClick, active }: MessageProps) {

    const [appUser, setAppUser] = useState<UserProps | any >(null);

    const { user } = useAuthContext();

    useEffect(() => {
        const foundUser = users.find(user => user.id === Number(user_id));
        setAppUser(foundUser);
    }, [user_id, users]);

    if (!user) return null;

    return (
        <div onClick={() => onClick(user_id, user?.id)}className={`px-3 py-3 hover:bg-gray-500 hover:bg-opacity-20 ${is_unread && 'bg-gray-500 bg-opacity-20'} ${active && 'bg-gray-500 bg-opacity-20 border-r-4 border-secondary'}`}>
            <div className={`group flex items-start justify-start gap-3 cursor-pointer`}>
                <Link to="/">
                    <div className="rounded-full w-10 h-10 cursor-pointer">
                        <img src={appUser?.image} className="rounded-full w-full h-full object-contain object-center" alt="user image" />
                    </div>
                </Link>
                <div className="flex items-center justify-center">
                    <div>
                        <div className="flex items-center justify-start">
                            <div className="flex items-center justify-center gap-2 cursor-pointer">
                                <p className="font-bold dark:text-white text-sm max-w-10 md:max-w-24 lg:max-w-10 xl:max-w-max overflow-hidden">{appUser?.displayname}</p>
                                {appUser?.isVerified && <LuBadgeCheck className="text-primary" />}
                                <p className="dark:text-gray-500 text-sm max-w-10 md:max-w-16 lg:max-w-10 xl:max-w-max truncate">@{appUser?.username}</p>
                            </div>
                            <p className="dark:text-gray-500"><LuDot /></p>
                            <p className="dark:text-gray-500 text-sm">{formatDate(last_message_date)}</p>
                        </div>
                        <div>
                            <p className="dark:text-white opacity-50">{last_message}</p>
                        </div>
                    </div> 
                </div>
                {is_unread && <div className="my-auto ms-auto w-[8px] h-[8px] bg-secondary rounded-full"></div>}
                <div className={`justify-self-center ${!is_unread && 'ms-auto'}  my-auto`}><LuMoreHorizontal className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "cursor-pointer p-0 w-5 h-5 dark:text-gray-500  dark:hover:text-primary")} /></div>
            </div>
        </div>
    );
}

export default Message;
