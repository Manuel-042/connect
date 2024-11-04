import { LuBoomBox, LuFileImage, LuSendHorizonal, LuSmile } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import Button, { buttonStyles } from "../UI/Button";
import useAutosizeTextArea from "../../hooks/useAutoSizeTextArea"
import { useEffect, useRef, useState } from "react";
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { Theme } from 'emoji-picker-react';
import { useThemeContext } from "../../context/theme-context";
import { useNavigate } from "react-router-dom";
import { useGifContext } from "../../context/gif-context";
import GIFPreview from "./gifPreview";

const MessageForm = () => {
    const [messageContent, setMessageContent] = useState("")
    const [showEmojis, setShowEmojis] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(0);
    const [isAttachment, setIsAttachment] = useState(false);
    const [attachmentType, setAttachmentType] = useState("")
    const { theme } = useThemeContext();
    const navigate = useNavigate();
    const { gifPreview, setGifPreview } = useGifContext();
    const [file, setFile] = useState({
        url: "",
        width: 0,
        height: 0
    })

    const TextAreaRef = useRef<HTMLTextAreaElement>(null);

    useAutosizeTextArea(TextAreaRef.current, messageContent);

    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = evt.target?.value;
        setMessageContent(val);
    };

    useEffect(() => {
        if (gifPreview) {
            setAttachmentType("gif")
            setIsAttachment(true);
        }
    }, [])

    const onEmojiClick = ({ emoji }: EmojiClickData) => {
        const textArea = TextAreaRef.current;
        if (!textArea) return;
        textArea.focus();
        const cursorPosition = textArea.selectionStart ?? 0;
        const beforeCursor = messageContent.slice(0, cursorPosition);
        const afterCursor = messageContent.slice(cursorPosition);
        const updatedContent = `${beforeCursor}${emoji}${afterCursor}`;
        setMessageContent(updatedContent);
        setCursorPosition(cursorPosition + emoji.length);
    };


    const handleShowEmojis = () => {
        if (TextAreaRef.current) {
            TextAreaRef.current.focus();
        }
        setShowEmojis(!showEmojis)
    }

    const handleShowGIFs = () => {
        navigate('/i/foundMedia/search', {
            state: { from: location.pathname },
        });
    }

    const onRemove = () => {
        setGifPreview(null);
        setIsAttachment(false);
    }

    useEffect(() => {
        if (TextAreaRef.current) {
            TextAreaRef.current.selectionEnd = cursorPosition;
        }
    }, [cursorPosition])

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log("File input changed"); 

        const files = e.target.files;
    
        if (files) {
            const fileArray = Array.from(files);
            console.log("files:", fileArray);
            setIsAttachment(true);
            setAttachmentType("image")
            setFile(prev => ({
                ...prev, 
                url: URL.createObjectURL(files[0]), 
            }));
        } else {
            console.log("No files selected.");
        }
    };

    return (
        <div className="relative flex-grow">
            {showEmojis && <div className={`absolute bottom-16 left-3`}>
                <EmojiPicker height={300} width={300} onEmojiClick={onEmojiClick} theme={theme as Theme} />
            </div>}
            <div className="py-2 w-full">
                <form className="flex items-center justify-between w-[95%] mx-auto dark:bg-[#202327] rounded-md">
                    <input type="file" onChange={handleFileSelected} className="hidden" id="ImageUpload" accept="image/jpg, image/jpeg, image/png, image/webp" />
                    {!isAttachment && (
                        <div className="flex items-center">
                            <Button type="button" className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent")}> <label htmlFor="ImageUpload" className="cursor-pointer"><LuFileImage className="text-xl" /></label></Button>
                            <Button type="button" onClick={handleShowGIFs} className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent")}><LuBoomBox className="text-xl" /></Button>
                            <Button type="button" onClick={handleShowEmojis} className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent")}><LuSmile className="text-xl" /></Button>
                        </div>
                    )}
                    <div className={`w-[80%] ${isAttachment && 'flex flex-col items-start gap-2 py-2 ps-2'}`}>
                        {isAttachment &&
                        (
                            attachmentType === "image" ? file && <GIFPreview media={file} onRemove={onRemove} /> : gifPreview && <GIFPreview media={gifPreview} onRemove={onRemove} /> 
                        )
                            
                        }
                        <textarea
                            name="message"
                            placeholder="Start a new message"
                            className="ps-3 mt-1 w-full resize-none bg-transparent border-none outline-none dark:text-neutral-300"
                            onChange={handleChange}
                            onClick={() => setShowEmojis(false)}
                            ref={TextAreaRef}
                            value={messageContent}
                            rows={1}
                        ></textarea>
                    </div>
                    <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent")}><LuSendHorizonal className="text-xl" /></Button>
                </form>
            </div>
        </div>
    )
}

export default MessageForm