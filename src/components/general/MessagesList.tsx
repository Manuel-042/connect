import { useNavigate } from "react-router-dom";
import messages from "../../data/messages.json"
import Message from './Message';
import { useAuthContext } from "../../context/auth-context";
import { useState } from "react";

function MessagesList() {
    const data = messages.messages;
    const { user } = useAuthContext();
    const [activeIndex, setActiveIndex] = useState(0);

    if (!user) return;

    const navigate = useNavigate();

    const handleNavigation = (user_id: string, account_id: string, index: number) => {
        navigate(`/messages/${user_id}/${account_id}`);
        setActiveIndex(index)
    };

    return (
        <div className="w-full mt-3 dark:text-neutral-300">
            {data.map((notification, index) => (
                <Message
                    key={index}
                    user_id={notification.user_id}
                    last_message={notification.last_message}
                    last_message_date={notification.last_message_date}
                    is_unread={notification.is_unread}
                    conversation={notification.conversation}
                    onClick={() => handleNavigation(notification.user_id, user?.id, index)}
                    active={index === activeIndex}
                />
            ))}
        </div>
    );
}

export default MessagesList;
