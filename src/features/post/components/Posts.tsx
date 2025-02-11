import { LuBadgeCheck, LuEllipsis, LuDot } from "react-icons/lu";
import { buttonStyles } from "../../../components/UI/Button";
import { twMerge } from "tailwind-merge";
import PostMedia from "./PostMedia";
// import ProfileDisplay from "../../profile/components/ProfileDisplay";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { User } from "../../../types";
import PostMetrics from "./PostMetrics";
import formatDate from "../../../utils/formatDate";
import users from "../../../data/users.json"
import { useEffect, useState } from "react";

import type { Posts as PostsType } from "../../../types";


const Posts = ({ postId, userId, postContent, datePosted, images, metrics }: PostsType | any) => {
    const { comments, retweets, likes, views } = metrics;

    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState<User | any>(null);

    useEffect(() => {
        const foundUser = users.find(user => Number(user.user.id) === Number(userId));
        if (!foundUser) {
            return
        }
        setUser(foundUser);
    }, [userId, users]);

    if (!user) return null;

    const handleOpenModal = (id: number) => {
        navigate(`/post/${postId}/photo/${id}`, { state: { previousLocation: location.pathname, userData: user } });
    };

    return (
        <>
            <div className="px-4 py-3 flex items-start gap-3 border-b border-dark-border">
                <div className="max-w-[15%]">
                    <Link to={`/${user?.username}`}>
                        <div className="rounded-full w-10 h-10 bg-neutral-300 flex items-center justify-center cursor-pointer">
                            <img src={user?.image} className="rounded-full w-full h-full object-contain object-center" alt="user image" />
                        </div>
                    </Link>
                </div>
                
                <div className="max-w-[90%] grow">
                    <div className="flex items-start justify-center mb-4">
                        <div>
                            <div className="hidden group relative sm:flex items-center justify-start">
                                <Link to={`/${user?.username}`}>
                                    <div className="flex items-center justify-center gap-2 cursor-pointer">
                                        <p className="hover:underline font-bold dark:text-neutral-300">{user?.displayname} <span className="inline-block">{user?.isVerified && <LuBadgeCheck className="text-primary" />}</span></p>
                                        <p className="dark:text-gray-500 max-w-24 md:max-w-full truncate">@{user?.username}</p>
                                    </div>
                                </Link>
                                <p className="dark:text-gray-500"><LuDot /></p>
                                <p className="dark:text-gray-500">{formatDate(datePosted)}</p>
                                {/* <ProfileDisplay image={user?.image} displayname={user?.displayname} username={user?.username} bio={user?.bio} followerCount={user?.followerCount} followingCount={user?.followingCount} isVerified={user?.isVerified} /> */}
                            </div>

                            <div className="sm:hidden group relative flex items-start justify-start">
                                <Link to={`/${user?.username}`}>
                                    <div className="flex flex-col items-start justify-center gap-1 cursor-pointer">

                                        <p className="w-full hover:underline font-bold dark:text-neutral-300 flex items-center gap-1">{user?.displayname} {user?.isVerified && <LuBadgeCheck className="text-primary" />}</p>

                                        <div className="flex items-center text-[0.9rem] -mt-1">
                                            <p className="dark:text-gray-500">@{user?.username}</p>
                                            <div className="dark:text-gray-500"><LuDot /></div>
                                            <p className="dark:text-gray-500">{formatDate(datePosted)}</p>
                                        </div>
                                    </div>
                                </Link>
                                
                                {/* <ProfileDisplay image={user?.image} displayname={user?.displayname} username={user?.username} bio={user?.bio} followerCount={user?.followerCount} followingCount={user?.followingCount} isVerified={user?.isVerified} /> */}
                            </div>

                            <div>
                                <p className="dark:text-neutral-300">{postContent}</p>
                            </div>
                        </div>
                        <div className="justify-self-end ms-auto"><LuEllipsis className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer p-1 w-7 h-7 dark:text-gray-500  dark:hover:text-primary")} /></div>
                    </div>

                    <div className="mb-4">
                        <PostMedia images={images} handleOpenModal={handleOpenModal} />
                    </div>

                    <PostMetrics comments={comments} retweets={retweets} likes={likes} views={views} />
                </div>
            </div>
        </>
    )
}

export default Posts