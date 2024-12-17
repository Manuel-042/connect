import { LuImagePlus } from 'react-icons/lu'
import profileImage from "../../../../assets/profileimage.png"
import Button, { buttonStyles } from '../../../../components/UI/Button'
import { twMerge } from 'tailwind-merge'

type ProfilePictureFormProps = {
  key?: string;
  next: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfilePictureForm: React.FC<ProfilePictureFormProps> = ({ next, setLoading }) => {
  const handleSubmit = async () => {
    // const success = await api.post('/api/set-password', { password });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      next();
    }, 2000);

    // if (success) {
    //     next();
    // }
  };

  return (
    <div>
      <h1 className="dark:text-white font-semibold text-3xl mb-1">Pick a profile picture</h1>
      <p className="dark:text-dark-text text-base mb-7">Have a favourite selfie? Upload it now</p>

      <div className='flex items-center justify-center h-72'>
        <input type="file" id="profile" className='hidden' />
        <label htmlFor='profile' className="flex cursor-pointer items-center justify-center w-36 h-36 border border-dark-border rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${profileImage})` }}>
          <LuImagePlus className='w-5 h-5' />
        </label>
      </div>

      <div className='mt-7 flex gap-3 flex-col'>
        <Button
          onClick={handleSubmit}
          type="button"
          className={twMerge(buttonStyles(), "w-full py-3 font-bold bg-white text-black disabled:bg-opacity-50 disabled:cursor-not-allowed hover:bg-white hover:bg-opacity-80 disabled:hover:bg-white disabled:hover:bg-opacity-50")}
          >
          Next
        </Button>

        <Button
          onClick={next}
          type="button"
          className={twMerge(buttonStyles(), "w-full py-3 font-bold text-white bg-transparent border border-white disabled:bg-transparent disabled:cursor-not-allowed hover:bg-transparent disabled:hover:bg-transparent")}
        >
          Skip for now
        </Button>
      </div>
    </div>
  )
}

export default ProfilePictureForm