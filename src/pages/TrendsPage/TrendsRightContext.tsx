import { LuSearch } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../../components/UI/Button";
import { useState } from "react";
import RecommenderUserList from "../../components/general/RecommenderUserList";



const TrendsRightContent = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [searchContent, setSearchContent] = useState("");

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const val = evt.target?.value;
        setSearchContent(val);
    };

    return (
        <div className="w-[35%]">
            <div className="sticky top-0 z-10 h-14 flex bg-black">
                <form className={`flex items-center rounded-full w-full justify-end mt-auto z-20 h-[90%] bg-gray-500 bg-opacity-20 ${isFocused ? 'border border-primary' : ''} `} onFocus={handleFocus} onBlur={handleBlur}>
                    <LuSearch className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), `w-10 h-10 hover:bg-transparent ${isFocused ? 'text-primary' : 'text-neutral-200'}`)} />
                    <input
                        className="w-5/6 bg-transparent px-2 py-1 border-0 outline-0 dark:text-neutral-200"
                        placeholder="Search"
                        name="search"
                        value={searchContent}
                        onChange={handleChange}
                    />
                </form>
            </div>

            <div className="rounded-2xl flex sticky top-5 flex-col items-start border border-gray-700 justify-start gap-3 py-3 mt-4">
                <h3 className="dark:text-neutral-300 text-xl font-bold px-3">Who to follow</h3>
                <RecommenderUserList limit={3} />
            </div>
        </div>
    );
}

export default TrendsRightContent

