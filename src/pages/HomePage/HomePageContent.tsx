import { useState } from "react";
import { ForYou } from "../../features/feed";
import { Following } from "../../features/feed";
import { useAuthContext } from "../../context/auth-context";
import { CreatePost } from "../../features/post";
import Button, { buttonStyles } from "../../components/UI/Button";
import { twMerge } from "tailwind-merge";
import twitter from "../../assets/white-twitter.png"
import { LuLeaf } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { useMobileSidebar } from "../../hooks/useMobileSideBar";
import MobileSidebar from "../../components/general/MobileSidebar";

const HomePageContent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { userProfile } = useAuthContext();
  const { isProfileSidebarOpen, toggleProfileSidebar } = useMobileSidebar();
  const location = useLocation();

  if (!userProfile) return null;

  const labels = ["For You", "Following"];

  return (
    <>
      <div className="sm:sticky top-0 z-[9999]">
        
        <div className="sm:hidden flex items-center justify-between mt-2 mb-3 px-4">
          <Button onClick={toggleProfileSidebar} className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), " p-0 bg-transparent hover:bg-transparent w-9 h-9")}>
            <img src={userProfile?.image} alt={`${userProfile?.name} profile picture`} className="rounded-full w-full h-full" />
          </Button>

          <Button className={twMerge(buttonStyles(), "bg-transparent w-7 h-7 p-0 ms-3")}>
            <img src={twitter} alt="twitter" className="w-full h-full object-contain object-center" />
          </Button>

          <Button className={twMerge(buttonStyles(), "text-sm font-bold px-1 py-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500")}>
            Upgrade
          </Button>
        </div>

        <div className="flex border-b bg-white bg-opacity-70 dark:bg-black z-20 items-center justify-between border-dark-border">
          {labels.map((label, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-[50%] flex items-center justify-center cursor-pointer hover:bg-gray-500 hover:bg-opacity-20`}
            >
              <p className={`dark:text-gray-500 text-opacity-20 py-3 ${activeIndex === index ? 'border-b-4 border-secondary dark:text-neutral-300' : ''}`}>{label}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="hidden post sm:flex self-start w-full px-4 py-5 gap-2 border-b border-dark-border ">
        <div className="rounded-full w-10 h-10 bg-neutral-300 flex items-center justify-center cursor-pointer w-30">
          <img src={userProfile?.image} className="rounded-full w-full h-full" alt={`${userProfile?.name} profile image`} />
        </div>
        <CreatePost />
      </div>

      <div className="border-b border-dark-border flex items-center justify-center h-14 cursor-pointer hover:bg-gray-500 hover:bg-opacity-10">
        <p className="text-primary">Show <span className="post-counter">490</span> posts</p>
      </div>

      <section className="posts">
        <div>
          {activeIndex === 0 && <ForYou />}
          {activeIndex === 1 && <Following />}
        </div>
      </section>

      <div className="sm:hidden rounded-full w-14 h-14 fixed bottom-20 right-5 z-10 bg-secondary flex shadow-sm shadow-white items-center justify-center">
        <Link to="/compose/post" state={{ previousLocation: location.pathname }}>
          <LuLeaf className="text-2xl text-white" />
        </Link>
      </div>

      <MobileSidebar isOpen={isProfileSidebarOpen} onClose={toggleProfileSidebar} />
    </>
  );
}

export default HomePageContent
