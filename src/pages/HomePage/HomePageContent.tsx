import { useEffect, useState } from "react";
import { ForYou } from "../../features/feed";
import { Following } from "../../features/feed";
import { useAuthContext } from "../../context/auth-context";
import { UserProps } from "../../types";
import users from "../../data/users.json"
import { CreatePost } from "../../features/post";
import Button, { buttonStyles } from "../../components/UI/Button";
import { twMerge } from "tailwind-merge";
import { LuMenu } from "react-icons/lu";

const HomePageContent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = useAuthContext();

  const [appUser, setAppUser] = useState<UserProps | null>(null);

  if (!user) return null;

  useEffect(() => {
    const foundUser = users.find(usr => usr.id === Number(user.id));
    if (!foundUser) {
      return
    }
    setAppUser(foundUser);
  }, [user])

  const labels = ["For You", "Following"];

  return (
    <div className="border-r border-dark-border">
      <div className="sticky top-0">
        <div className="sm:hidden flex items-center pt-3 mb-4 justify-between px-4">
          <Button className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "p-0 bg-transparent hover:bg-transparent w-9 h-9")}>
            <img src={appUser?.image} alt={`${appUser?.displayname} profile picture`} className="rounded-full w-full h-full" />
          </Button>
          
          <Button className={twMerge(buttonStyles({ variant: "ghost", size: "navicon" }), "bg-transparent ps-12 py-3")}><LuMenu /></Button>

          <Button className={twMerge(buttonStyles(), "text-sm font-bold px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500")}>
            Upgrade
          </Button>
        </div>
        <div className="flex border-b bg-white dark:bg-black z-20 items-center justify-between border-dark-border">
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

      <div className="hidden post sm:flex self-start w-full px-3 py-5 gap-2 border-b border-dark-border ">
        <div className="rounded-full w-10 h-10 bg-neutral-300 flex items-center justify-center cursor-pointer w-30">
          <img src={appUser?.image} className="rounded-full w-full h-full object-contain object-center" alt={`${appUser?.displayname} profile image`} />
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
    </div>
  );
}

export default HomePageContent
