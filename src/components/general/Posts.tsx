import { LuBadgeCheck, LuMoreHorizontal, LuDot } from "react-icons/lu";
import { buttonStyles } from "../UI/Button";
import { twMerge } from "tailwind-merge";
import PostMedia from "./PostMedia";
import ProfileDisplay from "./ProfileDisplay";
import { Link, useNavigate } from "react-router-dom";
import { PostProps } from "../../types";
import PostMetrics from "./PostMetrics";
import formatDate from "../../utils/formatDate";
import users from "../../data/users.json"
import { useEffect, useState } from "react";
import { UserProps } from "../../types";

const Posts = ({ postId, userId, postContent, datePosted, images, metrics }: PostProps) => {
    const {comments, retweets, likes, views } = metrics;

    const navigate = useNavigate();

    const handleOpenModal = (id: number) => {
        navigate(`post/${postId}/photo/${id}`);
    };

    const [user, setUser] = useState<UserProps | null>(null); 

    useEffect(() => {
        const foundUser = users.find(user => user.id === Number(userId)); 
        if (!foundUser) {
            return
        }
        setUser(foundUser);
    }, [userId, users]); 

    if (!user) return null;

    return (
        <>
            <div className="px-4 py-3 flex items-start gap-2 border-b border-gray-700">
                <Link to="/">
                    <div className="rounded-full w-10 h-10 bg-neutral-300 flex items-center justify-center cursor-pointer">
                        <img src={user?.image} className="rounded-full w-full h-full object-contain object-center" alt="user image" />
                    </div>
                </Link>
                <div className="w-90 grow">
                    <div className="flex items-center justify-center mb-4">
                        <div>
                            <div className="group relative flex items-center justify-start">
                                <Link to="/">
                                    <div className="flex items-center justify-center gap-2 cursor-pointer">
                                        <p className="hover:underline font-bold dark:text-neutral-300">{user?.displayname}</p>
                                        {user?.isVerified && <LuBadgeCheck className="text-primary" />}
                                        <p className="dark:text-gray-500">@{user?.username}</p>
                                    </div>
                                </Link>
                                <p className="dark:text-gray-500"><LuDot /></p>
                                <p className="dark:text-gray-500">{formatDate(datePosted)}</p>
                                <ProfileDisplay image={user?.image} displayname={user?.displayname} username={user?.username} bio={user?.bio} followerCount={user?.followerCount} followingCount={user?.followingCount} isVerified={user?.isVerified} />
                            </div>
                            <div>
                                <p className="dark:text-neutral-300">{postContent}</p>
                            </div>
                        </div>
                        <div className="justify-self-end ms-auto"><LuMoreHorizontal className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer  dark:text-gray-500  dark:hover:text-primary")} /></div>
                    </div>

                    <PostMedia images={images} handleOpenModal={handleOpenModal} />

                    <PostMetrics comments={comments} retweets={retweets} likes={likes} views={views} />
                </div>
            </div>
        </>
    )
}

export default Posts