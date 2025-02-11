import { LuSearch, LuSettings, LuArrowLeft, LuCircleX, LuMailPlus } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import Button, { buttonStyles } from "../../components/UI/Button";
import { useState } from "react";
import { MessagesList } from "../../features/messages/index";
import { useAuthContext } from "../../context/auth-context";
import { Link } from "react-router-dom";

const MessagePageContent = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [searchContent, setSearchContent] = useState("");
    const { profileData } = useAuthContext();

    if (!profileData) return null;

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const val = evt.target?.value;
        setSearchContent(val);
    };

    const clearSearch = (evt: React.MouseEvent) => {
        evt.preventDefault();
        evt.stopPropagation();
        setSearchContent("");
    };

    return (
        <div className="w-screen md:w-[600px] lg:w-[400px] xl:w-[500px] mb-10 md:mb-0 lg:max-h-screen lg:overflow-y-auto">

            <div className="md:sticky top-0 z-20 bg-white dark:bg-black dark:bg-opacity-70 flex items-center justify-between py-3 px-4" >
                <div className="flex items-center gap-5">
                    <Button className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "md:hidden p-0 bg-transparent hover:bg-transparent w-8 h-8")}>
                        <img
                            src={profileData?.avatar}
                            alt={`${profileData?.user.username} profile picture`}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </Button>

                    <h1 className="dark:text-white text-base md:text-xl font-bold">Messages</h1>
                </div>

                <div className="flex items-center gap-1">
                    <LuSettings className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'cursor-pointer w-7 h-7 p-1 dark:text-white text-base')} />
                    <LuMailPlus className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'hidden md:blockcursor-pointer w-10 h-10 dark:text-white')} />
                </div>
            </div>

            <div className="flex items-center justify-between w-full mt-2 px-2">
                {isFocused && (
                    <div className="flex items-center justify-center">
                        <LuArrowLeft className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'p-1 cursor-pointer w-7 h-7 dark:text-white')} />
                    </div>
                )}

                <form className={`flex px-4 items-center rounded-full flex-grow justify-start border border-dark-border`}
                    onFocus={handleFocus} onBlur={handleBlur}>
                    <div className="">
                        <LuSearch className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), `p-0 w-4 h-4 hover:bg-transparent ${isFocused ? 'text-primary' : 'dark:text-neutral-200'}`)} />
                    </div>
                    <input
                        className="relative bg-transparent px-2 py-2.5 md:py-3 border-0 text-sm md:text-base outline-0 dark:text-white"
                        placeholder="Search Direct Messages"
                        name="search"
                        value={searchContent}
                        onChange={handleChange}
                    />
                    {searchContent && (<div className="absolute top-50 right-5 z-30" onMouseDown={(event) => event.preventDefault()} onClick={clearSearch}><LuCircleX className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'p-1 cursor-pointer w-7 h-7 text-white')} /></div>)}
                </form>
            </div>

            <section className="w-full mb-4">
                <MessagesList />
            </section>

            <div className="sm:hidden rounded-full w-14 h-14 fixed bottom-20 right-5 z-10 bg-secondary flex shadow-sm shadow-white items-center justify-center">
                <Link to="compose" state={{ from: "/messages"}}>
                    <LuMailPlus className="text-2xl text-white" />
                </Link>
            </div>
        </div >
    );
}

export default MessagePageContent;




