import { LuMessageSquare, LuRepeat2, LuHeart, LuBarChart, LuBookmark, LuUpload } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../../../components/UI/Button"


type PostMetricsProps = {
    comments: number;
    retweets: number;
    likes: number;
    views: number;
    bookmark?: boolean;
    showViews?: boolean; 
    variant?: "large" | "small";
}

const PostMetrics = ({comments, retweets, likes, views, showViews = true, bookmark = true, variant = "small"}: PostMetricsProps) => {
    const isLarge = variant === "large"
    return (
        <div className="flex items-center justify-between gap-1 sm:gap-3">
            <div className="flex items-center justify-between gap-0.5 text-sm dark:text-dark-text dark:hover:text-primary">
                <LuMessageSquare className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), `${isLarge ? 'w-10 h-10' : '' } cursor-pointer text-white dark:text-dark-text  dark:hover:text-primary`)} />
                <span className="-ms-2">{comments}</span>
            </div>
            <div className="flex items-center justify-between gap-0.5 text-sm dark:text-dark-text dark:hover:text-green-500">
                <LuRepeat2 className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), `${isLarge ? 'w-10 h-10' : '' } cursor-pointer text-white dark:text-dark-text  dark:hover:text-green-500` )} />
                <span className="-ms-2">{retweets}</span>
            </div>
            <div className="flex items-center justify-between gap-0.5 text-sm dark:text-dark-text dark:hover:text-rose-500">
                <LuHeart className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), `${isLarge ? 'w-10 h-10' : '' } cursor-pointer text-white dark:text-dark-text  dark:hover:text-rose-500` )} />
                <span className="-ms-2">{likes}</span>
            </div>
            {showViews && <div className="flex items-center justify-between gap-0.5 text-sm dark:text-dark-text dark:hover:text-primary">
                <LuBarChart className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), `${isLarge ? 'w-10 h-10' : '' } cursor-pointer text-white dark:text-dark-text dark:hover:text-primary` )} />
                <span className="-ms-2">{views}</span>
            </div>}

            <div className="flex items-center justify-between gap-1">
                {bookmark && <LuBookmark className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "hidden sm:block cursor-pointer dark:text-dark-text  dark:hover:text-primary")} />}
                <LuUpload className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "hidden sm:block cursor-pointer text-white dark:text-dark-text dark:hover:text-primary")} />
            </div>
        </div>
    )
}

export default PostMetrics