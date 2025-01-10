import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { buttonStyles } from '../UI/Button';
import { useAuthContext } from '../../context/auth-context';

type AccountSettingProps = {
    isOpen: boolean;
    toggleAccountSettingOpen: () => void;
}

const AccountSetting = ({ isOpen, toggleAccountSettingOpen }: AccountSettingProps) => {
    const { userProfile } = useAuthContext();

    if (!userProfile) {
        return null;
    }

    console.log(userProfile);
    
    const sidebarItems = [
        { url: `/i/flow/login`, title: `Add an existing account` },
        { url: "/logout", title: `Log out @${userProfile.username}` },
    ];


    return (
        <div className={`${isOpen ? 'block' : 'hidden'} fixed bottom-[5rem] rounded-2xl bg-black text-white shadow-sm shadow-white px-3 py-3 z-50`}>
            <div className="flex flex-col gap-4 w-full">
                {sidebarItems.map((item, index) => (
                    <SmallSidebarItem
                        key={index}
                        url={item.url}
                        title={item.title}
                        toggleAccountSettingOpen={toggleAccountSettingOpen}
                    />
                ))}
            </div>
        </div>
    );
}

type SmallSidebarItemProps = {
    url: string;
    title: string;
    toggleAccountSettingOpen: () => void;
}

const SmallSidebarItem = ({ url, title, toggleAccountSettingOpen }: SmallSidebarItemProps) => {
    return <Link
        to={url}
        onClick={toggleAccountSettingOpen}
        className={twMerge(
            buttonStyles({ variant: "ghost" }),
            "flex items-center gap-5 justify-start dark:hover:bg-transparent dark:focus:bg-transparent py-1 px-2"
        )}
    >
        <div className="text-base font-semibold dark:text-white">{title}</div>
    </Link>
}

export default AccountSetting