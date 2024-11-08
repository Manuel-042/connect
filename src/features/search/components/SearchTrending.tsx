import TrendsList from "../../trends/components/TrendsList"
import trends from "../../../data/trends.json"


const SearchTrending = () => {
    return (
        <div className="border-b border-gray-700">
            <TrendsList data={trends} limit={trends.length} variant="large" />
        </div>
    )
}

export default SearchTrending
