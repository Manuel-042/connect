import Button  from "../../components/UI/Button";
import Search from "../../components/general/Search";
import Recommendation from "../../components/general/Recommendation";
import Trends from "../../components/general/Trends"


const HomeRightContent = () => {
  return (
    <div className="h-full">
      <div className="sticky top-0 z-10 flex bg-white dark:bg-black">
        <Search  />
      </div>

      <div className="rounded-2xl flex flex-col items-start border border-dark-border justify-start gap-3 p-3 mt-4">
        <h3 className="dark:text-neutral-300 text-xl font-bold">Subscribe to Premium</h3>
        <p className="dark:text-neutral-300 text-sm">Subscribe to unlock new features and if <br/> eligible, receive a share of revenue.</p>
        <Button className="cursor-pointer font-bold text-sm">Subscribe</Button>
      </div>

      <Trends />
      <Recommendation />
    </div>
  );
}

export default HomeRightContent

