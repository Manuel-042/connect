import NotificationIcon from "./NotificationIcon";
import { Link } from "react-router-dom";

type User = {
    username: string;
    image: string;
    isVerified: boolean;
};

type NotificationProps = {
    type: string;
    message: string;
    icon: string;
    users?: User[];
};


function Notification({ type, message, users }: NotificationProps) {
    return (
        <Link to="/">
            <div className="flex items-start justify-center px-6 py-3 gap-3 border-b border-dark-border">

                <div>
                    <NotificationIcon type={type} />
                </div>

                <div className="flex-grow">

                    {users && <div className="flex items-center mb-2 gap-2">
                        {((type === "new_post_notification" || type === "new_follower") && users) ? (
                            users.map((usr, index) => (
                                <img
                                    key={index}
                                    src={usr.image}
                                    alt={usr.username}
                                    className="w-8 h-8 rounded-full "
                                />
                            ))
                        ) : (
                            null
                        )}
                    </div>}
                    
                    <p className="dark:text-white font-semibold text-sm">{message}</p>
                </div>

            </div>
        </Link>
    );
}

export default Notification;
