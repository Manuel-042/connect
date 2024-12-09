import { useEffect, useState } from 'react'
import Setting from './Setting';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const data = [
    { url: "account", title: "Your account"}
];

const SettingsList = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        handleNavigation(0);
    
        if (location.pathname === "/settings") {
            navigate('account');
        }
    
    }, [location]);

    const handleNavigation = (index: number) => {
        setActiveIndex(index)
    };

    return (
        <div className="w-full mt-3 md:overflow-hidden dark:text-white">
            {data.map((item, index) => {
                return (
                    <Link to={item.url} key={index}>
                        <Setting
                            name={item.title} 
                            onClick={() => handleNavigation(index)} 
                            active={index === activeIndex}
                        />
                    </Link>
                );
            })}
        </div>
    );
}

export default SettingsList