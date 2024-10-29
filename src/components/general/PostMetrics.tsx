import { LuMessageSquare, LuRepeat2, LuHeart, LuBarChart, LuBookmark, LuUpload } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../UI/Button";


type PostMetricsProps = {
    comments: number;
    retweets: number;
    likes: number;
    views: number;
}

const PostMetrics = ({comments, retweets, likes, views}: PostMetricsProps) => {
    return (
        <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center justify-between gap-0.5 text-sm dark:text-gray-500 dark:hover:text-primary">
                <LuMessageSquare className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "cursor-pointer dark:text-gray-500  dark:hover:text-primary")} />
                <span>{comments}</span>
            </div>
            <div className="flex items-center justify-between gap-0.5 text-sm dark:text-gray-500 dark:hover:text-green-500">
                <LuRepeat2 className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "cursor-pointer dark:text-gray-500  dark:hover:text-green-500")} />
                <span>{retweets}</span>
            </div>
            <div className="flex items-center justify-between gap-0.5 text-sm dark:text-gray-500 dark:hover:text-rose-500">
                <LuHeart className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "cursor-pointer dark:text-gray-500  dark:hover:text-rose-500")} />
                <span>{likes}</span>
            </div>
            <div className="flex items-center justify-between gap-0.5 text-sm dark:text-gray-500 dark:hover:text-primary">
                <LuBarChart className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "cursor-pointer dark:text-gray-500 dark:hover:text-primary")} />
                <span>{views}</span>
            </div>

            <div className="flex items-center justify-between gap-1">
                <LuBookmark className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "cursor-pointer dark:text-gray-500  dark:hover:text-primary")} />
                <LuUpload className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "cursor-pointer dark:text-gray-500 dark:hover:text-primary")} />
            </div>
        </div>
    )
}

export default PostMetrics