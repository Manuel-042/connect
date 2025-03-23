import { LuBadgeCheck, LuEllipsis, LuDot } from "react-icons/lu";
import { buttonStyles } from "../../../components/UI/Button";
import { twMerge } from "tailwind-merge";
import PostMedia from "./PostMedia";
// import ProfileDisplay from "../../profile/components/ProfileDisplay";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PostMetrics from "./PostMetrics";
import formatDate from "../../../utils/formatDate";
import type { Posts as PostsType } from "../../../types";
import { useUserProfile } from "../../../hooks/useUserProfile";
import DOMPurify from 'dompurify'


const Posts = ({ id: ID, user, content, created_at, has_media, media, metrics }: PostsType | any) => {
    const { comments, retweets, likes, views } = metrics;

    const navigate = useNavigate();
    const location = useLocation();

    const { data: userData, error, isLoading, isError } = useUserProfile(user?.id.toString());

    console.log({ "User Profile Data": userData })

    const handleOpenModal = (id: number) => {
        navigate(`/post/${ID}/photo/${id}`, { state: { previousLocation: location.pathname, userData: user } });
    };

    return (
        <>
            <div className="px-4 py-3 flex items-start gap-3 border-b border-dark-border">
                <div className="max-w-[15%]">
                    <Link to={`/${user?.username}`}>
                        <div className="rounded-full w-10 h-10 bg-neutral-300 flex items-center justify-center cursor-pointer">
                            <img src={userData?.avatar} className="rounded-full w-full h-full object-cover object-center" alt="user image" />
                        </div>
                    </Link>
                </div>
                
                <div className="max-w-[90%] grow">
                    <div className="flex items-start justify-center mb-4">
                        <div>
                            <div className="hidden group relative sm:flex items-center justify-start">
                                <Link to={`/${userData?.username}`}>
                                    <div className="flex items-center justify-center gap-1 cursor-pointer">
                                        <p className="hover:underline font-bold dark:text-neutral-300">{user.username} <span className="inline-block">{user?.is_verified && <LuBadgeCheck className="text-primary" />}</span></p>
                                        <p className="dark:text-gray-500 max-w-24 md:max-w-full truncate">@{userData?.username}</p>
                                    </div>
                                </Link>
                                <p className="dark:text-gray-500"><LuDot /></p>
                                <p className="dark:text-gray-500">{formatDate(created_at)}</p>
                                {/* <ProfileDisplay image={user?.image} displayname={user?.displayname} username={user?.username} bio={user?.bio} followerCount={user?.followerCount} followingCount={user?.followingCount} isVerified={user?.isVerified} /> */}
                            </div>

                            <div className="sm:hidden group relative flex items-start justify-start">
                                <Link to={`/${user?.username}`}>
                                    <div className="flex flex-col items-start justify-center gap-1 cursor-pointer">

                                        <p className="w-full hover:underline font-bold dark:text-neutral-300 flex items-center gap-1">{user?.username} {user?.is_verified && <LuBadgeCheck className="text-primary" />}</p>

                                        <div className="flex items-center text-[0.9rem] -mt-1">
                                            <p className="dark:text-gray-500">@{userData?.username}</p>
                                            <div className="dark:text-gray-500"><LuDot /></div>
                                            <p className="dark:text-gray-500">{formatDate(created_at)}</p>
                                        </div>
                                    </div>
                                </Link>
                                
                                {/* <ProfileDisplay image={user?.image} displayname={user?.displayname} username={user?.username} bio={user?.bio} followerCount={user?.followerCount} followingCount={user?.followingCount} isVerified={user?.isVerified} /> */}
                            </div>

                            <div className="mt-1 dark:text-neutral-300" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}></div>
                        </div>
                        <div className="justify-self-end ms-auto"><LuEllipsis className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer p-1 w-7 h-7 dark:text-gray-500  dark:hover:text-primary")} /></div>
                    </div>

                    <div className="mb-4">
                        {has_media && <PostMedia media={media} handleOpenModal={handleOpenModal} />}
                    </div>

                    <PostMetrics comments={comments} retweets={retweets} likes={likes} views={views} />
                </div>
            </div>
        </>
    )
}

export default Posts