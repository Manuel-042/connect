import { twMerge } from "tailwind-merge";
import Button, { buttonStyles } from "../UI/Button";
import {ProfileDisplay} from "../../features/profile/index";
import { Link } from "react-router-dom";
import { LuBadgeCheck } from "react-icons/lu";

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
        <div className="px-4 py-3 flex items-start justify-between w-full gap-3 hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer">
            <div className="flex items-start justify-start gap-2 w-[90%]">
                <Link to={`/${username}`} className="min-w-[8%]">
                    <div>
                        <img src={image} alt={`${displayname}'s profile picture`} className="w-10 h-10 rounded-full" />
                    </div>
                </Link>
                <Link to={`/${username}`} className="flex-1">
                    <div className="group relative w-max">
                        <div className="flex items-center gap-1">
                            <p className={`dark:text-white ${isLarge ? 'text-[0.9rem]' : 'text-[0.8rem]'} font-bold`}>{displayname}</p>
                            {isVerified && <LuBadgeCheck className="text-secondary" />}
                        </div>
                        <p className={`dark:text-white ${isLarge ? 'text-[0.9rem]' : 'text-[0.9rem]'}`}>@{username}</p>

                        <ProfileDisplay image={image} displayname={displayname} username={username} bio={bio} followerCount={followerCount} followingCount={followingCount} isVerified={isVerified}/>
                    </div>
                    {showBio && <p className={`dark:text-white ${isLarge ? 'text-base' : 'text-[0.8rem]'} mt-1 line-clamp-2`}>{bio}</p>}

                </Link>
            </div>
            <Button className={twMerge(buttonStyles(), "cursor-pointer font-bold text-sm bg-white text-gray-800 hover:bg-white")}>{show_creator ? 'Subscribe' : 'Follow'}</Button>
        </div>
    )
}

export default RecommendedUser;
