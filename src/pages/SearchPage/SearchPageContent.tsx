import { LuSearch, LuSettings, LuArrowLeft, LuXCircle } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../../components/UI/Button";
import { useState } from "react";
import SearchMain from "../../components/general/SearchMain";
import SearchTrending from "../../components/general/SearchTrending";
import SearchNews from "../../components/general/SearchNews";
import SearchSports from "../../components/general/SearchSports";
import SearchEntertainment from "../../components/general/SearchEntertainment";

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

  const labels = ["For You", "Trending", "News", "Sport", "Entertainment"];

  return (
    <div className="w-4/5 border-r border-gray-700 pb-10">
      <div className="sticky top-0 flex flex-col bg-white dark:bg-black">
        <div className="flex items-center justify-between w-full mt-2 px-5">
          {isFocused && (
            <div className="flex items-center justify-center w-[10%]">
              <LuArrowLeft className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'cursor-pointer w-10 h-10 dark:text-neutral-200')} />
            </div>
          )}

          <form className={`flex px-3 items-center rounded-full ${isFocused ? 'w-[80%] border border-primary' : 'w-[90%]'} justify-center mt-auto z-20 bg-gray-500 bg-opacity-20`}
            onFocus={handleFocus} onBlur={handleBlur}>
            <div className="w-[10%]">
              <LuSearch className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), `w-10 h-10 hover:bg-transparent ${isFocused ? 'text-primary' : 'dark:text-neutral-200'}`)} />
            </div>
            <input
              className="relative w-[90%] bg-transparent px-2 py-3 border-0 outline-0 dark:text-neutral-200"
              placeholder="Search"
              name="search"
              value={searchContent}
              onChange={handleChange}
            />
            {searchContent && (<div className="absolute top-50 right-28 z-30" onMouseDown={(event) => event.preventDefault()} onClick={clearSearch}><LuXCircle className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'cursor-pointer w-10 h-10 text-neutral-200')} /></div>)}

            {searchContent && (
              <div className="w-[70%] h-36 absolute top-16 px-2 py-3 rounded-lg shadow-lg mt-3 bg-black"></div>
            )}

          </form>

          <div className="w-[10%]">
            <LuSettings className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'ms-8 cursor-pointer w-10 h-10 dark:text-neutral-200')} />
          </div>
        </div>

        <div className="flex">
          {labels.map((label, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-[20%] flex items-center justify-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-20`}
            >
              <p className={`dark:text-gray-500 text-opacity-20 py-3 ${activeIndex === index ? 'border-b-4 border-blue-500 dark:text-neutral-300' : ''}`}>{label}</p>
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




