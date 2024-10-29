
type PostProps = {
    postId: number;
    userId?: number;
    postContent: string;
    datePosted: string;
    images: string[];
    metrics: {
        comments: number;
        retweets: number;
        likes: number;
        views: number;
    }
}

export default PostProps;