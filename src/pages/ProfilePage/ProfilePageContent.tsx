import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuBadgeCheck,
  LuCalendarDays,
  LuMail,
  LuEllipsis,
} from "react-icons/lu";
import Button, { buttonStyles } from "../../components/UI/Button";
import { formatCount } from "../../utils/formatCount";
import { twMerge } from "tailwind-merge";
import formatDate from "../../utils/formatDate";
import { useAuthContext } from "../../context/auth-context";
import { AccountPosts } from "../../features/profile/index";
import { AccountMedia } from "../../features/profile/index";
import { useUserByUsername } from "../../hooks/useUser";
import { Posts, ProfileData } from "../../types";
import { useUserPosts } from "../../hooks/useUserPosts";
import { Oval } from "react-loader-spinner";
import { useToast } from "../../hooks/useToast";

const ProfilePageContent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { profileData: loggedInProfile } = useAuthContext();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const { toast } = useToast();
  const [totalLikes, setTotalLikes] = useState(0);

  if (!username) return null;

  useEffect(() => {
    setActiveIndex(0);
  }, [username]);

  const isLoggedInUser = username.toLowerCase() === loggedInProfile?.username.toLowerCase();

  const {
    data: fetchedProfile,
    isLoading: isUserLoading,
    error: userError,
  } = useUserByUsername(username, isLoggedInUser);

  useEffect(() => {
    if (isLoggedInUser) {
      setProfile(loggedInProfile as unknown as ProfileData);
    } else {
      setProfile(fetchedProfile || null);
    }
  }, [isLoggedInUser, loggedInProfile, fetchedProfile]);

  const userId = useMemo(() => profile?.user?.id ?? null, [profile]);

  const {
    data: posts,
    isLoading: isPostLoading,
    error: postError,
  } = useUserPosts(Number(userId));

  useEffect(() => {
    if (!Array.isArray(posts) || !posts) return;
    const likesSum = posts.reduce((acc: number, post: Posts) => acc + (post.metrics?.likes || 0), 0);
    setTotalLikes(likesSum);
  }, [posts]);

  if (isUserLoading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Oval visible={true} height="80" width="80" color="#ffffff" ariaLabel="oval-loading" />
      </div>
    );

  if (userError) toast.error(userError.message);
  if (postError) toast.error(postError.message);

  const labels = isLoggedInUser
    ? ["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"]
    : ["Posts", "Replies", "Media"];
  const from = location.state?.from?.pathname || "/home";

  const handleBackClick = () => {
    navigate(from, { replace: true });
  };

  console.log({ PROFILE: profile });
  console.log({ POSTS: posts });
  

  return (
    <>
      <div className="sticky top-0 z-10 dark:bg-black dark:bg-opacity-90 flex items-center gap-3 p-1">
        <div
          className="flex items-center justify-center"
          onClick={handleBackClick}
        >
          <Button
            className={twMerge(
              buttonStyles({ variant: "ghost", size: "icon" }),
              "cursor-pointer w-10 h-10 text-white bg-transparent"
            )}
          >
            <LuArrowLeft className="text-xl" />
          </Button>
        </div>
        <div className="flex flex-col items-start justify-start">
          <div className="flex items-center gap-2">
            <h1 className="dark:text-white text-base sm:text-lg font-bold">
              {profile?.username}
            </h1>
            {profile?.is_verified && <LuBadgeCheck className="text-primary" />}
          </div>
          <p className="dark:text-dark-text text-sm sm:text-base">
            {totalLikes} likes
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="h-28 sm:h-36 smd:h-44 mlg:h-48 cursor-pointer">
          <Link
            to="header_photo"
            state={{
              coverPhoto: profile?.cover_image,
              previousLocation: location.pathname,
            }}
          >
            <img
              src={profile?.cover_image}
              className="w-full h-full object-cover object-center"
              alt="user's cover photo"
            />
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-20 h-20 sm:w-28 sm:h-28 smd:w-32 smd:h-32 mlg:w-36 mlg:h-36 absolute left-5 top-[4.5rem] sm:top-[5rem] smd:top-[6.5rem] mlg:top-[7rem] cursor-pointer">
            <Link
              to="photo"
              state={{
                profilePhoto: profile?.avatar,
                previousLocation: location.pathname,
              }}
            >
              <img
                src={profile?.avatar}
                alt={`${profile?.username} profile picture`}
                className="border-2 smd:border-4 border-black rounded-full w-full h-full"
              />
            </Link>
          </div>
          <div className="mt-3 me-4 ms-auto">
            {isLoggedInUser ? (
              <Button
                className={twMerge(
                  buttonStyles(),
                  "cursor-pointer bg-transparent dark:text-white border dark:hover:border-neutral-300 hover:bg-gray-400 hover:bg-opacity-20 font-bold text-sm"
                )}
              >
                <Link
                  to="profile"
                  state={{ user: profile, previousLocation: location.pathname }}
                >
                  Edit profile
                </Link>
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="border rounded-full border-dark-border">
                  <Button
                    className={twMerge(
                      buttonStyles({ variant: "ghost", size: "icon" }),
                      "cursor-pointer w-10 h-10 text-white bg-transparent"
                    )}
                  >
                    <LuEllipsis className="text-xl" />
                  </Button>
                </div>
                <div className="border rounded-full border-dark-border">
                  <Button
                    className={twMerge(
                      buttonStyles({ variant: "ghost", size: "icon" }),
                      "cursor-pointer w-10 h-10 text-white bg-transparent"
                    )}
                  >
                    <LuMail className="text-xl" />
                  </Button>
                </div>
                <Button
                  className={twMerge(
                    buttonStyles(),
                    "cursor-pointer dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-bold"
                  )}
                >
                  Follow
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-2 smd:mt-4 mlg:mt-8 px-4">
        <div className="flex items-center gap-2">
          <p className="dark:text-white font-bold text-lg">
            {profile?.user.username}
          </p>
          {profile?.is_verified ? (
            <LuBadgeCheck className="text-primary" />
          ) : (
            <Button className="flex items-center gap-1 bg-transparent text-xs hover:bg-tranparent border border-secondary px-2 py-1">
              <LuBadgeCheck className="text-primary" />
              Get Verified
            </Button>
          )}
        </div>
        <p className="dark:text-dark-text text-sm md:text-base -mt-1">
          @{profile?.username}
        </p>
        <div className="text-sm md:text-base dark:text-white mt-4">
          {profile?.bio}
        </div>

        <div className="mt-3 flex items-center gap-1">
          <LuCalendarDays
            className={twMerge(
              buttonStyles({ variant: "ghost", size: "icon" }),
              "cursor-pointer w-4 h-4 rounded-none dark:text-dark-text bg-transparent p-0"
            )}
          />
          <p className="dark:text-dark-text text-sm md:text-base">
            Joined {profile?.created_at && formatDate(profile.created_at)}
          </p>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <p className="dark:text-dark-text text-sm">
            <span className="dark:text-white font-semibold">
              {formatCount(profile?.following_count || 0)}
            </span>{" "}
            Following
          </p>
          <p className="dark:text-dark-text text-sm">
            <span className="dark:text-white font-semibold">
              {formatCount(profile?.follower_count || 0)}
            </span>{" "}
            {profile?.follower_count || 0 > 1 ? "Followers" : "Follower"}
          </p>
        </div>
      </div>

      <div className="flex mt-6 border-b border-dark-border overflow-x-auto md:overflow-visible no-scrollbar">
        {labels.map((label, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`flex-1 flex items-center justify-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-20`}
          >
            <p
              className={`dark:text-dark-text text-opacity-20 px-4 py-3 ${activeIndex === index ? "border-b-4 border-blue-500 dark:text-white" : ""}`}
            >
              {label}
            </p>
          </button>
        ))}
      </div>

      <section className="w-full mb-4 min-h-40 flex items-center justify-center">
        {isPostLoading ? (
          <div className="flex flex-col items-center justify-center">
            <Oval
              visible={true}
              height="40"
              width="40"
              color="#ffffff"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
            <p className="mt-2 dark:text-dark-text">Loading posts...</p>
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="w-full">
            {activeIndex === 0 && <AccountPosts posts={posts} />}

            {((isLoggedInUser && activeIndex === 4) ||
              (!isLoggedInUser && activeIndex === 2)) && (
              <div className="flex flex-wrap">
                {posts.map((post: Posts, postIndex: number) => {
                  console.log("got here");
                  const imageIndex = post.media.indexOf(post.media[0]);
                  return (
                    <div className="w-max" key={postIndex}>
                      <Link
                        to={`/post/${post.id}/photo/${imageIndex}`}
                        state={{ previousLocation: location.pathname }}
                      >
                        <AccountMedia media={post.media} />
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <p className="dark:text-dark-text text-base">No posts available.</p>
        )}
      </section>
    </>
  );
};

export default ProfilePageContent;
