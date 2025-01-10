import { useEffect, useState } from 'react'
import users from "../../data/users.json"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { LuArrowLeft, LuBadgeCheck, LuCalendarDays, LuMail, LuMoreHorizontal } from 'react-icons/lu';
import Button, { buttonStyles } from '../../components/UI/Button';
import { formatCount } from '../../utils/formatCount';
import { twMerge } from 'tailwind-merge';
import { PostProps, UserProps } from '../../types';
import formatDate from '../../utils/formatDate';
import { useAuthContext } from '../../context/auth-context';
import {AccountPosts} from '../../features/profile/index';
import {AccountMedia} from '../../features/profile/index';
import postsData from "../../data/posts.json"
import { useUserByUsername } from '../../hooks/useUser';
// import { usePostsByUsername } from '../../hooks/useUserPosts';

const ProfilePageContent = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { username } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    if (!username) return null;

    useEffect(() => {
        setActiveIndex(0);
    }, [username]);

    // Fetch user details
    const { data: user, isLoading: userLoading, error: userError } = useUserByUsername(username!);

    // Fetch posts
    // const { data: posts, isLoading: postsLoading, error: postsError } = usePostsByUsername(username!);

    console.log({user})
    console.log({userLoading})
    if (userLoading) return <p>Loading...</p>;
    if (userError) return <p>Error fetching user: {userError.message}</p>;
    // if (postsError) return <p>Error fetching posts: {postsError.message}</p>;

    const isLoggedInUser = user?.username.toLowerCase() === username.toLowerCase()

    const labels = isLoggedInUser ? ["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"] : ["Posts", "Replies", "Media"];

    const from = location.state?.from?.pathname || "/home";

    const handleBackClick = () => {
        navigate(from, { replace: true })
    }

    return (
        <>
            <div className="sticky top-0 z-10 dark:bg-black dark:bg-opacity-90 flex items-center gap-3 p-1">
                <div className="flex items-center justify-center" onClick={handleBackClick}>
                    <Button className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), 'cursor-pointer w-10 h-10 text-white bg-transparent')}><LuArrowLeft className='text-xl' /></Button>
                </div>
                <div className='flex flex-col items-start justify-start'>
                    <div className='flex items-center gap-2'>
                        <h1 className="dark:text-white text-base sm:text-lg font-bold">{user?.displayname}</h1>
                        {user?.is_verified && <LuBadgeCheck className="text-primary" />}
                    </div>
                    <p className="dark:text-dark-text text-sm sm:text-base">1,500 likes</p>
                </div>
            </div>

            <div className='relative'>
                <div className="h-28 sm:h-36 smd:h-44 mlg:h-48 cursor-pointer">
                    <Link to="header_photo" state={{ coverPhoto: user?.cover_image, previousLocation: location.pathname  }}>
                        <img src={user?.cover_image} className="w-full h-full object-cover object-center" alt="user's cover photo" />
                    </Link>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='w-20 h-20 sm:w-28 sm:h-28 smd:w-32 smd:h-32 mlg:w-36 mlg:h-36 absolute left-5 top-[4.5rem] sm:top-[5rem] smd:top-[6.5rem] mlg:top-[7rem] cursor-pointer'>
                        <Link to="photo" state={{ profilePhoto: user?.avatar, previousLocation: location.pathname }}>
                        <img src={user?.avatar} alt={`${user?.username} profile picture`} className='border-2 smd:border-4 border-black rounded-full w-full h-full' />
                        </Link>
                    </div>
                    <div className='mt-3 me-4 ms-auto'>
                        {isLoggedInUser ?
                            <Button className={twMerge(buttonStyles(), 'cursor-pointer bg-transparent dark:text-white border dark:hover:border-neutral-300 hover:bg-gray-400 hover:bg-opacity-20 font-bold text-sm')}>
                                <Link to="profile" state={{ user: user, previousLocation: location.pathname}}>Edit profile</Link>
                            </Button>
                            :
                            <div className='flex items-center gap-2'>
                                <div className='border rounded-full border-dark-border'>
                                    <Button className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), 'cursor-pointer w-10 h-10 text-white bg-transparent')}><LuMoreHorizontal className='text-xl' /></Button>
                                </div>
                                <div className='border rounded-full border-dark-border'>
                                    <Button className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), 'cursor-pointer w-10 h-10 text-white bg-transparent')}><LuMail className='text-xl' /></Button>
                                </div>
                                <Button className={twMerge(buttonStyles(), 'cursor-pointer dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-bold')}>Follow</Button>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className='mt-2 smd:mt-4 mlg:mt-8 px-4'>
                <div className='flex items-center gap-2'>
                    <p className='dark:text-white font-bold text-lg'>{user?.username}</p>
                    {user?.is_verified ?
                        <LuBadgeCheck className="text-primary" /> :
                        <Button className='flex items-center gap-1 bg-transparent text-xs hover:bg-tranparent border border-secondary px-2 py-1'>
                            <LuBadgeCheck className="text-primary" />
                            Get Verified
                        </Button>}
                </div>
                <p className="dark:text-dark-text text-sm md:text-base -mt-1">@{user?.profile_username}</p>
                <div className="text-sm md:text-base dark:text-white mt-4">{user?.bio}</div>

                <div className='mt-3 flex items-center gap-1'>
                    <LuCalendarDays className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), 'cursor-pointer w-4 h-4 rounded-none dark:text-dark-text bg-transparent p-0')} />
                    <p className='dark:text-dark-text text-sm md:text-base'>Joined {formatDate(user?.createdAt)}</p>
                </div>

                <div className='flex items-center gap-2 mt-3'>
                    <p className='dark:text-dark-text text-sm'><span className='dark:text-white font-semibold'>{formatCount(user?.followingCount || 0) }</span> Following</p>
                    <p className='dark:text-dark-text text-sm'><span className='dark:text-white font-semibold'>{formatCount(user?.followerCount|| 0)}</span> {user?.followerCount || 0 > 1 ? 'Followers' : 'Follower'}</p>
                </div>
            </div>

            <div className="flex mt-6 border-b border-dark-border overflow-x-auto md:overflow-visible no-scrollbar">
                {labels.map((label, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`flex-1 flex items-center justify-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-20`}
                    >
                        <p className={`dark:text-dark-text text-opacity-20 px-4 py-3 ${activeIndex === index ? 'border-b-4 border-blue-500 dark:text-white' : ''}`}>{label}</p>
                    </button>
                ))}
            </div>

            {/* <section className="w-full mb-4">
                <div>
                    {activeIndex === 0 && posts && <AccountPosts posts={posts} />}
                    {(isLoggedInUser && activeIndex === 4 || !isLoggedInUser && activeIndex === 2) && posts && (
                        <div className="flex flex-wrap">
                            {posts.map((post, postIndex) => {
                                console.log("got here");
                                const imageIndex = post.images.indexOf(post?.images[0]);

                                return (
                                    <div className="w-max" key={postIndex}>
                                        <Link to={`/post/${post.postId}/photo/${imageIndex}`} state={{ previousLocation: location.pathname}} >
                                            <AccountMedia images={post.images} />
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                </div>
            </section> */}
        </>
    )
}

export default ProfilePageContent