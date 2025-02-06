import { twMerge } from "tailwind-merge";
import Button, { buttonStyles } from "../../../components/UI/Button";
import { LuCircleX } from "react-icons/lu";


type TenorImagePreview = {
    url: string;
    width: number;
    height: number;
}

type MediaPreviewProps = {
    media?: TenorImagePreview;
    onRemove: () => void;
}
const MediaPreview = ({ media, onRemove }: MediaPreviewProps) => {
    if (!media) return null;

    return (
        <div className="gif-preview relative" style={{ display: 'flex', alignItems: 'center', width: "15rem", height: '9rem' }}>
            <img
                src={media.url}
                alt="Selected GIF"
                className="rounded-xl w-full h-full"
            />
            <Button type="button" onClick={onRemove} className={twMerge(buttonStyles({ variant: "ghost", size: "icon" }), "dark:text-black dark:hover:bg-opacity-30  absolute top-2 right-3 cursor-pointer bg-transparent")}><LuCircleX className="text-3xl" /></Button>
        </div>
    );
};

export default MediaPreview;
