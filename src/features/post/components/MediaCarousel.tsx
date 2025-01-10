import { useState } from "react";
import { LuX, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { MediaItem } from "../../../types";

interface MediaCarouselProps {
    mediaItems: MediaItem[];
    onRemove: (index: number) => void;
}

const MediaCarousel = ({ mediaItems, onRemove }: MediaCarouselProps) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 2;
    const totalPages = Math.ceil(mediaItems.length / itemsPerPage);

    const nextSlide = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevSlide = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const handleRemove = (index: number) => {
        onRemove(index);
        
        // Adjust current page if needed
        const newTotalPages = Math.ceil((mediaItems.length - 1) / itemsPerPage);
        if (currentPage >= newTotalPages) {
            setCurrentPage(Math.max(0, newTotalPages - 1));
        }
    };

    // Single image display
    if (mediaItems.length === 1) {
        return (
            <div className="w-full mt-4">
                <div className="relative w-full pb-[100%]">
                    <div className="absolute inset-0">
                        <img
                            src={mediaItems[0].url}
                            alt="Media 1"
                            className="w-full h-full object-cover rounded-xl"
                        />
                        <button
                            onClick={() => handleRemove(0)}
                            className="absolute top-2 right-2 p-1 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                        >
                            <LuX size={20} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Grid layout for 2 or more images
    const startIndex = currentPage * itemsPerPage;
    const visibleItems = mediaItems.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="w-full mt-4">
            <div className="relative">
                <div className="grid grid-cols-2 gap-2">
                    {visibleItems.map((media, index) => {
                        const actualIndex = startIndex + index;
                        return (
                            <div key={media.url} className="relative w-full pb-[100%]">
                                <div className="absolute inset-0">
                                    <img
                                        src={media.url}
                                        alt={`Media ${actualIndex + 1}`}
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                    <button
                                        onClick={() => handleRemove(actualIndex)}
                                        className="absolute top-2 right-2 p-1 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                                    >
                                        <LuX size={20} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {mediaItems.length > 2 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                        >
                            <LuChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                        >
                            <LuChevronRight size={20} />
                        </button>

                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index)}
                                    className={`w-2 h-2 rounded-full ${
                                        index === currentPage ? "bg-blue-500" : "bg-gray-400"
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MediaCarousel;