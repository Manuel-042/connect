import { useEffect, useState } from 'react'
import users from "../../data/users.json"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { LuArrowLeft, LuBadgeCheck, LuCalendarDays, LuMoreHorizontal } from 'react-icons/lu';
import Button, { buttonStyles } from '../../components/UI/Button';
import { formatCount } from '../../utils/formatCount';
import { twMerge } from 'tailwind-merge';
import { PostProps, UserProps } from '../../types';
import formatDate from '../../utils/formatDate';
import { useAuthContext } from '../../context/auth-context';
import {AccountPosts} from '../../features/profile/index';
import {AccountMedia} from '../../features/profile/index';
import postsData from "../../data/posts.json"

const ProfilePageContent = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { username } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuthContext();

    const [appUser, setAppUser] = useState<UserProps | null>(null);
    const [posts, setPosts] = useState<PostProps[] | null>(null);

    useEffect(() => {
        setActiveIndex(0);
    }, [username]);

    useEffect(() => {
        if (username) {
            const foundUser = users.find(usr => usr.username === username);

            if (foundUser) {
                setAppUser(foundUser);

                const account_posts = postsData.posts.filter(post => post.userId === foundUser.id);
                setPosts(account_posts.length > 0 ? account_posts : null);
            } else {
                console.error("User profile not found in users.json");
                setAppUser(null);
                setPosts(null);
            }
        }
    }, [username, users, postsData.posts]);

    if (!username || !appUser) return null;

    const isLoggedInUser = user?.username === appUser?.username

    const labels = isLoggedInUser ? ["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"] : ["Posts", "Replies", "Media"];

    const from = location.state?.from?.pathname || "/";

    const handleBackClick = () => {
        navigate(from, { replace: true })
    }

    return (
        <div className='w-[60%] me-8 border-r border-gray-700'>
            <div className="sticky top-0 z-10 dark:bg-black bg-opacity-20 flex items-center gap-3 p-1">
                <div className="flex items-center justify-center" onClick={handleBackClick}>
                    <Button className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), 'cursor-pointer w-10 h-10 text-neutral-200 bg-transparent')}><LuArrowLeft className='text-xl' /></Button>
                </div>
                <div className='flex flex-col items-start justify-start'>
                    <div className='flex items-center gap-2'>
                        <h1 className="dark:text-neutral-300 text-lg font-bold">{appUser?.displayname}</h1>
                        {appUser?.isVerified && <LuBadgeCheck className="text-primary" />}
                    </div>
                    <p className="dark:text-gray-500 text-base -mt-1">1,500 likes</p>
                </div>
            </div>

            <div className='relative'>
                <div className="h-52 cursor-pointer">
                    <Link to="header_photo" state={{ coverPhoto: appUser?.coverPhoto, previousLocation: location.pathname  }}>
                        <img src={appUser?.coverPhoto} className="w-full h-full object-cover object-center" alt="user's cover photo" />
                    </Link>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='w-40 h-40 absolute left-5 top-32 cursor-pointer'>
                        <Link to="photo" state={{ profilePhoto: appUser?.image, previousLocation: location.pathname }}>
                        <img src={appUser?.image} alt={`${appUser?.displayname} profile picture`} className='border-4 border-black rounded-full w-full h-full' />
                        </Link>
                    </div>
                    <div className='mt-3 me-4 ms-auto'>
                        {isLoggedInUser ?
                            <Button className={twMerge(buttonStyles(), 'cursor-pointer bg-transparent dark:text-neutral-300 border dark:hover:border-neutral-300 hover:bg-gray-400 hover:bg-opacity-20 font-bold text-sm')}>
                                <Link to="profile" state={{ user: appUser }}>Edit profile</Link>
                            </Button>
                            :
                            <div className='flex items-center gap-2'>
                                <div className='border rounded-full border-gray-700'>
                                    <Button className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), 'cursor-pointer w-10 h-10 text-neutral-200 bg-transparent')}><LuMoreHorizontal className='text-xl' /></Button>
                                </div>
                                <Button className={twMerge(buttonStyles(), 'cursor-pointer dark:bg-neutral-300 dark:text-black dark:hover:bg-neutral-400 font-bold')}>Follow</Button>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className='mt-11 px-4'>
                <div className='flex items-center gap-2'>
                    <p className='dark:text-neutral-300 font-bold text-xl'>{appUser?.displayname}</p>
                    {appUser?.isVerified ?
                        <LuBadgeCheck className="text-primary" /> :
                        <Button className='flex items-center gap-1 bg-transparent text-xs hover:bg-tranparent border border-secondary px-2 py-1'>
                            <LuBadgeCheck className="text-primary" />
                            Get Verified
                        </Button>}
                </div>
                <p className="dark:text-gray-500 text-base">@{appUser?.username}</p>
                <div className="text-base dark:text-neutral-300 mt-4">{appUser?.bio}</div>

                <div className='mt-3 flex items-center gap-1'>
                    <LuCalendarDays className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), 'cursor-pointer w-4 h-4 rounded-none dark:text-gray-500 bg-transparent p-0')} />
                    <p className='dark:text-gray-500'>Joined {formatDate(appUser?.createdAt)}</p>
                </div>

                <div className='flex items-center gap-2 mt-3'>
                    <p className='dark:text-gray-500'><span className='dark:text-neutral-300 font-semibold'>{formatCount(appUser?.followingCount)}</span> Following</p>
                    <p className='dark:text-gray-500'><span className='dark:text-neutral-300 font-semibold'>{formatCount(appUser?.followerCount)}</span> {appUser?.followerCount > 1 ? 'Followers' : 'Follower'}</p>
                </div>
            </div>

            <div className="flex mt-6 border-b border-gray-700">
                {labels.map((label, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`${isLoggedInUser ? 'w-[20%]' : 'w-[33.33%]'} flex items-center justify-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-20`}
                    >
                        <p className={`dark:text-gray-500 text-opacity-20 py-3 ${activeIndex === index ? 'border-b-4 border-blue-500 dark:text-neutral-300' : ''}`}>{label}</p>
                    </button>
                ))}
            </div>

            <section className="w-full mb-4">
                <div>
                    {activeIndex === 0 && posts && <AccountPosts posts={posts} />}
                    {(isLoggedInUser && activeIndex === 4 || !isLoggedInUser && activeIndex === 2) && posts && (
                        <div className="flex flex-wrap">
                            {posts.map((post, postIndex) => {
                                console.log("got here");
                                const imageIndex = post.images.indexOf(post?.images[0]);

                                return (
                                    <div className="w-max" key={postIndex}>
                                        <Link to={`/post/${post.postId}/photo/${imageIndex}`}>
                                            <AccountMedia images={post.images} />
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                </div>
            </section>
        </div>
    )
}

export default ProfilePageContent