import { LuSearch, LuSettings } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../../components/UI/Button";
import { useState } from "react";
import TrendsList from "../../components/general/TrendsList";


const SearchPageContent = () => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(prev => !prev)
  }

  return (
    <div className="w-4/5 border-r border-gray-700">
      <div className="sticky top-0 h-14 flex flex-col bg-black">
        <div className="flex items-center justify-between w-full px-9 ">
          <form className={`flex px-3 items-center rounded-full w-[90%] justify-center mt-auto z-20  bg-gray-500 bg-opacity-20 ${isFocused ? 'border border-primary' : ''} `} onFocus={handleFocus} onBlur={handleFocus}>
            <div className="w-[10%]">
              <LuSearch className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), `w-10 h-10 hover:bg-transparent ${isFocused ? 'text-primary' : 'text-neutral-200'}`)} />
            </div>
            <input className="w-[90%] bg-transparent px-2 py-3 border-0 outline-0 dark:text-neutral-200" placeholder="Search" />
          </form>
          <div className="w-[10%]">
            <LuSettings className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), `ms-8 cursor-pointer w-10 h-10  ${isFocused ? 'text-primary' : 'text-neutral-200'}`)} />
          </div>
        </div>
      </div>

      <section className="w-full">
        <div className="flex items-center justify-between mt-1">
          <div className="w-[20%] flex items-center justify-center py-3 cursor-pointer hover:bg-gray-500 hover:bg-opacity-20 "><p className="dark:text-neutral-300">For You</p></div>
          <div className="w-[20%] flex items-center justify-center py-3 cursor-pointer hover:bg-gray-500 hover:bg-opacity-20 "><p className="dark:text-neutral-300">Trending</p></div>
          <div className="w-[20%] flex items-center justify-center py-3 cursor-pointer hover:bg-gray-500 hover:bg-opacity-20 "><p className="dark:text-neutral-300">News</p></div>
          <div className="w-[20%] flex items-center justify-center py-3 cursor-pointer hover:bg-gray-500 hover:bg-opacity-20 "><p className="dark:text-neutral-300">Sport</p></div>
          <div className="w-[20%] flex items-center justify-center py-3 cursor-pointer hover:bg-gray-500 hover:bg-opacity-20 "><p className="dark:text-neutral-300">Entertainment</p></div>
        </div>

        <div className="h-96">
          <img src="https://loremflickr.com/200/200?random=3" className="w-full h-full object-cover object-center" alt="search-ad" />
        </div>

        <TrendsList />

      </section>


    </div>
  );
}

export default SearchPageContent

