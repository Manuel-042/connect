import { LuSettings, LuArrowLeft } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../../components/UI/Button";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NotificationList from "../../components/general/NotificationList";

const NotificationPageContent = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const labels = ["All", "Verified", "Mentions"];
    

    const handleBackClick = () => {
        navigate(from, { replace: true });
    }

    return (
        <div className="w-4/5 border-r border-gray-700 pb-10">
            <div className="sticky top-0 flex flex-col bg-white dark:bg-black">
                <div className="flex items-center justify-between w-full mt-2 px-5">
                    <div className="flex items-center gap-3">

                        <div className="flex items-center justify-center" onClick={handleBackClick}>
                            <LuArrowLeft className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'cursor-pointer w-10 h-10 dark:text-neutral-200')} />
                        </div>

                        <h1 className="dark:text-neutral-300 text-2xl font-bold">Notifications</h1>
                    </div>


                    <div className="w-[10%]">
                        <LuSettings className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'ms-8 cursor-pointer w-10 h-10 dark:text-neutral-200')} />
                    </div>
                </div>

                <div className="flex">
                {labels.map((label, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`w-[33.33%] flex items-center justify-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-20`}
                    >
                        <p className={`dark:text-gray-500 text-opacity-20 py-3 ${activeIndex === index ? 'border-b-4 border-blue-500 dark:text-neutral-300' : ''}`}>{label}</p>
                    </button>
                ))}
            </div>
            </div>

            <section className="w-full pt-2 pb-40 mb-4">
                <div>
                    {activeIndex === 0 && <NotificationList />}
                </div>
            </section>
        </div>
    );
}

export default NotificationPageContent;



