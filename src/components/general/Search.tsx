import { LuBadgeCheck, LuSearch, LuCircleX } from 'react-icons/lu'
import { twMerge } from 'tailwind-merge'
import { buttonStyles } from '../UI/Button'
import { useEffect, useState } from 'react';
//import invertedIndexData from "../../data/invertedIndex.json"
//import posts from "../../data/posts.json"
//import users from "../../data/users.json"
import { Posts, ProfileData } from '../../types';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
    updateIsFocused?: (newState: boolean) => void;
}

const Search = ({ updateIsFocused }: Props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [searchResults, setSearchResults] = useState<Posts[]>();
    const [searchQuery, setsearchQuery] = useState("");
    const [userMatches, setUserMatches] = useState<ProfileData[]>();

    // interface InvertedIndex {
    //     posts: {
    //         [key: string]: number[];  
    //     };
    //     users: {
    //         [key: string]: number[];
    //     };
    // }

    //const invertedIndex: InvertedIndex = invertedIndexData;

    const navigate = useNavigate();

    const handleFocus = () => {
        setIsFocused(prev => {
            const newState = !prev;
            if (updateIsFocused) {
                updateIsFocused(newState);
            }
            return newState;
        });
    };

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const val = evt.target?.value;
        setsearchQuery(val);

        //const query = searchQuery.toLowerCase();
        const userMatches: ProfileData[] = [];

        // Object.keys(invertedIndex.users).forEach(word => {
        //     if (word.includes(query)) {
        //         invertedIndex.users[word].forEach((userId: number) => {
        //             const user = users.find(usr => usr.id === userId);
        //             if (user && !userMatches.some(usr => Number(usr.id) === userId)) {
        //                 userMatches.push(user);
        //             }
        //         });
        //     }
        // });

        // Log or handle user matches if needed (e.g., for showing user-related results)
        console.log("Matched Users", userMatches);
        setUserMatches(userMatches);
    };

    // Updated search function
    // const searchInInvertedIndex = (searchQuery: string, invertedIndex: InvertedIndex, posts: Posts[]) => {
    //     const results: Posts[] = [];
    //     const query = searchQuery.toLowerCase();
    //     console.log({"Search Query": searchQuery, "Inverted Index": invertedIndex, "All Posts": posts})

    //     Object.keys(invertedIndex.posts).forEach(word => {
    //         if (word.includes(query)) {
    //             console.log(invertedIndex.posts[word]);
                
    //             invertedIndex.posts[word].forEach((postId: number) => {
    //                 const post = posts.find(post => post.postId === postId);
    //                 console.log(post);
    //                 if (post && !results.some(result => result.postId === postId)) {
    //                     results.push(post);
    //                 }
    //             });
    //         }
    //     });

    //     console.log({"Results": results});
    //     setSearchResults(results);
    //     console.log({"Search Results": searchResults});
    // };



    const clearSearch = (evt: React.MouseEvent) => {
        evt.preventDefault();
        evt.stopPropagation();
        setsearchQuery("");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.length === 0) {
            setSearchResults([]);
            return;
        }
        //searchInInvertedIndex(searchQuery, invertedIndex, posts);
    }

    useEffect(() => {
        if (searchResults && searchResults.length > 0) {
          console.log("Search Results", searchResults);
          navigate(`/search?q=${searchQuery}&src=typed_query`, { state: { searchResults } });
        }
    }, [searchResults]);

    return (
        <>
            <form className={`flex relative items-center rounded-full w-full justify-start px-2 mt-1 bg-dark-border py-1 bg-opacity-70 ${isFocused ? 'border border-primary' : ''} `} onFocus={handleFocus} onBlur={handleFocus} onSubmit={handleSubmit}>
                <LuSearch className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), `w-4 h-4 p-0 md:w-9 md:h-9 md:p-2.5 text-xl hover:bg-transparent ${isFocused ? 'text-primary' : 'dark:text-white'}`)} />
                <input
                    className="w-5/6 bg-transparent px-2 h-5 sm:h-auto md:py-1 border-0 outline-0 text-base dark:text-white"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleChange}
                />
                {searchQuery && (<div className="absolute top-3 right-10 z-30" onMouseDown={(event) => event.preventDefault()} onClick={clearSearch}><LuCircleX className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), 'cursor-pointer w-5 h-5 p-0 dark:text-white')} /></div>)}
            </form>

            {searchQuery && (
                <div className="hidden md:flex w-full flex-col items-start justify-between gap-3 absolute top-10 px-4 py-3 z-50 rounded-lg shadow-lg mt-3 bg-black">
                    {
                        userMatches?.map((user) => {
                            const { username, user: usr, avatar, is_verified } = user;
                            const isLarge = false;

                            return (
                                <div key={username} className="flex items-start justify-start gap-2 w-[90%]hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer">
                                    <Link to={`/${username}`} className="min-w-[8%]">
                                        <div>
                                            <img
                                                src={avatar}
                                                alt={`${usr}'s profile picture`}
                                                className="w-10 h-10 rounded-full"
                                            />
                                        </div>
                                    </Link>
                                    <Link to={`/${username}`} className="flex-1">
                                        <div className="group relative w-max">
                                            <div className="flex items-center gap-1">
                                                <p
                                                    className={`dark:text-white ${isLarge ? 'text-[0.9rem]' : 'text-[0.8rem]'} font-bold`}
                                                >
                                                    {usr.username}
                                                </p>
                                                {is_verified && <LuBadgeCheck className="text-secondary" />}
                                            </div>
                                            <p
                                                className={`dark:text-white ${isLarge ? 'text-[0.9rem]' : 'text-[0.9rem]'}`}
                                            >
                                                @{username}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })
                    }

                </div>
            )}

            {isFocused && (
                <div className="md:hidden w-full h-screen overflow-hidden flex flex-col fixed inset-0 top-14 px-2 py-3 z-50 bg-black">
                    <p className='dark:text-gray-400 self-center text-sm'>Try Searching for lists, people or keywords</p>
                </div>
            )}
        </>

    )
}

export default Search