import TrendsList from "../../trends/components/TrendsList"
import trends from "../../../data/trends.json"


const SearchNews = () => {
    const filteredTrends = trends.filter(item => item.category === "news");

    return (
        <div className="border-b border-gray-700">
            <TrendsList data={filteredTrends} limit={trends.length} variant="large" />
        </div>
    )
}

export default SearchNews
