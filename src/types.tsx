
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

type CreateAccountFormProps = {
    key?: string;
    next: () => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    updateFormData: (key: string, value: string) => void;
}

type VerifyAccountFormProps = {
    key?: string;
    next: () => void;
    email: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    updateFormData: (key: string, value: string) => void;
}

type UsernameFormProps = {
    key?: string;
    next: () => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    updateFormData: (key: string, value: string) => void;
}

type ProfilePictureFormProps = {
    key?: string;
    next: () => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    updateFormData: (key: string, value: string) => void;
}

type PasswordFormProps = {
    key?: string;
    next: () => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    updateFormData: (key: string, value: string) => void;
}

type NotificationsFormProps = {
    key?: string;
    next: () => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    updateFormData: (key: string, value: string | boolean) => void;
}

export type { PostProps, UserProps, CreateAccountFormProps, VerifyAccountFormProps, UsernameFormProps, ProfilePictureFormProps, PasswordFormProps, NotificationsFormProps };