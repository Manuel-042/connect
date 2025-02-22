import { useNavigate } from "react-router-dom";
import messages from "../../../data/messages.json"
import Message from './Message';
import { useAuthContext } from "../../../context/auth-context";
import { useState } from "react";

function MessagesList() {
    const data = messages.messages;
    const { profileData } = useAuthContext();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const navigate = useNavigate();

    const handleNavigation = (user_id: string, account_id: any, index: number) => {
        navigate(`/messages/${user_id}/${account_id}`);
        setActiveIndex(index)
    };

    if (!profileData) return null ;

    return (
        <div className="w-full mt-3 md:overflow-hidden dark:text-white">
            {data.map((notification, index) => (
                <Message
                    key={index}
                    user_id={notification.user_id}
                    last_message={notification.last_message}
                    last_message_date={notification.last_message_date}
                    is_unread={notification.is_unread}
                    conversation={notification.conversation}
                    onClick={() => handleNavigation(notification.user_id, profileData?.user.id, index)}
                    active={index === activeIndex}
                />
            ))}
        </div>
    );
}

export default MessagesList;
