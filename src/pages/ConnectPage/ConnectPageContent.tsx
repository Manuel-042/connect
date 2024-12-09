import { LuSettings, LuArrowLeft } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../../components/UI/Button";
import { useState } from "react";
import {SuggestedUsers} from "../../features/connect/index";
import {CreatorsList} from "../../features/connect/index";
import { useLocation, useNavigate } from "react-router-dom";

const ConnectPageContent = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const labels = ["Who to follow", "Creators for you"];

    const handleTabClick = (index: number) => {
        setActiveIndex(index);

        if (index === 1) {
            navigate("/i/connect_people?is_creator_only=true", { replace: true });
        } else {
            navigate("/i/connect_people", { replace: true });
        }
    };

    const handleBackClick = () => {
        navigate(from, { replace: true });
    }

    return (
        <div className="pb-10">
            <div className="sticky top-0 flex z-10 pb-2 flex-col bg-black dark:bg-opacity-90">
                <div className="flex items-center justify-between w-full mt-2 px-5">
                    <div className="flex items-center gap-3">

                        <div className="flex items-center justify-center" onClick={handleBackClick}>
                            <LuArrowLeft className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'cursor-pointer w-10 h-10 text-white')} />
                        </div>

                        <h1 className="dark:text-white text-2xl font-bold">Connect</h1>
                    </div>


                    <div className="w-[10%]">
                        <LuSettings className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'ms-8 cursor-pointer w-10 h-10 text-white')} />
                    </div>
                </div>
            </div>

            <div className="flex">
                {labels.map((label, index) => (
                    <button
                        key={index}
                        onClick={() => handleTabClick(index)}
                        className={`w-[50%] flex items-center justify-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-20`}
                    >
                        <p className={`dark:text-gray-500 text-opacity-20 py-3 ${activeIndex === index ? 'border-b-4 border-secondary dark:text-white' : ''}`}>{label}</p>
                    </button>
                ))}
            </div>

            <section className="w-full pt-2 pb-40 mb-4">
                <div>
                    {activeIndex === 0 && <SuggestedUsers />}
                    {activeIndex === 1 && <CreatorsList />}
                </div>
            </section>
        </div>
    );
}

export default ConnectPageContent;




