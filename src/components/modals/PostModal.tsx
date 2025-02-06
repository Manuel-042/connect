import ReactDOM from 'react-dom';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import postData from "../../data/posts.json"
import { useEffect, useState } from 'react';
import { PostProps } from '../../types';
import { PostMetrics } from '../../features/post/index';
import { LuX, LuEllipsis, LuBadgeCheck, LuDot } from "react-icons/lu";
import Button, { buttonStyles } from '../UI/Button';
import { twMerge } from 'tailwind-merge';
import EmblaCarousel from '../UI/Carousel';

import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { ProfileDisplay } from '../../features/profile';

const PostModal = () => {
    const modalRoot = document.getElementById('modal-root');
    const { postId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.previousLocation;
    const user = location.state?.userData;
    const [post, setPost] = useState<PostProps | null>(null)

    useEffect(() => {
        disableBodyScroll(document.body);
        return () => {
            enableBodyScroll(document.body);
        };
    }, []);

    useEffect(() => {
        const appRoot = document.getElementById("root");
        const modalRoot = document.getElementById("modal-root");

        const appInnerDiv = appRoot?.firstElementChild;

        if (appInnerDiv && modalRoot && appInnerDiv.classList.contains("dark")) {
            modalRoot.classList.add("dark");
        } else if (modalRoot) {
            modalRoot.classList.remove("dark");
        }
    }, []);

    useEffect(() => {
        const foundPost = postData?.posts?.find((p: { postId: number }) => p.postId === Number(postId));

        console.log({ foundPost })

        if (foundPost) {
            setPost(foundPost);
        }
    }, [postData, postId]);

    const handleCloseModal = () => {
        navigate(from, { replace: true });
    };

    if (!modalRoot || !post || !user) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className="modal-overlay2" onClick={handleCloseModal}>
            <Button type="button" onClick={handleCloseModal} className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "close-button bg-transparent hover:bg-opacity-10 z-30 hover:bg-gray-400 text-white w-10 h-10")}><LuX className="text-2xl" /></Button>

            <div onClick={e => e.stopPropagation()}>
                <div className="text-white bg-black bg-opacity-50 w-full h-screen flex items-start justify-between">

                    <div className="w-[71%] h-full relative flex flex-col items-center justify-center border-r border-gray-700">

                        <EmblaCarousel images={post.images} />

                        <div className='justify-self-end mt-3 w-[70%]'>
                            <PostMetrics comments={post?.metrics.comments} retweets={post?.metrics.retweets} likes={post?.metrics.likes} views={post?.metrics.views} bookmark={false} variant='large'/>
                        </div>
                    </div>

                    <div className='w-[29%] py-5 px-3 h-[100%] overflow-y-auto overflow-x-hidden'>
                        <div className='pb-5 border-b border-gray-700'>
                            <div className='flex items-start justify-start gap-2'>
                                <div className="rounded-full w-10 h-10 bg-neutral-300 flex items-center justify-center cursor-pointer">
                                    <img src="https://loremflickr.com/200/200?random=4" className="rounded-full w-full h-full object-contain object-center" alt="user image" />
                                </div>
                                <div className="flex items-center justify-between mb-4 w-[85%]">
                                    <div className="group relative">
                                        <div className="relative flex items-center justify-start">
                                            <div className="flex flex-col items-start justify-center cursor-pointer gap-0">
                                                <div className='flex items-center gap-1'>
                                                    <p className="font-bold dark:text-neutral-300">{user?.displayname}</p>
                                                    {user?.isVerified && <LuBadgeCheck className="text-primary" />}
                                                </div>
                                                <p className="dark:text-gray-500 -mt-1">@{user?.username}</p>
                                            </div>
                                        </div>
                                        <ProfileDisplay image={user?.image} displayname={user?.displayname} username={user?.username} bio={user?.bio} followerCount={user?.followerCount} followingCount={user?.followingCount} isVerified={user?.isVerified} />
                                    </div>
                                    <div className="justify-self-end ms-auto"><LuEllipsis className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer  dark:text-gray-500  dark:hover:text-primary")} /></div>
                                </div>
                            </div>

                            <div className='mb-3'>
                                <p className="dark:text-neutral-300 text-xl">{post.postContent}</p>
                            </div>

                            <div className='flex items-center justify-start gap-5'>
                                <p className="dark:text-gray-500">{post.datePosted}</p>
                                <p className="dark:text-gray-500"><LuDot /></p>
                                <p className="dark:text-gray-500"><span className="dark:text-neutral-300 font-bold">{post.metrics.views}</span> Views</p>
                            </div>
                        </div>

                        <div className='pb-2 mt-2 border-b border-gray-700'>
                            <PostMetrics comments={post?.metrics.comments} retweets={post?.metrics.retweets} likes={post?.metrics.likes} views={post?.metrics.views} showViews={false} />
                        </div>

                        <div className='flex items-start justify-between mt-6 border-b border-gray-700 pb-1'>
                            <div className="rounded-full w-10 h-10 bg-neutral-300 flex items-center justify-center cursor-pointer">
                                <img src="https://loremflickr.com/200/200?random=30" className="rounded-full w-full h-full object-contain object-center" alt="user image" />
                            </div>
                            <form>
                                <textarea name="commentForm" id="commentForm" placeholder='Post your Reply' className="placeholder-gray-500 noscrollbar px-2 overflow-auto bg-transparent text-xl w-full border-0 outline-0 resize-none dark:text-neutral-300"></textarea>
                            </form>
                            <Button className={twMerge(buttonStyles(), "text-neutral-300 font-bold")}>Reply</Button>
                        </div>

                        <div className='flex items-start justify-center gap-3 my-3 pb-3 border-b border-gray-700'>
                            <div className="rounded-full w-10 h-10 bg-neutral-300 flex items-center justify-center cursor-pointer">
                                <img src="https://loremflickr.com/200/200?random=6" className="rounded-full w-full h-full object-contain object-center" alt="user image" />
                            </div>

                            <div className="flex flex-col items-start justify-between w-[85%]">
                                <div className="relative flex items-start justify-between w-full">
                                    <div className="relative flex items-center justify-start">
                                        <div className="flex items-center justify-center cursor-pointer gap-2">
                                            <div className='flex items-center gap-1'><p className="font-bold dark:text-neutral-300">FUTURE1369</p><LuBadgeCheck className="text-primary" /></div>
                                            <p className="dark:text-gray-500 -mt-1">@iamphinehas1</p>
                                        </div>
                                    </div>
                                    <div className="justify-self-end ms-auto"><LuEllipsis className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer  dark:text-gray-500  dark:hover:text-primary")} /></div>
                                </div>
                                <p className="dark:text-neutral-300 text-l -mt-3 mb-3">{post.postContent}</p>

                                <div className='text-gray-500'>Comment metrics</div>
                            </div>
                        </div>

                        <div className='flex items-start justify-center gap-3 my-3 pb-3 border-b border-gray-700'>
                            <div className="rounded-full w-10 h-10 bg-neutral-300 flex items-center justify-center cursor-pointer">
                                <img src="https://loremflickr.com/200/200?random=6" className="rounded-full w-full h-full object-contain object-center" alt="user image" />
                            </div>

                            <div className="flex flex-col items-start justify-between w-[85%]">
                                <div className="relative flex items-start justify-between w-full">
                                    <div className="relative flex items-center justify-start">
                                        <div className="flex items-center justify-center cursor-pointer gap-2">
                                            <div className='flex items-center gap-1'><p className="font-bold dark:text-neutral-300">FUTURE1369</p><LuBadgeCheck className="text-primary" /></div>
                                            <p className="dark:text-gray-500 -mt-1">@iamphinehas1</p>
                                        </div>
                                    </div>
                                    <div className="justify-self-end ms-auto"><LuEllipsis className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer  dark:text-gray-500  dark:hover:text-primary")} /></div>
                                </div>
                                <p className="dark:text-neutral-300 text-l -mt-3 mb-3">{post.postContent}</p>

                                <div className='text-gray-500'>Comment metrics</div>
                            </div>
                        </div>

                        <div className='flex items-start justify-center gap-3 my-3 pb-3 border-b border-gray-700'>
                            <div className="rounded-full w-10 h-10 bg-neutral-300 flex items-center justify-center cursor-pointer">
                                <img src="https://loremflickr.com/200/200?random=6" className="rounded-full w-full h-full object-contain object-center" alt="user image" />
                            </div>

                            <div className="flex flex-col items-start justify-between w-[85%]">
                                <div className="relative flex items-start justify-between w-full">
                                    <div className="relative flex items-center justify-start">
                                        <div className="flex items-center justify-center cursor-pointer gap-2">
                                            <div className='flex items-center gap-1'><p className="font-bold dark:text-neutral-300">FUTURE1369</p><LuBadgeCheck className="text-primary" /></div>
                                            <p className="dark:text-gray-500 -mt-1">@iamphinehas1</p>
                                        </div>
                                    </div>
                                    <div className="justify-self-end ms-auto"><LuEllipsis className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer  dark:text-gray-500  dark:hover:text-primary")} /></div>
                                </div>
                                <p className="dark:text-neutral-300 text-l -mt-3 mb-3">{post.postContent}</p>

                                <div className='text-gray-500'>Comment metrics</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        modalRoot
    );
}

export default PostModal
