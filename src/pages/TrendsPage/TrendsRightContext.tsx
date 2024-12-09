import Search from "../../components/general/Search";
import Recommendation from "../../components/general/Recommendation";



const TrendsRightContent = () => {
    return (
        <div>
            <div className="sticky top-0 z-10 flex bg-black dark:bg-opacity-90">
                <Search />
            </div>
           <Recommendation />
        </div>
    );
}

export default TrendsRightContent

