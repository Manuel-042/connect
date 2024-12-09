import { LuMoreHorizontal } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../../../components/UI/Button";
import { useNavigate } from "react-router-dom";
import posts from "../../../data/posts.json"

type TrendProps = {
    location: string;
    title: string;
    postCount: string;
    variant?: "default" | "large"; 
}



const Trend = ({location, title, postCount, variant = "default"} : TrendProps) => {
    const isLarge = variant === "large";
    const navigate = useNavigate();

    const handleClick = () => {
      const searchResults = posts.posts;
      navigate(`/search?q=${title}&src=trend_click`, { state: { searchResults } })
    }
  
    return (
        <div className="px-4 py-3 flex items-start justify-between w-full gap-3 hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer" onClick={handleClick}>
          <div>
            <p className={`dark:text-gray-500 text-opacity-20 ${isLarge ? 'text-[0.9rem]' : 'text-[0.8rem]'}`}>{location}</p>
            <p className={`dark:text-neutral-300 ${isLarge ? "text-lg" : "text-[0.9rem]"} font-bold`}>{title}</p>
            <p className={`dark:text-gray-500  text-opacity-20 ${isLarge ? "text-[0.9rem]" : "text-[0.8rem]"}`}><span>{postCount}</span> posts</p>
          </div>
          <div><LuMoreHorizontal className={twMerge(buttonStyles({ variant: "blueghost", size: "icon"}), "cursor-pointer  dark:text-gray-500  dark:hover:text-primary")} /></div>
        </div>
    )
}

export default Trend