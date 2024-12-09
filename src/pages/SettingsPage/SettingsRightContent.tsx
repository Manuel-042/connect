import { Route, Routes, useParams } from "react-router-dom"
import { AccountDetails, SettingDetail } from "../../features/settings"
import { AccountInformation } from "../../features/settings";

const SettingsRightContent = () => {
  const { setting } = useParams();

  if (!setting) return null

  return (
    <div className='hidden w-[600px] lg:w-[580px] lg:flex flex-col items-center justify-center max-h-screen overflow-hidden border-r border-dark-border'>
      <Routes>
        <Route index element={<SettingDetail setting={setting} />} />
        <Route path="account" element={<AccountDetails />} />
        <Route path="your_twitter_data/account" element={<AccountInformation />} />
        <Route path="*" element={<div>Select a setting to view details</div>} />
      </Routes>
    </div>
  )
}

export default SettingsRightContent