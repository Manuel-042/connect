import Posts from "../../post/components/Posts";
import type { Posts as PostsType } from "../../../types";

type AccountPostsProps = {
    posts: PostsType[] | null;
};


const AccountPosts = ({ posts }: AccountPostsProps) => {
    return (
        <>
            {posts?.map((post, index) => (
                <Posts
                    key={index}
                    id={post.id}
                    user={post?.user}
                    content={post.content}
                    created_at={post.created_at}
                    media={post.media}
                    has_media={post.has_media}
                    metrics={post.metrics}
                />
            ))}
        </>
    )
}

export default AccountPosts