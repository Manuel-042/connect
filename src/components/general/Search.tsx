import { LuSearch, LuXCircle } from 'react-icons/lu'
import { twMerge } from 'tailwind-merge'
import { buttonStyles } from '../UI/Button'
import { useState } from 'react';

type Props = {
    updateIsFocused?: (newState: boolean) => void;
}

const Search = ({ updateIsFocused }: Props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [searchContent, setSearchContent] = useState("");

    const handleFocus = () => {
        setIsFocused(prev => {
            const newState = !prev;
            if (updateIsFocused) {
                updateIsFocused(newState);
            }
            return newState;
        });
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
            <form className={`flex relative items-center rounded-full w-full justify-start px-2 mt-1 bg-dark-border py-1 bg-opacity-70 ${isFocused ? 'border border-primary' : ''} `} onFocus={handleFocus} onBlur={handleFocus}>
                <LuSearch className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), `w-4 h-4 p-0 md:w-9 md:h-9 md:p-2.5 text-xl hover:bg-transparent ${isFocused ? 'text-primary' : 'dark:text-white'}`)} />
                <input
                    className="w-5/6 bg-transparent px-2 h-5 sm:h-auto md:py-1 border-0 outline-0 text-base dark:text-white"
                    placeholder="Search"
                    value={searchContent}
                    onChange={handleChange} />
            </form>

            {searchContent && (<div className="absolute top-5 md:top-50 right-24 md:right-28 z-30" onMouseDown={(event) => event.preventDefault()} onClick={clearSearch}><LuXCircle className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'cursor-pointer w-5 h-5 p-0 md:w-10 md:h-10 text-neutral-200')} /></div>)}

            {searchContent && (
                <div className="hidden md:block w-[75%] h-36 absolute top-10 px-2 py-3 z-50 rounded-lg shadow-lg mt-3 bg-black"></div>
            )}

            {isFocused && (
                <div className="md:hidden w-full h-screen overflow-hidden flex flex-col fixed inset-0 top-14 px-2 py-3 z-50 bg-black">
                    <p className='dark:text-gray-400 self-center text-sm'>Try Searching for lists, people or keywords</p>
                </div>
            )}
        </>

    )
}

export default Search