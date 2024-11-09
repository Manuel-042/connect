import Sidebar from "../general/SideBar";
import { Outlet, useLocation } from 'react-router-dom';

type LayoutProps = {
    rightComponent: React.ElementType;
};

function Layout({ rightComponent: RightComponent }: LayoutProps) {
    const location = useLocation();
    const isMessagePage = location.pathname.includes("/messages");

    return (
        <div className="layout flex w-full md:max-w-[686px] lg:max-w-[1060px] xl:max-w-[1282px] md:mx-auto min-h-screen">
            <Sidebar />
            <div className={`${isMessagePage ? '' : 'w-[85%] flex-grow lg:w-[55%]'}`}><Outlet /></div>
            <div className={`${isMessagePage ? '' : 'hidden lg:block w-[35%] lg:px-6'}`}><RightComponent /></div>
        </div>
        
    );
}

export default Layout;
