import { ElementType, useEffect, useState } from "react";
import { LuMenu, LuSearch, LuBell, LuMail, LuUserPlus2, LuLeaf, LuHome } from "react-icons/lu";
import Button, { buttonStyles } from "../UI/Button";
import { twMerge } from "tailwind-merge";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/auth-context";
import users from "../../data/users.json"
import { UserProps } from "../../types";



export default function SideBar() {
  const location = useLocation();
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
  }, [user]);

  const sidebarItems = [
    { Icon: LuHome, url: "/" },
    { Icon: LuSearch, url: "/explore" },
    { Icon: LuBell, url: "/notifications" },
    { Icon: LuMail, url: "/messages" },
    { Icon: LuUserPlus2, url: `/${user?.username}` },
  ];

  const sidebarItemsMobile = [
    { Icon: LuHome, url: "/" },
    { Icon: LuSearch, url: "/explore" },
    { Icon: LuBell, url: "/notifications" },
    { Icon: LuMail, url: "/messages" },
  ];

  console.log({ location })

  useEffect(() => {
    const index = sidebarItems.findIndex(item => location.pathname === item.url);
    setActiveIndex(index !== -1 ? index : 0);
  }, [location]);

  console.log({ activeIndex })


  return (
    <>
      <aside className={`hidden sm:flex max-h-screen border-r border-dark-border sticky left-0 top-0 flex-col pt-4 px-2 smd:px-4 pb-6 items-center transition-all duration-300 ease-in-out gap-1`}>
        <Button className={twMerge(buttonStyles({ variant: "ghost", size: "navicon" }), "hidden sm:block bg-transparent p-3")}><LuMenu /></Button>

        <div className="flex flex-col gap-3">
          {sidebarItems.map((item, index) => (
            <SmallSidebarItem
              key={index}
              Icon={item.Icon}
              url={item.url}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}

          <Button className={twMerge(buttonStyles({ variant: "ghost" }), "flex bg-secondary hover:bg-transparent items-center p-3 gap-3")}>
            <LuLeaf className="w-6 h-6" />
          </Button>
        </div>

        {/* align self bottom */}
        <Button className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "p-0 bg-transparent hover:bg-transparent mt-auto w-9 h-9")}>
          <img src={appUser?.image} alt={`${appUser?.displayname} profile picture`} className="rounded-full w-full h-full" />
        </Button>
      </aside>

      <aside className={`sm:hidden flex z-50 bg-black w-full max-h-12 border-t border-dark-border fixed bottom-0 px-6 items-center transition-all duration-300 ease-in-out gap-1`}>
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
    </>


  );
}

type SmallSidebarItemProps = {
  Icon: ElementType;
  url: string;
  isActive: boolean;
  onClick: () => void;
}

const SmallSidebarItem = ({ Icon, url, isActive, onClick }: SmallSidebarItemProps) => {
  return <Link
    to={url}
    onClick={onClick}
    className={twMerge(
      buttonStyles({ variant: "ghost" }),
      "flex items-center p-3 gap-3",
      isActive ? "" : "" // Active style
    )}
  >
    <Icon className="w-6 h-6" />
  </Link>
}

const SmallSidebarItemMobile = ({ Icon, url, isActive, onClick }: SmallSidebarItemProps) => {
  return <Link
    to={url}
    onClick={onClick}
    className={twMerge(
      buttonStyles({ variant: "ghost" }),
      "flex items-center p-3 gap-3",
      isActive ? "" : "" // Active style
    )}
  >
    <Icon className="w-6 h-6" />
  </Link>
}
