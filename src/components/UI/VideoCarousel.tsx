import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import Button, { buttonStyles } from './Button';
import { twMerge } from 'tailwind-merge';
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

type CarouselProps = {
    videos: string[];
}

export default function EmblaVideoCarousel({ videos }: CarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    const scrollPrev = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollPrev();
        }
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollNext();
        }
    }, [emblaApi]);

    return (
        <div className='video_embla relative'>
            <div className="video_embla__viewport" ref={emblaRef}>
                <div className="video_embla__container">
                    {videos.map((item, index) => (
                        <div className="video_embla__slide" key={index}>
                            <video
                                src={item}
                                className="w-full h-full cursor-pointer rounded-lg"
                                controls
                                preload="metadata"
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <Button 
                    className={twMerge(buttonStyles({variant: "blueghost", size: "icon"}), "video_embla__prev absolute left-5 top-12 bg-transparent text-neutral-300")} 
                    onClick={scrollPrev}
                >
                    <LuArrowLeft />
                </Button>
                <Button 
                    className={twMerge(buttonStyles({variant: "blueghost", size: "icon"}),"video_embla__next absolute right-5 top-12 bg-transparent text-neutral-300")} 
                    onClick={scrollNext}
                >
                    <LuArrowRight />
                </Button>
            </div>
        </div>
    );
}
