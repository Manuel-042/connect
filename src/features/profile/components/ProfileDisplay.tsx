import { twMerge } from "tailwind-merge";
import Button, { buttonStyles } from "../../../components/UI/Button";
import { LuBadgeCheck } from "react-icons/lu";
import { Link } from "react-router-dom";
import { formatCount } from "../../../utils/formatCount";
import { useAuthContext } from "../../../context/auth-context";
import { ProfileData } from "../../../types";

type ProfileDisplayProps = {
  user: Partial<ProfileData>;
};

const ProfileDisplay = ({ user }: ProfileDisplayProps) => {
  const { profileData } = useAuthContext();
  const isLoggedInUser =
    user?.username?.toLowerCase() === profileData?.username.toLowerCase();

  return (
    <div className="absolute z-50 top-6 px-3 py-4 shadow-sm dark:shadow-neutral-50 w-[250px] hidden lg:group-hover:block bg-black rounded-lg">
      <div className="flex items-start justify-between mb-2">
        <Link to={`/${user?.username}`}>
          <img
            src={user?.avatar}
            className="w-14 h-14 rounded-full"
            alt={`${user.username} profile picture`}
          />
        </Link>
        {!isLoggedInUser && (
          <Button
            className={twMerge(
              buttonStyles(),
              "cursor-pointer font-bold text-sm bg-white text-gray-800 hover:bg-white"
            )}
          >
            Follow
          </Button>
        )}
      </div>

      <div className="flex flex-col items-start justify-center mb-3">
        <div className="flex items-center justify-center gap-2">
          <Link to={`/${user.username}`}>
            <p className="hover:underline font-bold text-l dark:text-neutral-300">
              {user.username}
            </p>
          </Link>
          {user.is_verified && <LuBadgeCheck className="text-primary" />}
        </div>
        <p className="dark:text-gray-500 text-sm">@{user?.user?.username}</p>
      </div>

      <div className="text-sm dark:text-neutral-300 mb-2">{user.bio}</div>

      <div className="flex items-center justify-between">
        <Link to={`/${user.username}`}>
          <p className="dark:text-gray-500 text-sm cursor-pointer hover:underline">
            <span className="dark:text-neutral-300 font-bold">
              {user?.following_count && formatCount(user?.following_count)}
            </span>{" "}
            Following
          </p>
        </Link>
        <Link to={`/${user.username}`}>
          <p className="dark:text-gray-500 text-sm cursor-pointer hover:underline">
            <span className="dark:text-neutral-300 font-bold">
              {user?.follower_count && formatCount(user?.follower_count)}
            </span>{" "}
            Followers
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ProfileDisplay;
