import { twMerge } from "tailwind-merge";
import Button, { buttonStyles } from "../UI/Button";
import { LuBadgeCheck } from "react-icons/lu";
import { Link } from "react-router-dom";
import { formatCount } from "../../utils/formatCount";
import { UserProps } from "../../types";

type ProfileDisplayProps = Pick<UserProps, 'image' | 'displayname' | 'username' | 'bio' | 'followerCount' | 'followingCount' | 'isVerified'>;


const ProfileDisplay = ({ image, displayname, username, bio, followingCount, followerCount, isVerified }: ProfileDisplayProps) => {
    return (
        <div className="absolute z-50 top-6 px-3 py-4 shadow-sm dark:shadow-neutral-50 w-[250px] hidden group-hover:block bg-black rounded-lg">
            <div className="flex items-start justify-between mb-2">
                <Link to={`/${username}`}>
                    <img src={image} className="w-14 h-14 rounded-full" alt={`${displayname} profile picture`} />
                </Link>
                <Button className={twMerge(buttonStyles(), "cursor-pointer font-bold text-sm bg-white text-gray-800 hover:bg-white")}>Follow</Button>
            </div>


            <div className="flex flex-col items-start justify-center mb-3">
                <div className="flex items-center justify-center gap-2">
                    <Link to={`/${username}`}>
                        <p className="hover:underline font-bold text-l dark:text-neutral-300">{displayname}</p>
                    </Link>
                    {isVerified && <LuBadgeCheck className="text-primary" />}

                </div>
                <Link to={`/${username}`}><p className="dark:text-gray-500 text-sm">@{username}</p></Link>
            </div>

            <div className="text-sm dark:text-neutral-300 mb-2">{bio}</div>

            <div className="flex items-center justify-between">
                <Link to={`/${username}`}><p className="dark:text-gray-500 text-sm cursor-pointer hover:underline"><span className="dark:text-neutral-300 font-bold">{formatCount(followingCount)}</span> Following</p></Link>
                <Link to={`/${username}`}><p className="dark:text-gray-500 text-sm cursor-pointer hover:underline"><span className="dark:text-neutral-300 font-bold">{formatCount(followerCount)}</span> Followers</p></Link>
            </div>
        </div>
    )
}

export default ProfileDisplay