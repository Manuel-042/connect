import { LuFiles } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';
import { buttonStyles } from '../../../components/UI/Button';
import { PostProps } from '../../../types';

type Props = {
    posts: PostProps[] | []
    query: string;
}

const MediaTab = ({ query, posts }: Props) => {

    if (!query) return null;

    const filteredPosts = posts.filter(post => post.postContent.toLowerCase().includes(query.toLowerCase()))

    //const navigate = useNavigate();
    //const location = useLocation();

    //const [user, setUser] = useState<UserProps | null>(null);

    // useEffect(() => {
    //     const foundUser = users.find(user => user.id === Number(userId));
    //     if (!foundUser) {
    //         return
    //     }
    //     setUser(foundUser);
    // }, [userId, users]);

    // if (!user) return null;

    // const handleShowPost = (postId: number) => {
    //     navigate(`/post/${postId}/photo/0`, { state: { previousLocation: location.pathname, userData:  }})
    // }

    return (
        <div className="p-1 flex gap-1">
            {filteredPosts.map((post) => {
                const count = post.images.length;
                return (
                    <div key={post.postId} className="relative w-max"> 
                        <img
                            src={post.images[0]}
                            alt={`image`}
                            className="object-cover w-44 cursor-pointer h-44"
                        />
                        {count > 1 && (
                            <div className="absolute right-1 bottom-0">
                                <LuFiles className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "w-11 h-11 cursor-pointer dark:hover:bg-transparent")} />
                            </div>
                        )}
                    </div>
                );
            })}


        </div>
    )
}

export default MediaTab