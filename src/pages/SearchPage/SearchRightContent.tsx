

import { useState } from "react";
import Recommendation from "../../components/general/Recommendation";
import Trends from "../../components/general/trends"


const FilterOptions = () => {
    const [filters, setFilters] = useState({
        people: "fromanyone", 
        location: "anywhere",
    });

    const handleChange = (section: string, value: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [section]: value,
        }));
    };

    return (
        <div className="rounded-2xl border border-dark-border px-3 py-3">
            {/* People Section */}
            <div className="mb-3">
                <p className="dark:text-white font-bold mb-2">People</p>

                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <label htmlFor="fromanyone" className="dark:text-white">
                            From anyone
                        </label>
                        <input
                            type="radio"
                            id="fromanyone"
                            name="people"
                            value="fromanyone"
                            checked={filters.people === "fromanyone"}
                            onChange={() => handleChange("people", "fromanyone")}
                            className="appearance-none w-5 h-5 rounded-full border-2 flex items-center justify-center border-dark-text checked:bg-blue-500 checked:border-blue-500 focus:ring-0 before:content-['✓'] before:absolute before:text-white before:hidden before:checked:inline"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="peopleyoufollow" className="dark:text-white">
                            People you follow
                        </label>
                        <input
                            type="radio"
                            id="peopleyoufollow"
                            name="people"
                            value="peopleyoufollow"
                            checked={filters.people === "peopleyoufollow"}
                            onChange={() => handleChange("people", "peopleyoufollow")}
                            className="appearance-none w-5 h-5 rounded-full border-2 flex items-center justify-center border-dark-text checked:bg-blue-500 checked:border-blue-500 focus:ring-0 before:content-['✓'] before:absolute before:text-white before:hidden before:checked:inline"
                        />
                    </div>
                </div>
            </div>

            {/* Location Section */}
            <div className="mb-3">
                <p className="dark:text-white font-bold text-base mb-2">Location</p>
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <label htmlFor="anywhere" className="dark:text-white">
                            Anywhere
                        </label>
                        <input
                            type="radio"
                            id="anywhere"
                            name="location"
                            value="anywhere"
                            checked={filters.location === "anywhere"}
                            onChange={() => handleChange("location", "anywhere")}
                            className="appearance-none w-5 h-5 rounded-full border-2 flex items-center justify-center border-dark-text checked:bg-blue-500 checked:border-blue-500 focus:ring-0 before:content-['✓'] before:absolute before:text-white before:hidden before:checked:inline"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="nearyou" className="dark:text-white">
                            Near you
                        </label>
                        <input
                            type="radio"
                            id="nearyou"
                            name="location"
                            value="nearyou"
                            checked={filters.location === "nearyou"}
                            onChange={() => handleChange("location", "nearyou")}
                            className="appearance-none w-5 h-5 rounded-full border-2 flex items-center justify-center border-dark-text checked:bg-blue-500 checked:border-blue-500 focus:ring-0 before:content-['✓'] before:absolute before:text-white before:hidden before:checked:inline"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};



const SearchRightContent = () => {
    return (
        <div className="h-full flex flex-col gap-3">
            <div className="rounded-2xl mt-3 dark:text-white border border-dark-border px-3 py-2 text-xl font-bold">
                Search filter
            </div>
            <FilterOptions />
            <Trends />
            <Recommendation />
        </div>
    );
}

export default SearchRightContent

