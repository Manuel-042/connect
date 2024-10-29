import { twMerge } from "tailwind-merge";
import Button, { buttonStyles } from "../UI/Button";
import ProfileDisplay from "./ProfileDisplay";
import { Link } from "react-router-dom";

type RecommendedUserProps = {
    image: string;
    displayname: string;
    username: string;
    bio: string;
    followerCount: string;
    followingCount: string;
}

const RecommendedUser = ({ image, displayname, username, bio, followerCount, followingCount }: RecommendedUserProps) => {
    return (
        <div className="p-3 flex items-center justify-between w-full gap-3 hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer">
            <div className="group relative flex items-center justify-center gap-2">
                <Link to="/">
                    <div>
                        <img src={image} alt={`${displayname}'s profile picture`} className="w-10 h-10 rounded-full" />
                    </div>
                </Link>
                <Link to="/">
                    <div>
                        <p className="dark:text-neutral-300 text-sm font-bold">{displayname}</p>
                        <p className="dark:text-neutral-300 text-xs">@{username}</p>
                    </div>
                </Link>
                

                <ProfileDisplay displayName={displayname} username={username} bio={bio} followerCount={followerCount} followingCount={followingCount} />
            </div>
            <Button className={twMerge(buttonStyles(), "cursor-pointer font-bold text-sm bg-white text-gray-800 hover:bg-white")}>Follow</Button>
        </div>
    )
}

export default RecommendedUser;
