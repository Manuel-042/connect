import ReactDOM from 'react-dom';
import { useParams, useNavigate } from 'react-router-dom';
import postData from "../../data/posts.json"
import { useEffect, useState } from 'react';
import { PostProps } from '../../types';
import PostMetrics from './PostMetrics';
import { LuX, LuMoreHorizontal, LuBadgeCheck, LuDot } from "react-icons/lu";
import Button, { buttonStyles } from '../UI/Button';
import { twMerge } from 'tailwind-merge';
import EmblaCarousel from '../UI/Carousel';

const PostModal = () => {
    const modalRoot = document.getElementById('modal-root');
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<PostProps | null>(null)


    console.log({ postData, postId });

    useEffect(() => {
        const foundPost = postData?.posts?.find((p: { postId: number }) => p.postId === Number(postId));

        console.log({ foundPost })

        if (foundPost) {
            setPost(foundPost);
        }
    }, [postData, postId]);

    console.log({ post });

    if (!modalRoot || !post) {
        return null;
    }

    const handleCloseModal = () => {
        navigate("/");
    };

    console.log(post?.images)

    return ReactDOM.createPortal(
        <div className="modal flex items-start justify-between pb-3">
            <div className="m-auto flex flex-col items-center justify-center h-full border-r border-gray-700 w-[70%] sticky top-0 left-0 bottom-0">
                <Button onClick={handleCloseModal} className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "z-10 absolute top-4 left-6 bg-transparent text-neutral-300")}><LuX className='w-48 h-48' /></Button>
                {/* <img src={post?.images[clickedImageIndex]} alt="image" className="w-[70%] h-[90%]" /> */}
                <EmblaCarousel images={post.images} />

                <div className='justify-self-end mt-auto w-[70%]'>
                    <PostMetrics comments={post?.metrics.comments} retweets={post?.metrics.retweets} likes={post?.metrics.likes} views={post?.metrics.views} />
                </div>
            </div>

            <div className='w-[30%] py-5 px-3'>
                <div className='pb-5 border-b border-gray-700'>
                    <div className='flex items-start justify-start gap-2'>
                        <div className="rounded-full w-10 h-10 bg-neutral-300 flex items-center justify-center cursor-pointer">
                            <img src="https://loremflickr.com/200/200?random=4" className="rounded-full w-full h-full object-contain object-center" alt="user image" />
                        </div>
                        <div className="flex items-center justify-between mb-4 w-[85%]">
                            <div className="relative">
                                <div className="relative flex items-center justify-start">
                                    <div className="flex flex-col items-center justify-center cursor-pointer gap-0">
                                        <div className='flex items-center gap-1'><p className="font-bold dark:text-neutral-300">FUTURE1369</p><LuBadgeCheck className="text-primary" /></div>
                                        <p className="dark:text-gray-500 opacity-40 -mt-1">@iamphinehas1</p>
                                    </div>
                                </div>
                            </div>
                            <div className="justify-self-end ms-auto"><LuMoreHorizontal className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer  dark:text-gray-500  dark:hover:text-primary")} /></div>
                        </div>
                    </div>

                    <div className='mb-3'>
                        <p className="dark:text-neutral-300 text-xl">{post.postContent}</p>
                    </div>

                    <div className='flex items-center justify-start gap-5'>
                        <p className="dark:text-gray-500 opacity-50">{post.datePosted}</p>
                        <p className="dark:text-gray-500 opacity-50"><LuDot /></p>
                        <p className="dark:text-gray-700"><span className="dark:text-neutral-300 font-bold">{post.metrics.views}</span> Views</p>
                    </div>
                </div>

                <div className='pb-2 mb-2 border-b border-gray-700'>
                    <PostMetrics comments={post?.metrics.comments} retweets={post?.metrics.retweets} likes={post?.metrics.likes} views={post?.metrics.views} />
                </div>

                <div className='flex items-start justify-between mt-6 border-b border-gray-700 pb-1'>
                    <div className="rounded-full w-10 h-10 bg-neutral-300 flex items-center justify-center cursor-pointer">
                        <img src="https://loremflickr.com/200/200?random=4" className="rounded-full w-full h-full object-contain object-center" alt="user image" />
                    </div>
                    <form>
                        <textarea name="commentForm" id="commentForm" placeholder='Post your Reply' className="noscrollbar px-2 overflow-auto bg-transparent text-xl w-full border-0 outline-0 resize-none dark:text-neutral-300"></textarea>
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
                                    <p className="dark:text-gray-500 opacity-40 -mt-1">@iamphinehas1</p>
                                </div>
                            </div>
                            <div className="justify-self-end ms-auto"><LuMoreHorizontal className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer  dark:text-gray-500  dark:hover:text-primary")} /></div>
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
                                    <p className="dark:text-gray-500 opacity-40 -mt-1">@iamphinehas1</p>
                                </div>
                            </div>
                            <div className="justify-self-end ms-auto"><LuMoreHorizontal className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer  dark:text-gray-500  dark:hover:text-primary")} /></div>
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
                                    <p className="dark:text-gray-500 opacity-40 -mt-1">@iamphinehas1</p>
                                </div>
                            </div>
                            <div className="justify-self-end ms-auto"><LuMoreHorizontal className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer  dark:text-gray-500  dark:hover:text-primary")} /></div>
                        </div>
                        <p className="dark:text-neutral-300 text-l -mt-3 mb-3">{post.postContent}</p>

                        <div className='text-gray-500'>Comment metrics</div>
                    </div>
                </div>




            </div>
        </div>,
        modalRoot
    );
}

export default PostModal
