import { useNavigate } from "react-router-dom";
import RecommendedUser from "../../../components/general/RecommendedUser";
import users from "../../../data/users.json"
import { Posts } from "../../post";
import type { Posts as PostType } from "../../../types";

type Props = {
    query: string;
    posts: PostType[] | []
    setActiveIndex: (index: number) => void;
}

const TopTab = ({ query, setActiveIndex, posts }: Props) => {
    const navigate = useNavigate();

    console.log("POsts before", posts);
    if (!query || !posts) return null;
    console.log("POsts", posts);

    const filteredPosts = posts.filter(post => post.postContent.toLowerCase().includes(query.toLowerCase()))

    const filteredUsers = users.filter(usr => 
        (usr.user.username && usr.user.username.toLowerCase().includes(query.toLowerCase())) || 
        (usr.username && usr.username.toLowerCase().includes(query.toLowerCase()))
    )

    const limit = 2;

    const handleShowMore = () => {
        navigate(`/search?q=${query}&src=trend_click&f=user`);
        setActiveIndex(2);
    }

  return (
    <div>
        {filteredPosts.length > 0 ? (
            <div>
                <div>
                    <h1 className="dark:text-white font-bold text-lg mx-5 my-2">People</h1>
                    <div className="w-full flex flex-col relative">
                        {filteredUsers.slice(0, limit).map((user, index) => (
                            <RecommendedUser
                                key={index}
                                avatar={user.avatar}
                                user={user.user}
                                username={user.username}
                                bio={user.bio}
                                follower_count={user.follower_count}
                                following_count={user.following_count}
                                is_verified={user.is_verified}
                            />
                        ))}
                        <div className="px-3 py-3 text-sm font-semibold cursor-pointer hover:bg-gray-500 hover:bg-opacity-20 "><p onClick={handleShowMore} className="text-secondary-100">Show more</p></div>
                    </div>
                </div>

                <div className="w-full flex flex-col relative">
                    {filteredPosts.map((post, index) => (
                        <Posts
                            key={index} 
                            postId={post.postId} 
                            userId={post.user.id}
                            postContent={post.postContent}
                            datePosted={post.datePosted}
                            images={post.images} 
                            metrics={post.metrics} 
                        />
                    ))}
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

export default TopTab