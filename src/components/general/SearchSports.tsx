import TrendsList from "./TrendsList"
import trends from "../../data/trends.json"


const SearchSports = () => {
    const filteredTrends = trends.filter(item => item.category === "sports");

    return (
        <div className="border-b border-gray-700">
            <TrendsList data={filteredTrends} limit={trends.length} variant="large" />
        </div>
    )
}

export default SearchSports
