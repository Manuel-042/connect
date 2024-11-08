import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { UserProps } from '../../../types';
import Button, { buttonStyles } from '../../../components/UI/Button';
import { twMerge } from 'tailwind-merge';
import { LuImagePlus, LuX } from 'react-icons/lu';
import { useRef } from 'react';

const MAX_UPLOAD_SIZE = 5000000;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const schema = z.object({
    coverphoto: z
        .instanceof(File)
        .optional()
        .refine((file) => {
            return !file || file.size <= MAX_UPLOAD_SIZE;
        }, 'File size must be less than 3MB')
        .refine((file) => {
            if (!file) return 
            return ACCEPTED_FILE_TYPES.includes(file.type);
        }, 'File must be a PNG or JPG or IPEG or WEBP'),
    profilephoto: z
        .instanceof(File)
        .optional()
        .refine((file) => {
            return !file || file.size <= MAX_UPLOAD_SIZE;
        }, 'File size must be less than 3MB')
        .refine((file) => {
            if (!file) return 
            return ACCEPTED_FILE_TYPES.includes(file.type);
        }, 'File must be a PNG or JPG or IPEG or WEBP'),
    name: z.string(),
    bio: z.string(),
})

type FormFields = z.infer<typeof schema>
type EditProfileProps = Pick<UserProps, 'displayname' | 'bio' | 'image' | 'coverPhoto'>;


const EditProfileForm: React.FunctionComponent<EditProfileProps> = ({ displayname, bio, coverPhoto, image }: EditProfileProps) => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<FormFields>({ defaultValues: { name: displayname, bio: bio }, resolver: zodResolver(schema) });
    const coverPhotoRef = useRef<HTMLInputElement>(null)
    const profilePhotoRef = useRef<HTMLInputElement>(null)

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            console.log("Submitted data:", data);
        } catch (err) {
            if (err instanceof AxiosError) {
                if (!err.response) {
                    setError('root', { message: "No server response" })
                } else {
                    console.log(err.response?.data);
                }
            } else {
                console.error("Non Axios error:", err)
            }
        }
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


    return (
        <form className="flex flex-col items-center gap-2 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-items-center gap-3 w-full">
                <div className='relative'>
                    <div className="h-48 cursor-pointer relative">
                        <input
                            type="file"
                            {...register("coverphoto")}
                            id="coverphoto"
                            className="hidden"
                            ref={coverPhotoRef}
                        />
                        <img src={coverPhoto} className="w-full h-full object-cover object-center" alt="user's cover photo" />
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
                            {...register("profilephoto")}
                            id="profilephoto"
                            className="hidden"
                            ref={profilePhotoRef}
                        />
                        <img src={image} alt={`${displayname} profile picture`} className='border-4 border-black rounded-full w-full h-full' />
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
                <div className='mt-14 flex flex-col gap-3'>
                    <div className='text-left flex flex-col gap-2'>
                        <label htmlFor='name' className='text-base font-bold'>Your Name</label>
                        <input
                            type="text"
                            {...register("name")}
                            placeholder="Enter your Display name"
                            id="name"
                            className="border-1 shadow-sm dark:shadow-neutral-800 bg-neutral-700 text-neutral-300 px-4 py-2 rounded-md focus:outline-1"
                        />
                        {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
                    </div>
                    <div className='text-left flex flex-col gap-2'>
                        <label htmlFor='bio' className='text-base font-bold'>Your Bio</label>
                        <textarea
                            {...register("bio")}
                            placeholder="Enter your Bio"
                            id="bio"
                            className="border-1 resize-none shadow-sm dark:shadow-neutral-800 bg-neutral-700 text-neutral-300 px-4 py-2 rounded-md focus:outline-1 w-full"
                        ></textarea>
                        {errors.bio && <p className="text-xs text-red-600">{errors.bio.message}</p>}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default EditProfileForm;
