import type { Posts as PostType } from "../../../types";
import { Posts } from "../../post";

type Props = {
    posts: PostType[] | []
    query: string;
}

const LatestTab = ({ query, posts }: Props) => {
    
    console.log("POsts before", posts);
    if (!query || !posts) return null;
    console.log("POsts", posts);

    const filteredPosts = posts.filter(post => {
        const matchesQuery = post.postContent.toLowerCase().includes(query.toLowerCase());

        const currentTime = new Date();

        // Check if the post was made within the last hour
        const postTime = new Date(post.datePosted);
        const timeDifference = currentTime.getTime() - postTime.getTime();
        const oneHourInMilliseconds = 60 * 60 * 1000;

        const isWithinOneHour = timeDifference <= oneHourInMilliseconds;
        return matchesQuery && isWithinOneHour;
    });

    return (
        <div>
            {filteredPosts.length > 0 ? (
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
            ) : (
                <div className="w-80 flex items-center transform translate-x-1/2 translate-y-1/2">
                    <div>
                        <h1 className="dark:text-white font-bold text-3xl mb-1">No results for "{query}"</h1>
                        <p className="dark:text-dark-text text-sm">Try searching for something else, or check your Search settings to see if they’re protecting you from potentially sensitive content.</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LatestTab