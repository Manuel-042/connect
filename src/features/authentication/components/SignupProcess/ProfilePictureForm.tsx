import { LuImagePlus } from 'react-icons/lu'
import profileImage from "../../../../assets/profileimage.png"

const ProfilePictureForm = () => {
  return (
    <div>
        <h1 className="dark:text-white font-semibold text-3xl mb-1">Pick a profile picture</h1>
        <p className="dark:text-dark-text text-base mb-7">Have a favourite selfie? Upload it now</p>

        <div className='flex items-center justify-center h-72'>
            <input type="file" id="profile" className='hidden'/>
            <label htmlFor='profile' className="flex cursor-pointer items-center justify-center w-36 h-36 border border-dark-border rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${profileImage})` }}>
                <LuImagePlus className='w-5 h-5'/>
            </label>
        </div>
    </div>
  )
}

export default ProfilePictureForm