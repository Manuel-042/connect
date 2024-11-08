import users from "../../../data/users.json"
import RecommenderUserList from "../../../components/general/RecommenderUserList";


const SuggestedUsers = () => {

    return (
        <div className="border-b border-gray-700 px-3">
            <div>
                <h1 className="dark:text-neutral-300 font-bold text-xl px-4 my-3">Suggested for you</h1>
            </div>
            <div>
               <RecommenderUserList limit={users.length} variant="large" showBio={true}/>
            </div>
        </div>
    )
}

export default SuggestedUsers
