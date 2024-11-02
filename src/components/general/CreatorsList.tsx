import users from "../../data/users.json"
import RecommenderUserList from "./RecommenderUserList";


const CreatorsList = () => {

    return (
        <div className="border-b border-gray-700">
            <div className="px-3">
                <RecommenderUserList limit={users.length} variant="large" showBio={true} show_creator={true}/>
            </div>
        </div>
    )
}

export default CreatorsList
