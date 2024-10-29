import { LuBadgeCheck, LuMoreHorizontal, LuDot } from "react-icons/lu";
import { buttonStyles } from "../UI/Button";
import { twMerge } from "tailwind-merge";
import PostMedia from "./PostMedia";
import ProfileDisplay from "./ProfileDisplay";
import { Link, useNavigate } from "react-router-dom";
import PostProps from "../../types";
import PostMetrics from "./PostMetrics";
import formatDate from "../../utils/formatDate";


const Posts = ({ postId, postContent, datePosted, images, metrics }: PostProps) => {
    const {comments, retweets, likes, views } = metrics;

    const navigate = useNavigate();

    const handleOpenModal = (id: number) => {
        navigate(`post/${postId}/photo/${id}`);
    };

    return (
        <>
            <div className="px-4 py-3 flex items-start gap-2 border-b border-gray-700">
                <Link to="/">
                    <div className="rounded-full w-10 h-10 bg-neutral-300 flex items-center justify-center cursor-pointer">
                        <img src="https://loremflickr.com/200/200?random=4" className="rounded-full w-full h-full object-contain object-center" alt="user image" />
                    </div>
                </Link>
                <div className="w-90 grow">
                    <div className="flex items-center justify-center mb-4">
                        <div className="group relative">
                            <div className="group relative flex items-center justify-start">
                                <Link to="/">
                                    <div className="flex items-center justify-center gap-2 cursor-pointer">
                                        <p className="font-bold dark:text-neutral-300">FUTURE1369</p>
                                        <LuBadgeCheck className="text-primary" />
                                        <p className="dark:text-gray-500">@iamphinehas1</p>
                                    </div>
                                </Link>
                                <p className="dark:text-gray-500"><LuDot /></p>
                                <p className="dark:text-gray-500">{formatDate(datePosted)}</p>
                            </div>
                            <ProfileDisplay displayName="FUTURE1369" username="@iamphinehas1" bio="not impersonating anyone || tweeting anything & everything || turn notis on || ig: FearBuck || DM for submissions || for promo copiumx@yahoo.com || 
                                @Roobet" followerCount="655.8k" followingCount="1,202" />
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