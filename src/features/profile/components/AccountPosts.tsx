import Posts from "../../post/components/Posts";
import type { Posts as PostsType } from "../../../types";

type AccountPostsProps = {
    posts: PostsType[] | null;
};


const AccountPosts = ({ posts }: AccountPostsProps) => {
    return (
        <section className="posts">
            {posts?.map((post, index) => (
                <Posts
                    key={index}
                    postId={post.postId}
                    userId={post?.user.id}
                    postContent={post.postContent}
                    datePosted={post.datePosted}
                    images={post.images}
                    metrics={post.metrics}
                />
            ))}
        </section>
    )
}

export default AccountPosts