import { LuArrowLeft, LuSearch, LuCircleX } from "react-icons/lu"
import { twMerge } from "tailwind-merge"
import { buttonStyles } from "../../components/UI/Button"
import { useState } from "react";
import SettingsList from "../../features/settings/components/SettingsList";

const SettingsPageContent = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchContent, setSearchContent] = useState("");
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
    <div className="w-screen md:w-[600px] lg:w-[400px] xl:w-[500px] mb-10 md:mb-0 max-h-screen py-4 lg:overflow-y-auto">
      <h1 className="dark:text-white font-bold text-base lg:text-xl mb-5 px-2">Settings</h1>

      <div className="mb-2 relative flex items-center gap-2 justify-between w-full px-2">
        {isFocused && (
          <div className="w-auto">
            <LuArrowLeft
              className={twMerge(
                buttonStyles({ variant: "blueghost", size: "icon" }),
                'cursor-pointer w-7 h-7 p-1 dark:text-white'
              )}
            />
          </div>
        )}

        <form className={`flex items-center rounded-full w-full justify-start px-2 mt-1 border border-dark-border py-2.5 md:py-1 bg-opacity-70 ${isFocused ? 'border border-primary' : ''} `} onFocus={handleFocus} onBlur={handleFocus}>
          <LuSearch className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), `w-4 h-4 p-0 md:w-9 md:h-9 md:p-2.5 text-xl  hover:bg-transparent ${isFocused ? 'text-primary' : 'dark:text-dark-text'}`)} />
          <input
            className="w-5/6 bg-transparent py-2 h-5 text-sm font-semibold sm:h-auto md:py-1 border-0 outline-0 dark:text-white placeholder:text-dark-text"
            placeholder="Search Settings"
            value={searchContent}
            onChange={handleChange} />
        </form>

        {searchContent && (<div className="absolute top-[4.2rem] md:top-50 right-10 md:right-28 z-30" onMouseDown={(event) => event.preventDefault()} onClick={clearSearch}><LuCircleX className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'cursor-pointer w-5 h-5 p-0 md:w-10 md:h-10 text-white')} /></div>)}
      </div>

      <SettingsList />
    </div>
  )
}

export default SettingsPageContent