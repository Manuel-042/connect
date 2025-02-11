import Posts from "../../post/components/Posts";
//import { Posts } from "../../../types";

type BookmarkedPostsProps = {
    posts: any;
};


const BookmarkedPosts = ({ posts }: BookmarkedPostsProps) => {
    return (
        <section className="posts">
            {posts?.map((post: any, index: number) => (
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