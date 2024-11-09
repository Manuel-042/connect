


type Props = {
    images: string[];
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

const PostMedia = ({ images, handleOpenModal }: Props) => {
    const count = images.length;
    const gridClasses = getGridStyles(count);

    return (
        <div className={`relative ${gridClasses}`}>
            {images.slice(0, 4).map((image, index) => (
                <div
                    key={index}
                    className={`relative ${count === 3 && index === 0
                            ? 'row-span-2 h-full'
                            : count > 2
                                ? 'h-auto'
                                : 'h-full'
                        }`}
                >
                    <img
                        src={image}
                        alt={`image-${index}`}
                        className={`object-cover object-center w-full h-full cursor-pointer ${count === 1
                                ? 'rounded-md'
                                : count === 2 && index === 0
                                    ? 'rounded-l-md'
                                    : count === 2 && index === 1
                                        ? 'rounded-r-md'
                                        : count === 3 && index === 0
                                            ? 'rounded-l-md'
                                            : count === 3 && index === 1
                                                ? 'rounded-tr-md'
                                                : count === 3 && index === 2
                                                    ? 'rounded-br-md'
                                                    : (count === 4 || count > 4) && index === 0
                                                        ? 'rounded-tl-md'
                                                        : (count === 4 || count > 4) && index === 1
                                                            ? 'rounded-tr-md'
                                                            : (count === 4 || count > 4) && index === 2
                                                                ? 'rounded-bl-md'
                                                                : (count === 4 || count > 4) && index === 3
                                                                    ? 'rounded-br-md'
                                                                    : ''
                            }`}
                        style={{
                            aspectRatio: count > 2 ? '2 / 1' : 'auto',
                            height: '100%', // ensures image fills its grid cell
                            gridRow: count === 3 && index === 0 ? 'span 2' : 'auto',
                        }}
                        onClick={() => handleOpenModal(index)}
                    />

                    {/* Overlay for more images */}
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

export default PostMedia