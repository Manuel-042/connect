import { Link } from 'react-router-dom';
import { LuHeartCrack, LuKeyRound, LuUser2 } from 'react-icons/lu';
import Account from './Account';

const data = [
    { Icon: LuUser2, url: "/settings/your_twitter_data/account", title: "Account Information", subtitle: "See your account information like your phone number and email address" },
    { Icon: LuKeyRound, url: "/settings/password", title: "Change Password", subtitle: "Change your password at any time" },
    { Icon: LuHeartCrack, url: "/settings/deactivate", title: "Deactivate your account", subtitle: "Find out how to deactivate your account" }
];

const AccountList = () => {
    return (
        <div className="w-full mt-3 md:overflow-hidden dark:text-white">
            {data.map((item, index) => {
                return (
                    <Link to={item.url} key={index}>
                        <Account
                            Icon={item.Icon}
                            title={item.title} 
                            subtitle={item.subtitle}
                        />
                    </Link>
                );
            })}
        </div>
    );
}

export default AccountList