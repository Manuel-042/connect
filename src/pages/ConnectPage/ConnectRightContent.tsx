import TrendsList from "../../features/trends/components/TrendsList";
import trends from "../../data/trends.json"
import Search from "../../components/general/Search";



const ConnectRightContent = () => {
    ;

    return (
        <div>
            <div className="sticky top-0 z-10 flex bg-black dark:bg-opacity-90">
                <Search />
            </div>

            <div className="rounded-2xl flex flex-col items-start border border-gray-700 justify-start gap-3 py-3 mt-4">
                <h3 className="dark:text-white text-xl font-bold px-3 w-full">Trends for you</h3>
                <TrendsList data={trends} limit={10} />
            </div>
        </div>
    );
}

export default ConnectRightContent

