


type Props = {
    images: string[];
    handleOpenModal: (num: number) => void;
}


const getGridStyles = (imageCount: number) => {
    switch (imageCount) {
        case 1:
            return "grid grid-cols-1";
        case 2:
            return "grid grid-cols-2 gap-2";
        case 3:
            return "grid grid-rows-2 grid-cols-2 gap-2";
        case 4:
            return "grid grid-rows-2 grid-cols-2 gap-2";
        default:
            return "grid grid-rows-2 grid-cols-2 gap-2";
    }
}

const PostMedia = ({ images, handleOpenModal }: Props) => {
    const count = images.length;
    const gridClasses = getGridStyles(count);

    return (
        <div className={`relative ${gridClasses}`}>
            {images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative">
                    <img
                        src={image}
                        alt={`image-${index}`}
                        className={`object-cover w-full rounded-lg cursor-pointer ${count === 1 || count === 2 ? 'h-80':'h-40'}`}
                        style={count === 3 && index === 0 ? { gridRow: 'span 2' } : {}}
                        onClick={() => handleOpenModal(index)}
                    />
                    {count > 4 && index === 3 && (
                        <div className="absolute cursor-pointer inset-0 bg-black bg-opacity-50 flex items-center justify-center text-xl rounded-lg">
                            +{count - 4}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default PostMedia