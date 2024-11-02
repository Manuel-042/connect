import { LuSettings, LuArrowLeft } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../../components/UI/Button";
import { useLocation, useNavigate } from "react-router-dom";
import SearchMain from "../../components/general/SearchMain";

const TrendsPageContent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleBackClick = () => {
        navigate(from, { replace: true });
    }

    return (
        <div className="w-4/5 border-r border-gray-700 pb-10">
            <div className="sticky top-0 flex flex-col bg-black pb-2">
                <div className="flex items-center justify-between w-full mt-2 px-5">
                    <div className="flex items-center gap-3">

                        <div className="flex items-center justify-center" onClick={handleBackClick}>
                            <LuArrowLeft className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'cursor-pointer w-10 h-10 text-neutral-200')} />
                        </div>

                        <h1 className="dark:text-neutral-300 text-2xl font-bold">Trends</h1>
                    </div>


                    <div className="w-[10%]">
                        <LuSettings className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'ms-8 cursor-pointer w-10 h-10 text-neutral-200')} />
                    </div>
                </div>
            </div>

            <SearchMain />

        </div>
    );
}

export default TrendsPageContent;




