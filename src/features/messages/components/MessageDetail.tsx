import { useEffect, useState } from "react";
import users from "../../../data/users.json"
import { LuBadgeCheck, LuDot, LuInfo } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../../../components/UI/Button";
import { Link } from "react-router-dom";
import ProfileDisplay from "../../profile/components/ProfileDisplay";
import MessageConversation from "./MessageConversation";
import messages from "../../../data/messages.json"
import MessageForm from "./MessageForm";
import { User } from "../../../types";

type MessageDetailProps = {
    user_id: string;
    account_id: string;
}

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
};

const MessageDetail = ({ user_id, account_id }: MessageDetailProps) => {
    const [user, setUser] = useState<User | any>(null);
    const [message, setMessage] = useState<MessageProps>();

    useEffect(() => {
        const foundUser = users.find(user => Number(user.user.id) === Number(user_id));
        const foundMessage = messages.messages.find(msg => Number(msg.user_id) === Number(user_id));

        if (foundUser) {
            setUser(foundUser);
        } else {
            console.error("User not found");
        }

        if (foundMessage) {
            setMessage(foundMessage);
        } else {
            console.error("Message not found for user");
        }
    }, [user_id, users, messages.messages]);

    if (!user) return

    return (
        <div className="self-start pt-2 w-full h-screen flex flex-col">
            <div className="border-b border-dark-border h-[91%] overflow-y-auto overflow-x-hidden">

                <div className="flex items-center justify-between px-3 z-10 sticky top-0 dark:bg-black dark:bg-opacity-90">
                    <h1 className="dark:text-neutral-300 font-bold text-lg">{user?.displayname}</h1>
                    <LuInfo className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'cursor-pointer w-10 h-10 dark:text-neutral-200')} />
                </div>

                <div className="mx-3 flex flex-col items-center justify-center cursor-pointer border-b pb-5 pt-2 border-gray-700 hover:bg-gray-500 hover:bg-opacity-20 ">
                    <div className="w-16 h-16 rounded-full mb-1">
                        <img src={user?.image} alt={`${user?.displayname} Profile Picture`} className="w-full h-full rounded-full" />
                    </div>

                    <Link to="/" className="group relative">
                        <div className="flex items-center gap-1 justify-center">
                            <p className=" dark:text-neutral-300 font-bold hover:underline">{user?.displayname}</p>
                            {user?.isVerified && <LuBadgeCheck className="text-primary" />}
                        </div>
                        <p className="dark:text-neutral-300 dark:text-opacity-40">@{user?.username}</p>
                        <ProfileDisplay user={user} />
                    </Link>
                    <p className="mt-3 dark:text-neutral-300 text-center ">{user?.bio}</p>
                    <div className="flex items-center justify-center gap-2 mt-3 dark:text-neutral-300 dark:text-opacity-40">
                        <p>Joined October 2020</p>
                        <LuDot />
                        <p>{`${user?.followerCount} ${user?.followerCount > 1 ? 'Followers' : 'Follower'}`}</p>
                    </div>

                </div>

                <MessageConversation conversation={message?.conversation} currentUserId={account_id} />
            </div>
            <MessageForm />
        </div>
    )
}

export default MessageDetail