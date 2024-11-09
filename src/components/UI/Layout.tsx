import Sidebar from "../general/SideBar";
import { Outlet } from 'react-router-dom';

type LayoutProps = {
    rightComponent: React.ElementType;
};

function Layout({ rightComponent: RightComponent }: LayoutProps) {
    // md:mx-auto w-full  
    return (
        <div className="layout flex w-full md:max-w-[686px] lg:max-w-[1024px] xl:max-w-[1282px] md:mx-auto min-h-screen">
            <Sidebar />
            <div className="w-[85%] flex-grow overflow-x-hidden lg:w-[60%]"><Outlet /></div>
            <div className="hidden lg:block w-[35%] lg:px-6"><RightComponent /></div>
        </div>
    );
}

export default Layout;
