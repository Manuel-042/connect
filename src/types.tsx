
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

type UserProps = {
    id: number;
    image: string;
    coverPhoto: string;
    displayname: string;
    username: string;
    bio: string;
    followerCount: number;
    followingCount: number;
    isCreator: boolean;
    isVerified: boolean;
    createdAt: string;
}

export type {PostProps, UserProps};