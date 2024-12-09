import { ElementType, useEffect, useState } from "react";
import { LuMenu, LuSearch, LuBell, LuMail, LuUserPlus2, LuLeaf, LuHome, LuCircleEllipsis, LuMoreHorizontal } from "react-icons/lu";
import Button, { buttonStyles } from "../UI/Button";
import { twMerge } from "tailwind-merge";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth-context";
import users from "../../data/users.json"
import { UserProps } from "../../types";
import MoreDisplay from "./MoreDisplay";



export default function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = useAuthContext();
  const [isMoreDisplayOpen, setIsMoreDisplayOpen] = useState(false);
    
  const toggleMoreDisplayOpen = () => {
    setIsMoreDisplayOpen(prev => !prev);
  };

  const [appUser, setAppUser] = useState<UserProps | null>(null);

  if (!user) return null;

  useEffect(() => {
    const foundUser = users.find(usr => usr.id === Number(user.id));
    if (!foundUser) {
      return
    }
    setAppUser(foundUser);
  }, [user]);

  const sidebarItems = [
    { Icon: LuHome, url: "/", title: "Home" },
    { Icon: LuSearch, url: "/explore", title: "Explore" },
    { Icon: LuBell, url: "/notifications", title: "Notifications" },
    { Icon: LuMail, url: "/messages", title: "Messages" },
    { Icon: LuUserPlus2, url: `/${user?.username}`, title: "Profile" },
  ];

  const sidebarItemsMobile = [
    { Icon: LuHome, url: "/" },
    { Icon: LuSearch, url: "/explore" },
    { Icon: LuBell, url: "/notifications" },
    { Icon: LuMail, url: "/messages" },
  ];

  useEffect(() => {
    const index = sidebarItems.findIndex(item => location.pathname === item.url);
    setActiveIndex(index !== -1 ? index : 0);
  }, [location]);

  const handleClick = () => {
    navigate('/compose/post', {
      state: { previousLocation: location.pathname }
    });
  }

  return (
    <>
      <aside className={`xl:w-[25%] hidden sm:flex max-h-screen border-r border-dark-border sticky left-0 top-0 flex-col pt-4 px-2 smd:px-4 pb-6 items-center xl:items-start transition-all duration-300 ease-in-out gap-1`}>
        <Button className={twMerge(buttonStyles({ variant: "ghost", size: "navicon" }), "hidden sm:block bg-transparent p-3")}><LuMenu /></Button>

        <div className="flex flex-col gap-3 w-full">
          {sidebarItems.map((item, index) => (
            <SmallSidebarItem
              key={index}
              Icon={item.Icon}
              url={item.url}
              title={item.title}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}

          <Button onClick={toggleMoreDisplayOpen} className={twMerge(buttonStyles({ variant: "ghost" }), "xl:hidden flex bg-transparent hover:bg-transparent items-center p-3 gap-3")}>
            <LuCircleEllipsis className="w-6 h-6" />
          </Button>

          <div className="hidden xl:flex items-center gap-3 w-full">
            <Button  onClick={toggleMoreDisplayOpen} className={twMerge(buttonStyles({ variant: "ghost" }), "flex bg-transparent hover:bg-transparent items-center p-3 gap-3")}>
              <LuCircleEllipsis className="w-6 h-6" />
            </Button>
            <p className="hidden xl:block text-xl dark:text-white">More</p>
          </div>

          <Button onClick={handleClick} className={twMerge(buttonStyles({ variant: "ghost" }), "flex xl:hidden bg-secondary hover:bg-transparent items-center p-3 gap-3")}>
            <LuLeaf className="w-6 h-6" />
          </Button>

          <Button className={twMerge(buttonStyles({ variant: "ghost" }), "hidden xl:flex bg-secondary hover:bg-transparent items-center justify-center font-bold text-base p-3 gap-3")}>
            Post
          </Button>
        </div>

        <Button className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "p-0 xl:hidden bg-transparent hover:bg-transparent mt-auto w-10 h-10")}>
          <img src={appUser?.image} alt={`${appUser?.displayname} profile picture`} className="rounded-full w-full h-full" />
        </Button>

        <div className="hidden xl:flex mt-auto items-center gap-3 w-full">
          <Button className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "p-0 bg-transparent hover:bg-transparent w-10 h-10")}>
            <img src={appUser?.image} alt={`${appUser?.displayname} profile picture`} className="rounded-full w-full h-full" />
          </Button>
          <div>
            <p className="font-bold dark:text-white">{appUser?.displayname}</p>
            <p className="-mt-1 dark:text-gray-400">@{appUser?.username}</p>
          </div>
          <div className="justify-self-end ms-auto">
            <LuMoreHorizontal className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer p-1 w-7 h-7 dark:text-gray-500  dark:hover:text-primary")} />
          </div>
        </div>
      </aside>

      <aside className="sm:hidden flex z-50 w-screen bg-black fixed bottom-0 left-0 right-0 max-h-12 border-t border-dark-border items-center overflow-hidden gap-1">
        <div className="flex w-full justify-between">
          {sidebarItemsMobile.map((item, index) => (
            <SmallSidebarItemMobile
              key={index}
              Icon={item.Icon}
              url={item.url}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </aside>

      <MoreDisplay isOpen={isMoreDisplayOpen} toggleMoreDisplayOpen={toggleMoreDisplayOpen}/>
    </>
  );
}

type SmallSidebarItemProps = {
  Icon: ElementType;
  url: string;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

type SmallSidebarItemMobileProps = {
  Icon: ElementType;
  url: string;
  isActive: boolean;
  onClick: () => void;
}

const SmallSidebarItem = ({ Icon, url, isActive, onClick, title }: SmallSidebarItemProps) => {
  return <Link
    to={url}
    onClick={onClick}
    className={twMerge(
      buttonStyles({ variant: "ghost" }),
      "flex items-center p-3 gap-3 xl:gap-5 dark:focus:bg-transparent",
      isActive ? "" : "" // Active style
    )}
  >
    <Icon className={`w-6 h-6 ${isActive && ''}`} />
    <div className={`text-xl hidden xl:block ${isActive && 'font-bold'}`}>{title}</div>
  </Link>
}

const SmallSidebarItemMobile = ({ Icon, url, isActive, onClick }: SmallSidebarItemMobileProps) => {
  return <Link
    to={url}
    onClick={onClick}
    className={twMerge(
      buttonStyles({ variant: "ghost" }),
      "flex items-center p-3 gap-3 dark:focus:bg-transparent",
      isActive ? "fill-white" : "" // Active style
    )}
  >
    <Icon className={`${isActive ? "stroke-2 stroke-white" : "" } w-6 h-6`} />
  </Link>
}
