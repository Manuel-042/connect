import { LuBellRing, LuUnlink, LuUser2, LuPartyPopper, LuHeart, LuUserPlus, LuMessageCircle, LuTag } from 'react-icons/lu';

import { twMerge } from 'tailwind-merge';
import { buttonStyles } from '../UI/Button';

const iconMap: { [key: string]: React.ElementType } = {
    new_post_notification: LuBellRing,
    login_alert: LuUnlink,
    new_follower: LuUser2,
    anniversary: LuPartyPopper,
    friend_anniversary: LuPartyPopper,
    like: LuHeart,
    comment: LuMessageCircle,
    tagged_photo: LuTag,
    mention: LuUserPlus,
};

interface NotificationIconProps {
    type: string;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ type }) => {
    const IconComponent = iconMap[type] || null;

    return IconComponent ? (
        <IconComponent
            className={twMerge(
                buttonStyles({ variant: 'blueghost', size: 'icon' }),
                'cursor-pointer w-11 h-11 dark:text-neutral-200'
            )}
        />
    ) : null;
};

export default NotificationIcon;
