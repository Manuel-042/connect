import RecommendedUser from "../../../components/general/RecommendedUser";
import users from "../../../data/users.json"

type Props = {
    query: string;
}

const PeopleTab = ({ query }: Props) => {

    const filteredUsers = users.filter(usr => 
        (usr.displayname && usr.displayname.toLowerCase().includes(query.toLowerCase())) || 
        (usr.username && usr.username.toLowerCase().includes(query.toLowerCase()))
    )

    return (
        <div>
            {filteredUsers.length > 0 ? (
                <div>
                    <div>
                        <div className="w-full flex flex-col relative">
                            {filteredUsers.map((user, index) => (
                                <RecommendedUser
                                    key={index}
                                    image={user.image}
                                    displayname={user.displayname}
                                    username={user.username}
                                    bio={user.bio}
                                    followerCount={user.followerCount}
                                    followingCount={user.followingCount}
                                    isVerified={user.isVerified}
                                    showBio={true}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-80 flex items-center transform translate-x-1/2 translate-y-1/2">
                    <div>
                        <h1 className="dark:text-white font-bold text-3xl mb-1">No results for "{query}"</h1>
                        <p className="dark:text-dark-text text-sm">Try searching for something else, or check your Search settings to see if they’re protecting you from potentially sensitive content.</p>
                    </div>
                </div>
            ) }
        </div>
      )
}

export default PeopleTab