import trends from "../../data/trends.json"
import RecommenderUserList from "../../components/general/RecommenderUserList";
import TrendsList from "../../features/trends/components/TrendsList";
import Search from "../../components/general/Search";

const BookmarkRightContent = () => {
    return (
        <div className="h-full">
            <div className="sticky top-0 z-10 flex bg-white dark:bg-black">
                <Search />
            </div>

            <div className="rounded-2xl flex flex-col items-start border border-dark-border justify-start gap-3 py-3 mt-4">
                <h3 className="dark:text-white text-xl font-bold px-3">What's happening</h3>
                <TrendsList data={trends} limit={4} />
            </div>

            <div className="rounded-2xl flex flex-col items-start border border-dark-border justify-start gap-3 py-3 mt-4">
                <h3 className="dark:text-white text-xl font-bold px-3">Who to follow</h3>
                <RecommenderUserList limit={3} />
            </div>
        </div>
    );

}

export default BookmarkRightContent