import { LuMoreHorizontal } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../UI/Button";

type TrendProps = {
    location: string;
    title: string;
    postCount: string;
}

const Trend = ({location, title, postCount} : TrendProps) => {
  
    return (
        <div className="p-3 flex items-start justify-between w-full gap-3 hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer">
          <div>
            <p className="dark:text-neutral-300 text-xs">{location}</p>
            <p className="dark:text-neutral-300 text-sm font-bold uppercase">{title}</p>
            <p className="dark:text-neutral-300 text-xs"><span>{postCount}</span> posts</p>
          </div>
          <div><LuMoreHorizontal className={twMerge(buttonStyles({ variant: "blueghost", size: "icon"}), "cursor-pointer  dark:text-gray-500  dark:hover:text-primary")} /></div>
        </div>
    )
}

export default Trend