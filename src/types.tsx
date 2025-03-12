type Posts = {
  postId: number;
  user: User;
  postContent: string;
  datePosted: string;
  images: string[];
  metrics: {
    comments: number;
    retweets: number;
    likes: number;
    views: number;
  };
};

type User = {
  id: string;
  username: string;
  email: string;
};

type CreateAccountFormProps = {
  key?: string;
  next: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateFormData: (key: string, value: string) => void;
};

type VerifyAccountFormProps = {
  key?: string;
  next: () => void;
  email: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateFormData: (key: string, value: string) => void;
};

type UsernameFormProps = {
  key?: string;
  next: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateFormData: (key: string, value: string) => void;
};

type ProfilePictureFormProps = {
  key?: string;
  next: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateFormData: (key: string, value: string) => void;
};

type PasswordFormProps = {
  key?: string;
  next: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateFormData: (key: string, value: string) => void;
};

type NotificationsFormProps = {
  key?: string;
  next: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateFormData: (key: string, value: string | boolean) => void;
};

type MentionUser = {
  username: string;
  avatar: string;
  profile_username: string;
  is_following: boolean;
  is_follower: boolean;
};

type MentionListProps = {
  items: MentionUser[];
  command: (props: { id: string }) => void;
  editor: any;
};

type MediaItem = {
  url: string;
  file?: File;
  width: number;
  height: number;
  type: "image" | "gif" | "video";
};

type PollChoice = {
  text: string;
  id: string;
};

type PollLength = {
  days: number;
  hours: number;
  minutes: number;
};

type PollData = {
  choices: PollChoice[];
  length: PollLength;
};

type ProfileData = {
  user: User;
  avatar: string;
  cover_image: string;
  username: string;
  bio: string;
  follower_count: number;
  following_count: number;
  is_creator: boolean;
  is_verified: boolean;
  created_at: string;
};

type CreatePostData = {
  content: any;
  html: string | undefined;
  media?: {
    url: string;
    type: string;
    file: File | string;
    position: number;
  }[];
  poll?: {
    choices: { text: string; id: string }[];
    length: {
      days: number;
      hours: number;
      minutes: number;
    };
  };
};



export type {
  Posts,
  User,
  CreateAccountFormProps,
  VerifyAccountFormProps,
  UsernameFormProps,
  ProfilePictureFormProps,
  PasswordFormProps,
  NotificationsFormProps,
  MentionListProps,
  MentionUser,
  MediaItem,
  PollChoice,
  PollData,
  PollLength,
  ProfileData,
  CreatePostData,
};
