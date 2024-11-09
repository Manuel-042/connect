import Button  from "../../components/UI/Button";
import trends from "../../data/trends.json"
import RecommenderUserList from "../../components/general/RecommenderUserList";
import TrendsList from "../../features/trends/components/TrendsList";
import Search from "../../components/general/Search";


const HomeRightContent = () => {
  return (
    <div className="">
      <div className="sticky top-0 z-10 flex bg-white dark:bg-black">
        <Search  />
      </div>

      <div className="rounded-2xl flex flex-col items-start border border-dark-border justify-start gap-3 p-3 mt-4">
        <h3 className="dark:text-neutral-300 text-xl font-bold">Subscribe to Premium</h3>
        <p className="dark:text-neutral-300 text-sm">Subscribe to unlock new features and if <br/> eligible, receive a share of revenue.</p>
        <Button className="cursor-pointer font-bold text-sm">Subscribe</Button>
      </div>

      <div className="rounded-2xl flex flex-col items-start border border-dark-border justify-start gap-3 py-3 mt-4">
        <h3 className="dark:text-neutral-300 text-xl font-bold px-3">Trends for you</h3>

        <TrendsList data={trends} limit={10} />

      </div>

      <div className="rounded-2xl flex flex-col items-start border border-dark-border justify-start gap-3 py-3 mt-4">
        <h3 className="dark:text-neutral-300 text-xl font-bold px-3">Who to follow</h3>

        <RecommenderUserList limit={3} />

      </div>


    </div>
  );
}

export default HomeRightContent

