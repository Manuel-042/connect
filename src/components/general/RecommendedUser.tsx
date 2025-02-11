import { twMerge } from "tailwind-merge";
import Button, { buttonStyles } from "../UI/Button";
import { ProfileDisplay } from "../../features/profile/index";
import { Link, useNavigate } from "react-router-dom";
import { LuBadgeCheck } from "react-icons/lu";
import { ProfileData } from "../../types";

type RecommendedUserProps = ProfileData & {
  variant: string;
  showBio: boolean;
  show_creator: boolean;
};
const RecommendedUser = ({
  avatar,
  user,
  username,
  bio,
  is_verified,
  follower_count,
  following_count,
  variant = "default",
  showBio,
  show_creator = false,
}: RecommendedUserProps) => {
  const isLarge = variant === "large";
  const navigate = useNavigate();

  return (
    <div className="px-4 py-3 flex items-start justify-between w-full gap-3 hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer">
      <div className="flex items-start justify-start gap-2 w-[90%]">
        <Link to={`/${username}`} className="min-w-[8%]">
          <div>
            <img
              src={avatar}
              alt={`${user.username}'s profile picture`}
              className="w-10 h-10 rounded-full"
            />
          </div>
        </Link>
        <div onClick={() => navigate(`/${username}`)} className="flex-1">
          <div className="group relative w-max">
            <div className="flex items-center gap-1">
              <p
                className={`dark:text-white ${isLarge ? "text-[0.9rem]" : "text-[0.8rem]"} font-bold`}
              >
                {user?.username}
              </p>
              {is_verified && <LuBadgeCheck className="text-secondary" />}
            </div>
            <p
              className={`dark:text-white ${isLarge ? "text-[0.9rem]" : "text-[0.9rem]"}`}
            >
              @{username}
            </p>

            <ProfileDisplay
              user={{
                user,
                avatar,
                username,
                bio,
                is_verified,
                follower_count,
                following_count,
              }}
            />
          </div>
          {showBio && (
            <p
              className={`dark:text-white ${isLarge ? "text-base" : "text-[0.8rem]"} mt-1 line-clamp-2`}
            >
              {bio}
            </p>
          )}
        </div>
      </div>
      <Button
        className={twMerge(
          buttonStyles(),
          "cursor-pointer font-bold text-sm bg-white text-gray-800 hover:bg-white"
        )}
      >
        {show_creator ? "Subscribe" : "Follow"}
      </Button>
    </div>
  );
};

export default RecommendedUser;
