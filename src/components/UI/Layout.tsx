import { useAuthContext } from "../../context/auth-context";
import Sidebar from "../general/SideBar";
import { Outlet, useLocation } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'

type LayoutProps = {
    rightComponent: React.ElementType;
};

function Layout({ rightComponent: RightComponent }: LayoutProps) {
    const location = useLocation();
    const isCustomPage = location.pathname.includes("/messages") || location.pathname.includes("/settings");
    const { profileData } = useAuthContext();

    return (
        <>
            {profileData ? (
                <div className="layout flex w-full md:max-w-[680px] mlg:max-w-[700px] lg:max-w-[1060px] xl:max-w-[1282px] md:mx-auto min-h-screen">
                    <Sidebar />
                    <div className={`${isCustomPage ? '' : 'w-[65%] flex-grow lg:w-[55%]'} border-r border-dark-border`}>
                        <Outlet />
                    </div>
                    <div className={`${isCustomPage ? '' : 'hidden lg:block w-[35%] lg:px-6'} `}>
                        <RightComponent />
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center min-h-screen">
                    <Oval
                        visible={true}
                        height="60"
                        width="60"
                        color="#ffffff"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            )}
        </>
    );
}

export default Layout;