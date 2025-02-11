import React, { useEffect, useRef, useState } from 'react'
import useAutosizeTextArea from '../../../hooks/useAutoSizeTextArea';
import Button, { buttonStyles } from '../../../components/UI/Button';
import { twMerge } from 'tailwind-merge';
import { LuArrowLeft, LuBoomBox, LuCalendarClock, LuFileImage, LuListChecks, LuMapPin, LuSmile } from 'react-icons/lu';
import { useAuthContext } from '../../../context/auth-context';
import { User } from '../../../types';
import users from "../../../data/users.json"
import { Link, useLocation } from 'react-router-dom';

const MobileCreatePost = () => {
    const [postContent, setPostContent] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { profileData } = useAuthContext();
    const location = useLocation();

    const [appUser, setAppUser] = useState<User | any>(null);
  
    if (!profileData) return null;
  
    useEffect(() => {
      const foundUser = users.find(usr => Number(usr.user.id) === Number(profileData?.user.id));
      if (!foundUser) {
        return
      }
      setAppUser(foundUser);
    }, [profileData])

    useAutosizeTextArea(textAreaRef.current, postContent);

    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = evt.target?.value;
        setPostContent(val);
    };

    const from = location?.state?.from || '/home';
    console.log({from})


    return (
        <div className="grow">
            <div className="flex items-center justify-between gap-2 mb-8">
                <Link to={from} aria-label="Go back">
                    <LuArrowLeft
                        className={twMerge(
                            buttonStyles({ variant: "blueghost", size: "icon" }),
                            'cursor-pointer w-7 h-7 p-1 dark:text-neutral-200'
                        )}
                    />
                </Link>

                <div className="flex items-center justify-center gap-2">
                    <Button className="bg-transparent text-secondary font-semibold text-sm">Drafts</Button>
                    <Button className={`text-sm font-semibold py-1 ${postContent ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`} disabled={!postContent}>Post</Button>
                </div>
            </div>


            <form className="w-100">
                <div className='flex items-start gap-2'>
                    <div className="rounded-full w-10 h-10 bg-neutral-300 flex items-center justify-center cursor-pointer w-30">
                        <img src={appUser?.image} className="rounded-full w-full h-full object-contain object-center" alt={`${appUser?.displayname} profile image`} />
                    </div>
                    <textarea
                        name="postContent"
                        value={postContent}
                        placeholder="What is happening?!"
                        className="noscrollbar px-2 pt-1 pb-4 overflow-auto bg-transparent text-lg flex-1 border-0 outline-0 resize-none dark:text-white"
                        onChange={handleChange}
                        ref={textAreaRef}
                        rows={4}
                    />
                </div>
                <div className="flex items-center justify-between mt-20">
                    <div className="flex items-center justify-center text-xl text-blue-700">
                        <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent")}><LuFileImage /></Button>
                        <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent")}><LuBoomBox /></Button>
                        <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent")}><LuListChecks /></Button>
                        <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent")}><LuSmile /></Button>
                        <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent")}><LuCalendarClock /></Button>
                        <Button disabled className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-not-allowed bg-transparent opacity-50")}><LuMapPin /></Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MobileCreatePost