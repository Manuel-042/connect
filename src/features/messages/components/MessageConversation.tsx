import React from 'react';
import MessageBubble from './MessageBubble';

interface Conversation {
    message_id: string;
    sender_id: string;
    receiver_id: string;
    message: string;
    timestamp: string;
    is_read: boolean;
}

interface MessageConversationProps {
    conversation: Conversation[] | undefined;
    currentUserId: string;
}

const Conversation: React.FC<MessageConversationProps> = ({ conversation, currentUserId }) => {
    return (
        <div className="p-4 space-y-2 flex flex-col">
            {conversation?.map((msg) => (
                <MessageBubble key={msg.message_id} message={msg} currentUserId={currentUserId} />
            ))}
        </div>
    );
};

export default Conversation;
