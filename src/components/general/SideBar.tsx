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
    { Icon: LuLeaf, url: "/post" },
  ];

  console.log({ location })

  useEffect(() => {
    const index = sidebarItems.findIndex(item => location.pathname === item.url);
    setActiveIndex(index !== -1 ? index : 0);
  }, [location]);

  console.log({ activeIndex })


  return (
    <aside className={`max-h-screen border-r border-gray-700 sticky left-0 top-0 flex flex-col p-4 items-start transition-all duration-300 ease-in-out gap-3`}>
      <Button className={twMerge(buttonStyles({ variant: "ghost", size: "navicon" }), "bg-transparent p-3")}><LuMenu /></Button>

      {sidebarItems.map((item, index) => (
        <SmallSidebarItem
          key={index}
          Icon={item.Icon}
          url={item.url}
          isActive={index === activeIndex}
          onClick={() => setActiveIndex(index)}
        />
      ))}

      {/* align self bottom */}
      <Button className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "p-0 bg-transparent hover:bg-transparent mt-auto w-11 h-11")}>
        <img src={appUser?.image} alt={`${appUser?.displayname} profile picture`} className="rounded-full w-full h-full"/>
      </Button>
    </aside>
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
      isActive ? "bg-gray-500 bg-opacity-20 border-l-4 border-secondary" : "" // Active style
    )}
  >
    <Icon className="w-6 h-6" />
  </Link>
}
