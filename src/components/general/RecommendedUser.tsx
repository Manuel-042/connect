import { twMerge } from "tailwind-merge";
import Button, { buttonStyles } from "../UI/Button";
import ProfileDisplay from "./ProfileDisplay";
import { Link } from "react-router-dom";

type RecommendedUserProps = {
    image: string;
    displayname: string;
    username: string;
    bio: string;
    followerCount: number;
    followingCount: number;
    variant?: "default" | "large";
    showBio?: boolean;
    show_creator?: boolean;
    isVerified: boolean;
}


const RecommendedUser = ({ image, displayname, username, bio, isVerified, followerCount, followingCount, variant="default", showBio, show_creator = false}: RecommendedUserProps) => {
    const isLarge = variant === "large";
    
    return (
        <div className="p-3 flex items-center justify-between w-full gap-3 hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer">
            <div className="flex items-start justify-start gap-2 w-[90%]">
                <Link to="/" className="min-w-[8%]">
                    <div>
                        <img src={image} alt={`${displayname}'s profile picture`} className="w-10 h-10 rounded-full" />
                    </div>
                </Link>
                <Link to="/" className="flex-1">
                    <div className="group relative w-max">
                        <p className={`dark:text-neutral-300 ${isLarge ? 'text-base' : 'text-sm'} font-bold`}>{displayname}</p>
                        <p className={`dark:text-neutral-300 ${isLarge ? 'text-sm' : 'text-xs'}`}>@{username}</p>

                        <ProfileDisplay image={image} displayname={displayname} username={username} bio={bio} followerCount={followerCount} followingCount={followingCount} isVerified={isVerified}/>
                    </div>
                    {showBio && <p className={`dark:text-neutral-300 ${isLarge ? 'text-base' : 'text-sm'} mt-1`}>{bio}</p>}

                </Link>
            </div>
            <Button className={twMerge(buttonStyles(), "cursor-pointer font-bold text-sm bg-white text-gray-800 hover:bg-white")}>{show_creator ? 'Subscribe' : 'Follow'}</Button>
        </div>
    )
}

export default RecommendedUser;
