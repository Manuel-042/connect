import { LuArrowLeft, LuSearch, LuCircleX } from "react-icons/lu"
import { twMerge } from "tailwind-merge"
import { buttonStyles } from "../../components/UI/Button"
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookmarkedPosts } from "../../features/bookmarks";
import bookmarkedPosts from "../../data/bookmarkedPosts.json"

const BookmarkPageContent = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [searchContent, setSearchContent] = useState("");
    const location = useLocation();
    const from = location?.state?.from || "/home";

    const handleFocus = () => {
        setIsFocused(prev => !prev);
    };

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
        <>
            <div className="px-2 lg:px-4">
                <div className="sm:sticky top-0 flex items-center justify-start gap-6 mt-2 mb-5">
                    <Link to={from} aria-label="Go back">
                        <LuArrowLeft
                            className={twMerge(
                                buttonStyles({ variant: "blueghost", size: "icon" }),
                                'cursor-pointer w-7 h-7 p-1 dark:text-neutral-200'
                            )}
                        />
                    </Link>

                    <h1 className="dark:text-white text-lg lg:text-xl font-bold">Bookmarks</h1>
                </div>

                <div className="mb-2 relative">
                    <form className={`flex items-center rounded-full w-full justify-start px-4 mt-1 border border-dark-border py-2.5 md:py-1 bg-opacity-70 ${isFocused ? 'border border-primary' : ''} `} onFocus={handleFocus} onBlur={handleFocus}>
                        <LuSearch className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), `w-4 h-4 p-0 md:w-9 md:h-9 md:p-2.5 text-xl  hover:bg-transparent ${isFocused ? 'text-primary' : 'dark:text-dark-text'}`)} />
                        <input
                            className="w-5/6 bg-transparent px-2 h-5 text-sm font-semibold sm:h-auto md:py-1 border-0 outline-0 dark:text-white placeholder:text-dark-text"
                            placeholder="Search Bookmarks"
                            value={searchContent}
                            onChange={handleChange} />
                    </form>
                </div>
            </div>

            {searchContent && (<div className="absolute top-[4.2rem] md:top-50 right-10 md:right-28 z-30" onMouseDown={(event) => event.preventDefault()} onClick={clearSearch}><LuCircleX className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'cursor-pointer w-5 h-5 p-0 md:w-10 md:h-10 text-white')} /></div>)}

            <BookmarkedPosts posts={bookmarkedPosts.bookmarkedPosts} />
        </>
    )
}

export default BookmarkPageContent