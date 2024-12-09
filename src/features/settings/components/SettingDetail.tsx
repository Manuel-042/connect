import AccountDetails from "./account/AccountDetails";

type SettingDetailProps = {
    setting: string;
}


const SettingDetail = ({ setting }: SettingDetailProps) => {
    switch (setting) {
        case 'account':
            return <AccountDetails />;
        // case 'privacy':
        //     return <PrivacyDetails />;
        default:
            return <div></div>;
    }
}

export default SettingDetail