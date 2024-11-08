import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Button, { buttonStyles } from './Button';
import { twMerge } from 'tailwind-merge';
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

type CarouselProps = {
    images: string[];
}

export default function EmblaCarousel({ images }: CarouselProps) {
    const { postId, photoId } = useParams<{ postId: string; photoId: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    if (photoId === null) {
        return null
    }

    const id = Number(photoId);

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: id })

    const scrollPrev = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollPrev();
            const currentIndex = emblaApi.selectedScrollSnap();
            navigate(`/post/${postId}/photo/${currentIndex}`, {state: { previousLocation: location.pathname}}); 
        }
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollNext()
            const currentIndex = emblaApi.selectedScrollSnap();
            navigate(`/post/${postId}/photo/${currentIndex}`, {state: { previousLocation: location.pathname}}); 
        }
    }, [emblaApi])

    return (
        <div className='embla'>
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {images.map((item, index) => (
                        <div className="embla__slide" key={index}>
                            <img src={item} alt={`Slide ${index + 1}`} className="w-full h-full object-contain object-center" />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <Button className={twMerge(buttonStyles({variant: "blueghost", size: "icon"}), "embla__prev absolute left-5 top-72 bg-transparent text-neutral-300")} onClick={scrollPrev}>
                    <LuArrowLeft />
                </Button>
                <Button className={twMerge(buttonStyles({variant: "blueghost", size: "icon"}),"embla__next absolute right-5 top-72 bg-transparent text-neutral-300")} onClick={scrollNext}>
                    <LuArrowRight />
                </Button>
            </div>
        </div>
    )
}
