import trends from "../../data/trends.json"
import RecommenderUserList from "../../components/general/RecommenderUserList";
import {TrendsList} from "../../features/trends/index";
import Search from "../../components/general/Search";


const ProfileRightContent = () => {
  return (
    <div>
      <div className="sticky top-0 z-10 flex bg-white dark:bg-black dark:bg-opacity-90">
        <Search />
      </div>

      <div className="rounded-2xl flex flex-col items-start border border-dark-border justify-start gap-3 py-3 mt-4">
        <h3 className="dark:text-white text-xl font-bold px-3">You might like</h3>
        <RecommenderUserList limit={3} />
      </div>

      <div className="rounded-2xl flex flex-col items-start border border-dark-border justify-start gap-3 py-3 mt-4">
        <h3 className="dark:text-white text-xl font-bold px-3">What's happening</h3>
        <TrendsList data={trends} limit={4} />
      </div>
    </div>
  );
}

export default ProfileRightContent

