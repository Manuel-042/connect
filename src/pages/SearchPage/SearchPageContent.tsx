import { LuSearch, LuSettings, LuArrowLeft, LuXCircle } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import Button, { buttonStyles } from "../../components/UI/Button";
import { useState } from "react";
import { SearchMain } from "../../features/search/index";
import { SearchTrending } from "../../features/search/index";
import { SearchNews } from "../../features/search/index";
import { SearchSports } from "../../features/search/index";
import { SearchEntertainment } from "../../features/search/index";

const SearchPageContent = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  const labels = ["For You", "Trending", "News", "Sports", "Entertainment"];

  return (
    <div className="border-r border-dark-border pb-10 ">
      
      <div className="sticky top-0 z-10 flex flex-col bg-white dark:bg-black">
        <div className="flex items-center justify-between w-full mt-2 px-5">
          {isFocused && (
            <div className="flex items-center justify-center w-[10%]">
              <LuArrowLeft className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'cursor-pointer w-10 h-10 dark:text-neutral-200')} />
            </div>
          )}

          <form className={`flex px-3 items-center rounded-full ${isFocused ? 'w-[80%] border border-primary' : 'w-[90%]'} justify-center mt-auto z-20 bg-gray-500 bg-opacity-20`}
            onFocus={handleFocus} onBlur={handleBlur}>
            <div className="w-[10%]">
              <LuSearch className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), `w-10 h-10 hover:bg-transparent ${isFocused ? 'text-primary' : 'dark:text-white'}`)} />
            </div>

            <input
              className="relative w-[90%] bg-transparent px-2 py-2 border-0 outline-0 dark:text-white"
              placeholder="Search"
              name="search"
              value={searchContent}
              onChange={handleChange}
            />
            {searchContent && (<div className="absolute top-50 right-28 z-30" onMouseDown={(event) => event.preventDefault()} onClick={clearSearch}><LuXCircle className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'cursor-pointer w-10 h-10 text-neutral-200')} /></div>)}

            {searchContent && (
              <div className="w-[75%] h-36 absolute top-10 px-2 py-3 rounded-lg shadow-lg mt-3 bg-black"></div>
            )}

          </form>

          <div className="w-[10%]">
            <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'ms-8 bg-transparent cursor-pointer w-10 h-10 p-0 dark:text-white')}><LuSettings className="text-lg" /></Button>
          </div>
        </div>

        <div className="flex mt-1 border-b border-dark-border w-full overflow-x-auto md:overflow-visible no-scrollbar">
          {labels.map((label, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="flex items-center justify-center px-2"
            >
              <p className={`dark:text-gray-500 w-max text-sm md:text-base px-2 py-3 ${activeIndex === index ? 'border-b-4 border-blue-500 dark:text-white' : ''}`}>
                {label}
              </p>
            </button>
          ))}
        </div>

      </div>

      <section className="w-full pb-40 mb-4">
        <div>
          {activeIndex === 0 && <SearchMain />}
          {activeIndex === 1 && <SearchTrending />}
          {activeIndex === 2 && <SearchNews />}
          {activeIndex === 3 && <SearchSports />}
          {activeIndex === 4 && <SearchEntertainment />}
        </div>
      </section>
    </div>
  );
}

export default SearchPageContent;




