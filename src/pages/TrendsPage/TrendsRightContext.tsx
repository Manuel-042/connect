import { LuSearch } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../../components/UI/Button";
import { useState } from "react";
import RecommenderUserList from "../../components/general/RecommenderUserList";
import Search from "../../components/general/Search";



const TrendsRightContent = () => {
    return (
        <div>
            <div className="sticky top-0 z-10 flex bg-black dark:bg-opacity-90">
                <Search />
            </div>

            <div className="rounded-2xl flex sticky top-5 flex-col items-start border border-dark-border justify-start gap-3 py-3 mt-4">
                <h3 className="dark:text-neutral-300 text-xl font-bold px-3">Who to follow</h3>
                <RecommenderUserList limit={3} />
            </div>
        </div>
    );
}

export default TrendsRightContent

