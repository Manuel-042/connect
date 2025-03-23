import { MediaItem } from "../../../types";

type Props = {
    media: Partial<MediaItem>[];
    handleOpenModal: (num: number) => void;
}

const getGridStyles = (imageCount: number) => {
    switch (imageCount) {
        case 1:
            return "grid grid-cols-1";
        case 2:
            return "grid grid-cols-2 gap-0.5";
        case 3:
            return "grid grid-rows-2 grid-cols-2 gap-0.5";
        case 4:
            return "grid grid-rows-2 grid-cols-2 gap-0.5";
        default:
            return "grid grid-rows-2 grid-cols-2 gap-0.5";
    }
}

const PostMedia = ({ media, handleOpenModal }: Props) => {
    const count = media?.length;
    const gridClasses = getGridStyles(count);

    return (
        <div className={`relative ${gridClasses}`}>
            {media?.slice(0, 4).map((row, index) => (
                <div
                    key={index}
                    className={`relative ${count === 3 && index === 0
                            ? 'row-span-2 h-full'
                            : count > 2
                                ? 'h-auto'
                                : 'h-full'
                        }`}
                >
                    {row.type === 'video' ? (
                        <video
                            src={row.url}
                            className={`object-cover object-center w-full h-full cursor-pointer ${count === 1
                                ? 'rounded-2xl'
                                : count === 2 && index === 0
                                    ? 'rounded-l-2xl'
                                    : count === 2 && index === 1
                                        ? 'rounded-r-2xl'
                                        : count === 3 && index === 0
                                            ? 'rounded-l-2xl'
                                            : count === 3 && index === 1
                                                ? 'rounded-tr-2xl'
                                                : count === 3 && index === 2
                                                    ? 'rounded-br-2xl'
                                                    : (count === 4 || count > 4) && index === 0
                                                        ? 'rounded-tl-2xl'
                                                        : (count === 4 || count > 4) && index === 1
                                                            ? 'rounded-tr-2xl'
                                                            : (count === 4 || count > 4) && index === 2
                                                                ? 'rounded-bl-2xl'
                                                                : (count === 4 || count > 4) && index === 3
                                                                    ? 'rounded-br-2xl'
                                                                    : ''
                            }`}
                            style={{
                                aspectRatio: count > 2 ? '2 / 1' : 'auto',
                                height: '100%',
                                gridRow: count === 3 && index === 0 ? 'span 2' : 'auto',
                            }}
                            controls
                            muted
                            onClick={() => handleOpenModal(index)}
                        />
                    ) : (
                        <img
                            src={row.url}
                            alt={`media-${index}`}
                            className={`object-cover object-center w-full h-full cursor-pointer ${count === 1
                                ? 'rounded-2xl'
                                : count === 2 && index === 0
                                    ? 'rounded-l-2xl'
                                    : count === 2 && index === 1
                                        ? 'rounded-r-2xl'
                                        : count === 3 && index === 0
                                            ? 'rounded-l-2xl'
                                            : count === 3 && index === 1
                                                ? 'rounded-tr-2xl'
                                                : count === 3 && index === 2
                                                    ? 'rounded-br-2xl'
                                                    : (count === 4 || count > 4) && index === 0
                                                        ? 'rounded-tl-2xl'
                                                        : (count === 4 || count > 4) && index === 1
                                                            ? 'rounded-tr-2xl'
                                                            : (count === 4 || count > 4) && index === 2
                                                                ? 'rounded-bl-2xl'
                                                                : (count === 4 || count > 4) && index === 3
                                                                    ? 'rounded-br-2xl'
                                                                    : ''
                            }`}
                            style={{
                                aspectRatio: count > 2 ? '2 / 1' : 'auto',
                                height: '100%',
                                gridRow: count === 3 && index === 0 ? 'span 2' : 'auto',
                            }}
                            onClick={() => handleOpenModal(index)}
                        />
                    )}

                    {count > 4 && index === 3 && (
                        <div className="absolute cursor-pointer inset-0 bg-black dark:text-white bg-opacity-50 flex items-center justify-center text-xl rounded-xl">
                            +{count - 4}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default PostMedia;
