import Sidebar from "../general/SideBar";
import { Outlet } from 'react-router-dom';

type LayoutProps = {
    rightComponent: React.ElementType;
};

function Layout({ rightComponent: RightComponent }: LayoutProps) {
    return (
        <div className="layout flex w-full min-h-screen container mx-auto">
            <Sidebar />
            <Outlet />
            <RightComponent />
        </div>
    );
}

export default Layout;
