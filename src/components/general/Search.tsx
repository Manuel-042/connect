import { LuSearch } from 'react-icons/lu'
import { twMerge } from 'tailwind-merge'
import { buttonStyles } from '../UI/Button'
import { useState } from 'react';

const Search = () => {
    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = () => {
      setIsFocused(prev => !prev)
    }
    
    return (
        <form className={`flex items-center rounded-full w-full justify-end z-20 mt-1 bg-dark-border py-1 bg-opacity-70 ${isFocused ? 'border border-primary' : ''} `} onFocus={handleFocus} onBlur={handleFocus}>
            <LuSearch className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), `w-9 h-9 hover:bg-transparent ${isFocused ? 'text-primary' : 'dark:text-white'}`)} />
            <input className="w-5/6 bg-transparent px-2 py-1 border-0 outline-0 text-base dark:text-white" placeholder="Search" />
        </form>
    )
}

export default Search