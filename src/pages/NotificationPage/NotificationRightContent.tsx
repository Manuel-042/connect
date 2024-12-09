import Search from "../../components/general/Search";
import Recommendation from "../../components/general/Recommendation";
import Trends from "../../components/general/trends";


const NotificationRightContent = () => {
  return (
    <div>
      <div className="sticky top-0 z-10 flex bg-white dark:bg-black">
        <Search/>
      </div>
      <Trends />
      <Recommendation />
    </div>
  );
}

export default NotificationRightContent

