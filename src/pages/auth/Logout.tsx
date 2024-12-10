import { useNavigate } from "react-router-dom"
import twitter from "../../assets/white-twitter.png"
import Button from "../../components/UI/Button"
import { useAuthContext } from "../../context/auth-context"


const Logout = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    const handleLogout = () => {
        navigate(`/?logout=${user?.id}`)
    }

    return (
        <div className={`fixed top-0 z-50 overflow-hidden left-0 h-full w-full flex items-center justify-center transition-transform transform`} style={{ background: 'rgba(91, 112, 131, 0.7)' }}>

            <div className={`bg-black flex flex-col rounded-3xl items-center justify-center p-6 w-4/5 sm:w-[30%]`}>
                <img src={twitter} alt="twitter logo" className="mb-2" />
    
                <div className="text-left flex flex-col items-start mb-5">
                    <h2 className='font-extrabold dark:text-white text-lg'>Logout of X?</h2>
                    <p className='text-sm text-dark-text'>You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account.</p>
                </div>

                <div className="flex flex-col flex-1 w-full">
                    <Button onClick={handleLogout} className='dark:bg-white dark:text-black text-sm font-bold mb-2 py-3'>Log out</Button>
                    <Button onClick={goBack} className='bg-transparent dark:focus:bg-dark-border border border-dark-border text-white text-sm font-bold py-3'>Cancel</Button>
                </div>
            </div>
        </div>
    )
}

export default Logout