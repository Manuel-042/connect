import TrendsList from "../../trends/components/TrendsList"
import trends from "../../../data/trends.json"


const SearchEntertainment = () => {
    const filteredTrends = trends.filter(item => item.category === "entertainment");

    return (
        <div className="border-b border-dark-border">
            <div className="h-44 md:h-80 lg:h-96 relative">
                <div className="absolute flex top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)]">
                    <div className="self-end ps-4 pb-4">
                        <p className="text-2xl dark:text-white font-extrabold">The Offseason</p>
                        <p className="text-xs uppercase font-semibold dark:text-white">LIVE</p>
                    </div>
                </div>
                <img src="https://loremflickr.com/200/200?random=3" className="w-full h-full object-cover object-center" alt="search-ad" />
            </div>
            
            <TrendsList data={filteredTrends} limit={trends.length} />
        </div>
    )
}

export default SearchEntertainment
