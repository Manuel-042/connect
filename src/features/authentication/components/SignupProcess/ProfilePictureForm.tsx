import { LuImagePlus } from 'react-icons/lu'
import defaultImage from "../../../../assets/profileimage.png"
import Button, { buttonStyles } from '../../../../components/UI/Button'
import { twMerge } from 'tailwind-merge'
import { useEffect, useState } from 'react'
import useApiPrivate from '../../../../hooks/useApiPrivate'
import { StepProps } from "../../../../pages/auth/Signup";


type ProfilePictureFormProps = StepProps

const ProfilePictureForm: React.FC<Partial<ProfilePictureFormProps>> = ({ next, setLoading, updateFormData }) => {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<string>("");
  const apiPrivate = useApiPrivate()

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setInputFile(file);
      setProfileImage(imageUrl);
    }
  };

  const formData = new FormData();

  useEffect(() => {
    if (inputFile) {
      formData.append('profile_picture', inputFile);
    } else {
      console.error("No file selected to upload.");
    }
  }, [inputFile]);


  const handleSubmit = async () => {
    setLoading?.(true);

    try {
      const response = await apiPrivate.post('/api/signup/steps/4', { profile_picture: formData });
      console.log(response);

      if (response.status === 200) {
        setLoading?.(false);
        console.log("Profile picture uploaded:", response?.data?.avatar_url);
        updateFormData?.("profilePicture", response?.data?.avatar_url)
        next?.();
      } else {
        setLoading?.(false);
        // Set toast message
        // updatedErrors.password = 'An unexpected error occurred. Please try again.';
        // setErrors(updatedErrors);
      }
    } catch (error) {
      setLoading?.(false);
      // Set toast message
      // updatedErrors.password = 'An unexpected error occurred. Please try again.';
      // setErrors(updatedErrors);
      console.error(error);
    } finally {
      setLoading?.(false);
    }
  };


  return (
    <div className="w-full h-full flex flex-col flex-grow">
      <h1 className="dark:text-white font-semibold text-3xl mb-1">Pick a profile picture</h1>
      <p className="dark:text-dark-text text-base mb-7">Have a favourite selfie? Upload it now</p>

      <div className='flex items-center justify-center h-72' >
        <label htmlFor="profileInput" className="cursor-pointer flex items-center justify-center">
          <div className="w-36 h-36 flex items-center justify-center border border-dark-border rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${profileImage || defaultImage})` }}>
            <LuImagePlus className="w-5 h-5" />
          </div>
        </label>

        <input
          id="profileInput"
          type="file"
          className="hidden"
          onChange={onFileChange}
        />

      </div>

      <div className='mt-auto flex gap-3 flex-col'>
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