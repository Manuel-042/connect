import { memo, useState, useEffect } from "react";
import { LuX, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { MediaItem } from "../../../types";

interface MediaElementProps {
    media: MediaItem;
    index: number;
    onRemove: (index: number) => void;
}

const MediaElement = memo(({ media, index, onRemove }: MediaElementProps) => {
    return (
        <div className="relative w-full pb-[100%]" key={media.url}>
            <div className="absolute inset-0">
                {media.type === "video" ? (
                    <video
                        src={media.url}
                        controls
                        className="w-full h-full object-cover rounded-xl"
                        playsInline
                        preload="metadata"
                        key={`video-${index}-${media.url}`}
                    />
                ) : (
                    <img
                        src={media.url}
                        alt={`Media ${index + 1}`}
                        className="w-full h-full object-cover rounded-xl"
                        loading="eager"
                        key={`img-${index}-${media.url}`}
                    />
                )}
                <button
                    onClick={() => onRemove(index)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-opacity"
                    aria-label="Remove media"
                >
                    <LuX size={20} />
                </button>
            </div>
        </div>
    );
});

interface MediaCarouselProps {
  mediaItems: MediaItem[];
  onRemove: (index: number) => void;
}

const MediaCarousel = ({ mediaItems, onRemove }: MediaCarouselProps) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 2;
    const totalPages = Math.max(1, Math.ceil(mediaItems.length / itemsPerPage));

    const nextSlide = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    };

    const prevSlide = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
    };

    const handleRemove = (index: number) => {
        onRemove(index);
        // Reset page when removing items would make current page invalid
        const newLength = mediaItems.length - 1;
        const newTotalPages = Math.ceil(newLength / itemsPerPage);
        
        if (currentPage >= newTotalPages) {
            setCurrentPage(Math.max(0, newTotalPages - 1));
        }
    };

    // Reset to first page when media count changes significantly
    useEffect(() => {
        if (mediaItems.length <= itemsPerPage) {
            setCurrentPage(0);
        }
    }, [mediaItems.length]);

    const startIndex = currentPage * itemsPerPage;
    const visibleItems = mediaItems.slice(startIndex, startIndex + itemsPerPage);

    // Simplified render logic - no conditional for single item
    return (
        <div className="w-full mt-4">
            <div className="relative">
                <div className={mediaItems.length === 1 ? "w-full" : "grid grid-cols-2 gap-2"}>
                    {visibleItems.map((media, index) => (
                        <MediaElement
                            key={`${media.url}-${startIndex + index}`}
                            media={media}
                            index={startIndex + index}
                            onRemove={() => handleRemove(startIndex + index)}
                        />
                    ))}
                </div>

                {mediaItems.length > itemsPerPage && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-opacity"
                            aria-label="Previous page"
                        >
                            <LuChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-opacity"
                            aria-label="Next page"
                        >
                            <LuChevronRight size={20} />
                        </button>

                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button
                                    key={`dot-${index}`}
                                    onClick={() => setCurrentPage(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${
                                        index === currentPage ? "bg-blue-500" : "bg-gray-400"
                                    }`}
                                    aria-label={`Go to page ${index + 1}`}
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

