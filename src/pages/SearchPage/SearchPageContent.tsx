import { LuArrowLeft, LuLeaf, LuMoreHorizontal, LuSearch, LuXCircle } from "react-icons/lu"
import { twMerge } from "tailwind-merge"
import Button, { buttonStyles } from "../../components/UI/Button"
import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import TopTab from "../../features/querytabs/components/TopTab";
import LatestTab from "../../features/querytabs/components/LatestTab";
import PeopleTab from "../../features/querytabs/components/PeopleTab";
import MediaTab from "../../features/querytabs/components/MediaTab";
import ListsTab from "../../features/querytabs/components/ListsTab";

const SearchPageContent = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || "";
    const src = searchParams.get('src') || "";

    const [searchContent, setSearchContent] = useState(query);

    const location = useLocation();
    const navigate = useNavigate();

    const from = location?.state?.from || "/home";

    const { searchResults } = location.state || {};
    console.log("Serch Results from Search Page", searchResults);

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

    const handleActiveIndex = (index: number) => {
        setActiveIndex(index);
        let tab = ""
        switch(index) {
            case 1:
                tab = "live";
                break;
            case 2:
                tab = "user";
                break;
            case 3:
                tab = "media";
                break;
            case 4:
                tab = "list";
                break;
            default:
                tab = "";
        }

        if (index > 0) {
            navigate(`/search?q=${query}&src=${src}&f=${tab}`, { state: { searchResults }})
        }
    }

    const labels = ["Top", "Latest", "People", "Media", "Lists"];

    return (
        <>
            <div className="sticky top-0 dark:bg-black bg-opacity-15 z-20">
                <div className="flex items-center justify-between w-full gap-5 px-4">              
                    <div className="w-auto">
                        <LuArrowLeft
                            className={twMerge(
                                buttonStyles({ variant: "blueghost", size: "icon" }),
                                'cursor-pointer w-7 h-7 p-1 dark:text-neutral-200'
                            )}
                            onClick={() => navigate(from)}
                        />
                    </div>
                    

                    <div className="flex-grow">
                        <form className={`flex items-center relative rounded-full w-full justify-start px-4 mt-1 border border-dark-border py-2.5 md:py-1 bg-opacity-70 ${isFocused ? 'border border-primary' : ''} `} onFocus={handleFocus} onBlur={handleFocus}>
                            <LuSearch className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), `w-4 h-4 p-0 md:w-9 md:h-9 md:p-2.5 text-xl  hover:bg-transparent ${isFocused ? 'text-primary' : 'dark:text-dark-text'}`)} />
                            <input
                                className="w-5/6 bg-transparent px-2 h-5 text-sm font-semibold sm:h-auto md:py-1 border-0 outline-0 dark:text-white placeholder:text-dark-text"
                                value={searchContent}
                                onChange={handleChange} />
                            {searchContent && (<div className="absolute top-3 right-10 z-30" onMouseDown={(event) => event.preventDefault()} onClick={clearSearch}><LuXCircle className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'cursor-pointer w-5 h-5 p-0 text-white')} /></div>)}
                        </form>

                    </div>

                    <div className="w-auto">
                        <Button className={twMerge(
                            buttonStyles({ variant: "blueghost", size: "icon" }),
                            'bg-transparent cursor-pointer w-7 h-7 p-0 dark:text-white'
                        )}>
                            <LuMoreHorizontal className="text-lg" />
                        </Button>
                    </div>

                </div>

                <div className="flex mt-2 border-b border-dark-border w-full overflow-x-auto md:overflow-visible no-scrollbar">
                    {labels.map((label, index) => (
                        <button
                            key={index}
                            onClick={() => handleActiveIndex(index)}
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
                    {activeIndex === 0 && <TopTab query={query} posts={searchResults} setActiveIndex={setActiveIndex} />}
                    {activeIndex === 1 && <LatestTab query={query} posts={searchResults}  />}
                    {activeIndex === 2 && <PeopleTab query={query} />}
                    {activeIndex === 3 && <MediaTab query={query} posts={searchResults} />}
                    {activeIndex === 4 && <ListsTab query={query}  />}
                </div>
            </section>

            <div className="sm:hidden rounded-full w-14 h-14 fixed bottom-20 right-5 z-10 bg-secondary flex shadow-sm shadow-white items-center justify-center">
                <Link to="/compose/post" state={{ previousLocation: location.pathname }}>
                    <LuLeaf className="text-2xl text-white" />
                </Link>
            </div>
        </>
    )
}

export default SearchPageContent