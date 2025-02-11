import Button, { buttonStyles } from '../../../components/UI/Button';
import { twMerge } from 'tailwind-merge';
import { LuImagePlus, LuX } from 'react-icons/lu';
import { useRef, useState, Dispatch, SetStateAction } from 'react';
import useApiPrivate from '../../../hooks/useApiPrivate';
import { ProfileData } from '../../../types';

type FloatingLabelProps = {
    id: string;
    label: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    maxLength?: number;
    onBlur: (id: string, value: string) => void;
    setIsFocused: Dispatch<SetStateAction<boolean>>;
    isFocused: boolean;
};

const FloatingLabelInput = ({
    id,
    label,
    value,
    setValue,
    maxLength,
    onBlur,
    isFocused,
    setIsFocused,
}: FloatingLabelProps) => {
    return (
        <div className="relative h-[60px] mt-2 mb-1">
            <input
                type="text"
                id={id}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => onBlur(id, value)} 
                maxLength={maxLength}
                className="px-3 pt-5 w-full h-full border rounded-md bg-transparent outline-none 
                     border-dark-border text-lg dark:text:white focus:ring-2 focus:ring-secondary-100 focus:border-transparent autofill:bg-transparent 
                    autofill:text-white"
            />
            <label
                htmlFor={id}
                className={`absolute left-3 transition-all text-lg dark:text-dark-text ${isFocused || value
                        ? "top-1 text-sm text-secondary-100"
                        : "top-4 text-gray-500"
                    }`}
            >
                {label}
            </label>
            {maxLength && (
                <div className="text-[0.8rem] absolute top-2 right-2 dark:text-dark-text">
                    {value.length} / {maxLength}
                </div>
            )}
        </div>
    );
};

const EditProfileForm: React.FunctionComponent<ProfileData> = ({ user, cover_image, avatar }: ProfileData) => {
    const coverPhotoRef = useRef<HTMLInputElement>(null)
    const profilePhotoRef = useRef<HTMLInputElement>(null)
    const [errors, setErrors] = useState({ name: "", username: "", bio: ""});

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    //const [biography, setBiography] = useState("");
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isChecking, setIsChecking] = useState(false); 
    const [isValid, setIsValid] = useState(true); 

    const apiPrivate = useApiPrivate();
    let debounceTimeout: NodeJS.Timeout;

    const handleSubmit = async () => {
        console.log("here")
    }

    const handleOpenCoverPhoto = () => {
        if (coverPhotoRef.current) {
            coverPhotoRef?.current.click()
        }
    };

    const handleOpenProfilePhoto = () => {
        if (profilePhotoRef.current) {
            profilePhotoRef?.current.click()
        }
    };

    const validateForm = (updatedErrors: typeof errors) => {
        const isNameValid = !updatedErrors.name;
        const isUsernameValid =  !updatedErrors.username;
        const isBioValid =  !updatedErrors.bio;

        setIsFormValid(isNameValid && isUsernameValid && isBioValid);
    };

    const validateField = async (id: string, value: string) => {
        let updatedErrors = { ...errors };

        if (id === "name") {
            updatedErrors.name = value ? "" : "Name can't be blank";
        }

        if (id === "username") {
            if (!value) {
                updatedErrors.username = "Username can't be blank";
            } else {
                clearTimeout(debounceTimeout);
                debounceTimeout = setTimeout(async () => {

                    try {
                        const response = await apiPrivate?.post("/api/username/check", { username });
                        if (response?.status === 200 && response?.data?.isAvailable) {
                            updatedErrors.username = "" ;
                            setIsValid(true);
                        } else {
                            updatedErrors.username = "Username already exists" ;
                            setIsValid(false);
                        }
                    } catch (error) {
                        console.error(error);
                        updatedErrors.username = "An error occurred. Please try again later." ;
                        setIsValid(false);
                    } finally {
                        setIsChecking(false);
                    }
                }, 500)              
            }
        }

        console.log("Errors:", updatedErrors);
        setErrors(updatedErrors);
        validateForm(updatedErrors);
    };

    console.log({isChecking, isFormValid, isValid})

    const handleBlur = (id: string, value: string) => {
        validateField(id, value);
        if (id === "name") setIsNameFocused(value !== "");
        if (id === "username") setIsUsernameFocused(value !== "");
    };

    return (
        <form className="flex flex-col items-center gap-2 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-items-center gap-3 w-full">
                <div className='relative'>
                    <div className="h-48 cursor-pointer relative">
                        <input
                            type="file"
                            id="coverphoto"
                            className="hidden"
                            ref={coverPhotoRef}
                        />
                        <img src={cover_image} className="w-full h-full object-cover object-center" alt="user's cover photo" />
                        <div className='overlay absolute top-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center'>
                            <div className='flex items-center gap-4'>
                                <label htmlFor="coverphoto" className='rounded-full'>
                                    <Button onClick={handleOpenCoverPhoto} className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), 'cursor-pointer w-12 h-12 text-neutral-200 bg-black bg-opacity-60 hover:bg-black hover:bg-opacity-50')}>
                                        <LuImagePlus className='text-xl' />
                                    </Button>
                                </label>
                                <Button className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), 'cursor-pointer w-12 h-12 text-neutral-200 bg-black bg-opacity-60 hover:bg-black hover:bg-opacity-50')}>
                                    <LuX className='text-xl' />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className='w-28 h-28 absolute left-5 top-32 cursor-pointer'>
                        <input
                            type="file"
                            id="profilephoto"
                            className="hidden"
                            ref={profilePhotoRef}
                        />
                        <img src={avatar} alt={`${user.username} profile picture`} className='border-4 border-black rounded-full w-full h-full' />

                        <div className='overlay absolute top-0 rounded-full w-full h-full bg-black bg-opacity-40 flex items-center justify-center'>
                            <label htmlFor='profilephoto' className='rounded-full'>
                                <Button onClick={handleOpenProfilePhoto} className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), 'cursor-pointer w-10 h-10 text-neutral-200 bg-black bg-opacity-60 hover:bg-black hover:bg-opacity-50')}>
                                    <LuImagePlus className='text-xl' />
                                </Button>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Name and Bio Fields */}
                <div className='mt-14 flex flex-col gap-2'>
                    <FloatingLabelInput
                        id="name"
                        label="Name"
                        value={name}
                        setValue={setName}
                        maxLength={50}
                        onBlur={handleBlur}
                        setIsFocused={setIsNameFocused}
                        isFocused={isNameFocused}
                    />
                    {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
            
                    <FloatingLabelInput
                        id="name"
                        label="Username"
                        value={name}
                        setValue={setUsername}
                        maxLength={12}
                        onBlur={handleBlur}
                        setIsFocused={setIsUsernameFocused}
                        isFocused={isUsernameFocused}
                    />
                    {errors.username && <p className="text-xs text-red-600">{errors.username}</p>}


                    {/* <div className='text-left flex flex-col gap-2'>
                        <label htmlFor='bio' className='text-base font-bold'>Your Bio</label>
                        <textarea
                            {...register("bio")}
                            placeholder="Enter your Bio"
                            id="bio"
                            className="border-1 resize-none shadow-sm dark:shadow-neutral-800 bg-neutral-700 text-neutral-300 px-4 py-2 rounded-md focus:outline-1 w-full"
                        ></textarea>
                        {errors.bio && <p className="text-xs text-red-600">{errors.bio.message}</p>}
                    </div> */}
                </div>
            </div>
        </form>
    );
};

export default EditProfileForm;
