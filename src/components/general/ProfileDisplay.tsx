import { twMerge } from "tailwind-merge";
import Button, { buttonStyles } from "../UI/Button";
import { LuBadgeCheck } from "react-icons/lu";
import { Link } from "react-router-dom";


type ProfileDisplayProps = {
    displayName: string;
    username: string;
    bio: string;
    followingCount: string;
    followerCount: string;
}

const ProfileDisplay = ({displayName, username, bio, followingCount, followerCount}: ProfileDisplayProps) => {
  return (
    <div className="absolute z-50 top-10 px-3 py-4 shadow-lg mb-2 w-[250px] invisible group-hover:visible bg-black rounded-lg">
        <Link to="/">
            <div className="flex items-start justify-between mb-2">
                <img src="https://loremflickr.com/200/200?random=10" className="w-14 h-14 rounded-full" alt="image10" />
                <Button className={twMerge(buttonStyles(), "cursor-pointer font-bold text-sm bg-white text-gray-800 hover:bg-white")}>Follow</Button>
            </div>
        </Link>

        <div className="flex flex-col items-start justify-center mb-3">
            <div className="flex items-center justify-center gap-2">
                <Link to="/"><p className="font-bold text-l dark:text-neutral-300">{displayName}</p></Link>
                <LuBadgeCheck className="text-primary" />
            </div>
            <Link to="/"><p className="dark:text-gray-500 text-sm">{username}</p></Link>
        </div>

        <div className="text-sm dark:text-neutral-300 mb-2">{bio}</div>

        <div className="flex items-center justify-between">
            <Link to="/"><p className="dark:text-gray-500 text-sm cursor-pointer hover:underline"><span className="dark:text-neutral-300 font-bold">{followingCount}</span> Following</p></Link>
            <Link to="/"><p className="dark:text-gray-500 text-sm cursor-pointer hover:underline"><span className="dark:text-neutral-300 font-bold">{followerCount}</span> Followers</p></Link>
        </div>
    </div>
  )
}

export default ProfileDisplay