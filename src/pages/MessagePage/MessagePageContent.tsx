import { LuSearch, LuSettings, LuArrowLeft, LuXCircle, LuMailPlus } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../../components/UI/Button";
import { useState } from "react";
import MessagesList from "../../components/general/MessagesList";

const MessagePageContent = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [searchContent, setSearchContent] = useState("");

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
        <div className="w-[47%] border-r border-gray-700 pb-4 max-h-screen overflow-y-auto">
            <div className="sticky top-0 flex flex-col bg-white z-20 dark:bg-black">

                <div className="flex items-center justify-between w-full my-2 px-5">
                    <h1 className="dark:text-neutral-300 text-2xl font-bold">Messages</h1>

                    <div className="flex items-center gap-1">
                        <LuSettings className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'cursor-pointer w-10 h-10 dark:text-neutral-200')} />
                        <LuMailPlus className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'cursor-pointer w-10 h-10 dark:text-neutral-200')} />
                    </div>
                </div>


                <div className="flex items-center justify-between w-full mt-2 px-5">
                    {isFocused && (
                        <div className="flex items-center justify-center w-[10%]">
                            <LuArrowLeft className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'cursor-pointer w-10 h-10 dark:text-neutral-200')} />
                        </div>
                    )}

                    <form className={`flex px-3 items-center rounded-full ${isFocused ? 'w-[90%] border border-primary' : 'w-[100%]'} justify-center mt-auto z-20 bg-gray-500 bg-opacity-20`}
                        onFocus={handleFocus} onBlur={handleBlur}>
                        <div className="w-[7%]">
                            <LuSearch className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), `w-10 h-10 hover:bg-transparent ${isFocused ? 'text-primary' : 'dark:text-neutral-200'}`)} />
                        </div>
                        <input
                            className="relative w-[93%] bg-transparent px-2 py-3 border-0 outline-0 dark:text-neutral-200"
                            placeholder="Search Direct Messages"
                            name="search"
                            value={searchContent}
                            onChange={handleChange}
                        />
                        {searchContent && (<div className="absolute top-50 right-14 z-30" onMouseDown={(event) => event.preventDefault()} onClick={clearSearch}><LuXCircle className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'cursor-pointer w-10 h-10 text-neutral-200')} /></div>)}
                    </form>
                </div>

            </div>

            <section className="w-full mb-4">
                <MessagesList />
            </section>
        </div>
    );
}

export default MessagePageContent;




