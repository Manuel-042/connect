import { LuSettings, LuArrowLeft, LuLeaf } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import Button, { buttonStyles } from "../../components/UI/Button";
import { useEffect, useState } from "react";
import { SearchMain } from "../../features/search/index";
import { SearchTrending } from "../../features/search/index";
import { SearchNews } from "../../features/search/index";
import { SearchSports } from "../../features/search/index";
import { SearchEntertainment } from "../../features/search/index";
import { useAuthContext } from "../../context/auth-context";
import { UserProps } from "../../types";
import users from "../../data/users.json"
import Search from "../../components/general/Search";
import { Link, useLocation } from "react-router-dom";

const ExplorePageContent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = useAuthContext();
  const [appUser, setAppUser] = useState<UserProps | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();

  if (!user) return null;

  useEffect(() => {
    const foundUser = users.find(usr => usr.id === Number(user.id));
    if (!foundUser) {
      return
    }
    setAppUser(foundUser);
  }, [user])

  const updateIsFocused = (newState: boolean) => {
    setIsSearchFocused(newState);
  };

  useEffect(() => {
    console.log('Updated isSearchFocused:', isSearchFocused);
  }, [isSearchFocused]);

  const labels = ["For You", "Trending", "News", "Sports", "Entertainment"];

  return (
    <div className="pb-10 relative">

      <div className={`${isSearchFocused && 'sticky'} sm:sticky top-0 z-10 flex flex-col bg-white dark:bg-black dark:bg-opacity-80`}>

        <div className="flex items-center justify-between w-full gap-5 mt-2 px-4">

          {!isSearchFocused && (
            <Button className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "md:hidden p-0 bg-transparent hover:bg-transparent w-10 h-8")}>
              <img
                src={appUser?.image}
                alt={`${appUser?.displayname} profile picture`}
                className="w-full h-full rounded-full object-cover"
              />
            </Button>
          )}

          {isSearchFocused && (
            <div className="w-auto">
              <LuArrowLeft
                className={twMerge(
                  buttonStyles({ variant: "blueghost", size: "icon" }),
                  'cursor-pointer w-7 h-7 p-1 dark:text-neutral-200'
                )}
              />
            </div>
          )}

          <div className="flex-grow">
            <Search updateIsFocused={updateIsFocused} />
          </div>

          <div className="w-auto">
            <Button className={twMerge(
              buttonStyles({ variant: "blueghost", size: "icon" }),
              'bg-transparent cursor-pointer w-7 h-7 p-0 dark:text-white'
            )}>
              <LuSettings className="text-lg" />
            </Button>
          </div>

        </div>


        <div className="flex mt-2 border-b border-dark-border w-full overflow-x-auto md:overflow-visible no-scrollbar">
          {labels.map((label, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="flex flex-1 items-center justify-center px-2"
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

      <div className="sm:hidden rounded-full w-14 h-14 fixed bottom-20 right-5 z-10 bg-secondary flex shadow-sm shadow-white items-center justify-center">
        <Link to="/compose/post" state={{ previousLocation: location.pathname }}>
          <LuLeaf className="text-2xl text-white" />
        </Link>
      </div>
    </div>
  );
}

export default ExplorePageContent;




