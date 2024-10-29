import { ElementType } from "react";
import { LuMenu, LuUser2, LuSearch, LuBell, LuMail, LuUserPlus2, LuLeaf, LuHome} from "react-icons/lu";
import Button, { buttonStyles } from "../UI/Button";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";



export default function SideBar () {

  return (
    <aside className={`max-h-screen border-r border-gray-700 sticky left-0 top-0 flex flex-col p-4 items-start transition-all duration-300 ease-in-out gap-3`}>
      <Button className={twMerge(buttonStyles({ variant: "ghost", size: "navicon"}), "bg-transparent p-3")}><LuMenu /></Button>

      <SmallSidebarItem Icon={LuHome} url="/" />
      <SmallSidebarItem Icon={LuSearch} url="/search" />
      <SmallSidebarItem Icon={LuBell} url="/notifications" />
      <SmallSidebarItem Icon={LuMail} url="/messages" />
      <SmallSidebarItem Icon={LuUserPlus2} url="/profile" />
      <SmallSidebarItem Icon={LuLeaf} url="/post" />

      {/* align self bottom */}
      <Button className={twMerge(buttonStyles({ variant: "ghost", size: "navicon"}), "bg-transparent mt-auto p-3")}><LuUser2 /></Button>
    </aside>
  );
}

type SmallSidebarItemProps = {
  Icon: ElementType;
  url: string;
}

const SmallSidebarItem = ({Icon, url} : SmallSidebarItemProps) => {
  return <Link to={url} className={twMerge(buttonStyles({ variant: "ghost" }), "flex items-center p-3 gap-3")}>
    <Icon className="w-6 h-6"/>
  </Link>
}
