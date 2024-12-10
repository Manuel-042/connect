import Search from "../../components/general/Search";
import Recommendation from "../../components/general/Recommendation";
import Trends from "../../components/general/Trends"


const ProfileRightContent = () => {
  return (
    <div>
      <div className="sticky top-0 z-10 flex bg-white dark:bg-black dark:bg-opacity-90">
        <Search />
      </div>
      <Recommendation />
      <Trends />
    </div>
  );
}

export default ProfileRightContent

