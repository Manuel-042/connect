import React, { useState } from 'react';
import messageDateFormat from '../../utils/MessageDateFormat';
import Button, { buttonStyles } from '../UI/Button';
import { twMerge } from 'tailwind-merge';
import { LuSmilePlus, LuMoreHorizontal } from 'react-icons/lu';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useThemeContext } from '../../context/theme-context';
import { Theme } from 'emoji-picker-react';
import { Link } from 'react-router-dom';

interface Message {
    message_id: string;
    sender_id: string;
    receiver_id: string;
    message: string;
    timestamp: string;
    is_read: boolean;
}

interface MessageProps {
    message: Message;
    currentUserId: string;
}


const MessageBubble: React.FC<MessageProps> = ({ message, currentUserId }) => {
    const isSender = message.sender_id === currentUserId;
    const [showReaction, setShowReaction] = useState(false);
    const [reaction, setReaction] = useState("");
    const [showReactionDiv, setShowReactionDiv] = useState(false);
    const { theme } = useThemeContext();

    const handleReaction = ({ emoji }: EmojiClickData) => {
        setReaction(emoji)
        setShowReaction(!showReaction);
    }

    const handleShowReaction = () => {
        setShowReaction(!showReaction)
    }

    const handleReactionUndo = (event: React.MouseEvent) => {
        event.stopPropagation();
        setReaction("");
        setShowReactionDiv(!showReactionDiv);
    }


    return (
        <div
            className={`flex relative flex-col ${isSender ? 'self-end' : 'self-start'} mb-2`}
        >
            {showReaction && <div className='mb-2'><EmojiPicker theme={theme as Theme} reactionsDefaultOpen={true} onReactionClick={handleReaction} /></div>}
            <div className='group flex items-center gap-2'>
                {isSender && (
                    <div className={`invisible group-hover:visible flex items-center gap-1 ms-auto`}>
                        <Button type="button" onClick={handleShowReaction} className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "dark:text-gray-400 text-opacity-10 cursor-pointer bg-transparent")}><LuSmilePlus className="text-lg" /></Button>
                        <Button type="button" className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "dark:text-gray-400 text-opacity-10 cursor-pointer bg-transparent")}><LuMoreHorizontal className="text-lg" /></Button>
                    </div>
                )}
                <div
                    className={`p-3 ${isSender
                        ? 'bg-secondary text-white rounded-t-full rounded-bl-full ms-auto'
                        : 'bg-gray-400 text-black font-semibold rounded-t-full me-auto rounded-br-full'
                        } cursor-pointer`}
                    style={{ maxWidth: 'max-content' }}
                >
                    <p>{message.message}</p>
                </div>
                {!isSender && (
                    <div className={`invisible group-hover:visible flex items-center gap-1 me-auto`}>
                        <Button type="button" onClick={handleShowReaction} className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "dark:text-gray-400 text-opacity-10 cursor-pointer bg-transparent")}><LuSmilePlus className="text-lg" /></Button>
                        <Button type="button" className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "dark:text-gray-400 text-opacity-10 cursor-pointer bg-transparent")}><LuMoreHorizontal className="text-lg" /></Button>
                    </div>
                )}
            </div>
            {reaction && <div onClick={() => setShowReactionDiv(!showReactionDiv)} className={`${isSender ? 'ms-auto' : 'me-auto'} text-2xl cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 w-max rounded-full p-1`}>{reaction}</div>}
            {showReactionDiv && (
                <div className="absolute cursor-pointer z-10 shadow shadow-neutral-50 bg-black rounded-lg py-4 px-3 left-0 top-20 mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center justify-between gap-3">
                        <Link to="/" className="flex items-center gap-3">
                            <div className='text-2xl'>
                                {reaction}
                            </div>
                            <div className='flex items-center gap-3'>
                                <div className="w-10 h-10 rounded-full">
                                    <img className="rounded-full" src="https://loremflickr.com/200/200?random=22" alt="profile image" />
                                </div>
                                <div>
                                    <p className="dark:text-neutral-300 font-bold">Ozzy</p>
                                    <p className="dark:text-gray-400 -mt-1">@ozzyetomi</p>
                                </div>
                            </div>
                        </Link>
                        <Button
                            onClick={handleReactionUndo}
                            className="bg-transparent font-bold text-secondary hover:bg-opacity-5 dark:hover:text-neutral-300"
                        >
                            Undo
                        </Button>
                    </div>
                </div>
            )}
            <span className={`text-xs cursor-pointer dark:text-gray-500 mt-1 hover:underline ${isSender ? 'self-end' : 'self-start'}`}>
                {messageDateFormat(new Date(message.timestamp))}
            </span>
        </div>
    );
};

export default MessageBubble;
