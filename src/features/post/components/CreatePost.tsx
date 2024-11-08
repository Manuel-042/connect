import Button, { buttonStyles } from '../../../components/UI/Button'
import { twMerge } from 'tailwind-merge'
import { LuBoomBox, LuCalendarClock, LuFileImage, LuListChecks, LuMapPin, LuSmile } from 'react-icons/lu'
import useAutosizeTextArea from '../../../hooks/useAutoSizeTextArea'
import { useRef, useState } from 'react'

const CreatePost = () => {
    const [postContent, setPostContent] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useAutosizeTextArea(textAreaRef.current, postContent);

    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = evt.target?.value;
      setPostContent(val);
    };


    return (
        <div className="grow w-90">
            <form className="w-100">
                <textarea
                    name="postContent"
                    value={postContent}
                    placeholder="What is happening?!"
                    className="noscrollbar px-2 pt-1 pb-4 overflow-auto bg-transparent text-xl w-full border-0 outline-0 resize-none dark:text-neutral-300"
                    onChange={handleChange}
                    ref={textAreaRef}
                    rows={1}
                />
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center justify-center text-xl text-blue-700">
                        <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent")}><LuFileImage /></Button>
                        <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent")}><LuBoomBox /></Button>
                        <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent hidden mlg:block")}><LuListChecks /></Button>
                        <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent")}><LuSmile /></Button>
                        <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent hidden mlg:block")}><LuCalendarClock /></Button>
                        <Button disabled className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-not-allowed bg-transparent opacity-50")}><LuMapPin /></Button>
                    </div>
                    <Button className={postContent ? "cursor-pointer" : "cursor-not-allowed opacity-50"} disabled={!postContent}>Post</Button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost