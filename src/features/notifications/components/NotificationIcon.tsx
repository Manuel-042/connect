import { LuBellRing, LuUnlink, LuUserRound, LuPartyPopper, LuHeart, LuUserPlus, LuMessageCircle, LuTag } from 'react-icons/lu';

import { twMerge } from 'tailwind-merge';
import { buttonStyles } from '../../../components/UI/Button';

const iconMap: { [key: string]: React.ElementType } = {
    new_post_notification: LuBellRing,
    login_alert: LuUnlink,
    new_follower: LuUserRound,
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
                'cursor-pointer w-7 h-7 dark:text-white p-0'
            )}
        />
    ) : null;
};

export default NotificationIcon;
