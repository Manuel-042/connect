import AccountList from "./AccountList"


const AccountDetails = () => {
  return (
    <div className="py-4">
        <div className="px-4">
            <h1 className="dark:text-white font-bold text-base lg:text-xl mb-5">Your account</h1>
            <p className="dark:text-dark-text text-sm mb-3 font-bold">See information about your account, download an archive of your data, or learn about your account deactivation options</p>
        </div>
        
        <AccountList />
    </div>
  )
}

export default AccountDetails