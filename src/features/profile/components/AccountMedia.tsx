import { LuFiles } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../../../components/UI/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { MediaItem } from "../../../types";

type Props = {
  media: Partial<MediaItem>[];
};

const AccountMedia = ({ media }: Props) => {
  const count = media.length;
  const navigate = useNavigate();
  const location = useLocation();

  const handleShowPost = () => {
    navigate(`/post/102/photo/0`, {
      state: { previousLocation: location.pathname },
    });
  };

  if (count === 0) return null;

  const firstMedia = media[0];

  return (
    <div className="p-1">
      <div className="relative w-max" onClick={handleShowPost}>
        {firstMedia &&
          firstMedia.url &&
          (firstMedia.type === "video" ? (
            <video
              src={firstMedia.url}
              className="object-cover w-44 h-44 cursor-pointer"
              controls
            />
          ) : (
            <img
              src={firstMedia.url}
              alt="media"
              className="object-cover w-44 h-44 cursor-pointer"
            />
          ))}

        {count > 1 && (
          <div className="absolute right-1 bottom-0">
            <LuFiles
              className={twMerge(
                buttonStyles({ variant: "ghost", size: "icon" }),
                "w-11 h-11 cursor-pointer dark:hover:bg-transparent"
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountMedia;
