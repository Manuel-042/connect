import TrendsList from "../../trends/components/TrendsList"
import EmblaVideoCarousel from "../../../components/UI/VideoCarousel"
import videos from "../../../data/videos.json"
import trends from "../../../data/trends.json"
import RecommenderUserList from "../../../components/general/RecommenderUserList"


const SearchMain = () => {
    return (
        <div className="border-b border-gray-700">
            <div className="h-44 md:h-96 relative">
                <div className="absolute flex top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)]">
                    <div className="self-end ps-4 pb-4">
                        <p className="text-2xl dark:text-white font-extrabold">The Offseason</p>
                        <p className="text-xs uppercase font-semibold dark:text-white">LIVE</p>
                    </div>
                </div>
                <img src="https://loremflickr.com/200/200?random=3" className="w-full h-full object-cover object-center" alt="search-ad" />
            </div>

            
            <div className="pb-3">
                <TrendsList data={trends} limit={3}  />
            </div>

            <section className="border-y border-dark-border py-6 px-5">

                <div className="mb-3">
                    <h3 className="dark:text-white text-opacity-20 text-xl font-bold mb-1">Videos for You</h3>
                    <p className="text-xs dark:text-gray-500 text-opacity-20">Check out these popular and trending videos for you</p>
                </div>

                <div className="pt-2">
                    <EmblaVideoCarousel videos={videos.videos} />
                </div>

            </section>

            <section className="pt-3">
                <TrendsList data={trends} limit={6} />
            </section>

            <div className="rounded-md border-b border-dark-border pt-2 pb-5 flex flex-col items-start justify-start gap-3">
                <h3 className="dark:text-white text-xl font-bold px-3">Who to follow</h3>
                <RecommenderUserList limit={3} />
            </div>
        </div>
    )
}

export default SearchMain
