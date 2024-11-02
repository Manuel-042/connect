import TrendsList from "./TrendsList"
import trends from "../../data/trends.json"


const SearchEntertainment = () => {
    const filteredTrends = trends.filter(item => item.category === "entertainment");

    return (
        <div className="border-b border-gray-700">
            <TrendsList data={filteredTrends} limit={trends.length} variant="large" />
        </div>
    )
}

export default SearchEntertainment
