import { Link } from "react-router-dom";
import users from "../../data/users.json"
import { LuBadgeCheck, LuDot, LuMoreHorizontal } from "react-icons/lu";
import formatDate from "../../utils/formatDate";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../UI/Button";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/auth-context";

type Conversation = {
    message_id: string;
    sender_id: string;
    receiver_id: string;
    message: string;
    timestamp: string;
    is_read: boolean;

};

type MessageProps = {
    user_id: string;
    last_message: string;
    last_message_date: string;
    is_unread: boolean;
    conversation: Conversation[];
    onClick: (user_id: string, account_id: string) => void;
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

    const [appUser, setAppUser] = useState<UserProps | any | null>(null);

    const { user } = useAuthContext();

    if (!user) return;

    useEffect(() => {
        const foundUser = users.find(user => user.id === Number(user_id));
        setAppUser(foundUser);
    }, [user_id, users]);

    return (
        <div onClick={() => onClick(user_id, user?.id)}className={`px-3 py-3 hover:bg-gray-500 hover:bg-opacity-20 ${is_unread && 'bg-gray-500 bg-opacity-20'} ${active && 'bg-gray-500 bg-opacity-20 border-r-2 border-secondary'}`}>
            <div className={`group flex items-start justify-start gap-3 cursor-pointer`}>
                <Link to="/">
                    <div className="rounded-full w-10 h-10 bg-neutral-300 flex items-center justify-center cursor-pointer">
                        <img src={appUser?.image} className="rounded-full w-full h-full object-contain object-center" alt="user image" />
                    </div>
                </Link>
                <div className="flex items-center justify-center">
                    <div>
                        <div className="flex items-center justify-start">
                            <div className="flex items-center justify-center gap-2 cursor-pointer">
                                <p className="font-bold dark:text-neutral-300">{appUser?.displayname}</p>
                                {appUser?.isVerified && <LuBadgeCheck className="text-primary" />}
                                <p className="dark:text-gray-500">@{appUser?.username}</p>
                            </div>
                            <p className="dark:text-gray-500"><LuDot /></p>
                            <p className="dark:text-gray-500">{formatDate(last_message_date)}</p>
                        </div>
                        <div>
                            <p className="dark:text-neutral-300 opacity-50">{last_message}</p>
                        </div>
                    </div>
                </div>
                {is_unread && <LuDot className="w-10 h-10 text-blue-500" />}
                <div className="hidden group-hover:block justify-self-end ms-auto"><LuMoreHorizontal className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer  dark:text-gray-500  dark:hover:text-primary")} /></div>
            </div>
        </div>
    );
}

export default Message;
