import { LuLeaf, LuSettings } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import Button, { buttonStyles } from "../../components/UI/Button";
import { useEffect, useState } from "react";
import { NotificationList } from "../../features/notifications/index";
import { useAuthContext } from "../../context/auth-context";
import { UserProps } from "../../types";
import users from "../../data/users.json"
import { Link, useLocation } from "react-router-dom";

const NotificationPageContent = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { user } = useAuthContext();
    const [appUser, setAppUser] = useState<UserProps | null>(null);
    const location = useLocation();

    if (!user) return null;

    useEffect(() => {
        const foundUser = users.find(usr => usr.id === Number(user.id));
        if (!foundUser) {
            return
        }
        setAppUser(foundUser);
    }, [user])

    const labels = ["All", "Verified", "Mentions"];

    return (
        <>
            <div className="md:sticky top-0 z-30 flex flex-col bg-white dark:bg-black dark:bg-opacity-90">
                <div className="flex items-center justify-between w-full my-3 px-5">

                    <div className="flex items-center gap-5 md:gap-3">
                        <Button className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "md:hidden p-0 bg-transparent hover:bg-transparent w-8 h-8")}>
                        <img
                            src={appUser?.image}
                            alt={`${appUser?.displayname} profile picture`}
                            className="w-full h-full rounded-full object-cover"
                        />
                        </Button>

                        <h1 className="dark:text-white text-base md:text-xl font-bold">Notifications</h1>
                    </div>

                    <div>
                        <LuSettings className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'cursor-pointer w-6 h-6 md:w-7 md:h-7 p-1 dark:text-white text-base')} />
                    </div>
                </div>

                <div className="flex border-b border-dark-border">
                    {labels.map((label, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`flex flex-1 items-center justify-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-20 dark:focus:bg-transparent`}
                        >
                            <p className={`dark:text-gray-500 text-opacity-20 py-3 px-2 ${activeIndex === index ? 'border-b-4 border-secondary dark:text-white' : ''}`}>{label}</p>
                        </button>
                    ))}
                </div>
            </div>

            <section className="w-full mb-20">
                <div>
                    {activeIndex === 0 && <NotificationList />}
                </div>
            </section>

            <div className="sm:hidden rounded-full w-14 h-14 fixed bottom-20 right-5 z-10 bg-secondary flex shadow-sm shadow-white items-center justify-center">
                <Link to="/compose/post" state={{ previousLocation: location.pathname }}>
                    <LuLeaf className="text-2xl text-white" />
                </Link>
            </div>
        </>
    );
}

export default NotificationPageContent;




