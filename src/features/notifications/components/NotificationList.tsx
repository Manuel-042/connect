import Notification from './Notification';
import notifications from "../../../data/notifications.json";

function NotificationList() {
    const data = notifications.notifications;

    return (
        <div className="w-full dark:text-neutral-300 overflow-hidden">
            {data.map((notification, index) => (
                <Notification
                    key={index}
                    type={notification.type}
                    message={notification.message}
                    icon={notification.icon}
                    users={notification.users}
                />
            ))}
        </div>
    );
}

export default NotificationList;
