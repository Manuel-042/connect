import Posts from "../../post/components/Posts";
import { PostProps } from "../../../types";

type BookmarkedPostsProps = {
    posts: PostProps[] | null;
};


const BookmarkedPosts = ({ posts }: BookmarkedPostsProps) => {
    return (
        <section className="posts">
            {posts?.map((post, index) => (
                <Posts
                    key={index}
                    postId={post.postId}
                    userId={post.userId}
                    postContent={post.postContent}
                    datePosted={post.datePosted}
                    images={post.images}
                    metrics={post.metrics}
                />
            ))}
        </section>
    )
}

export default BookmarkedPosts