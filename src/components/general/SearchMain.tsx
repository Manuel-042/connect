import TrendsList from "./TrendsList"
import EmblaVideoCarousel from "../UI/VideoCarousel"
import videos from "../../data/videos.json"
import trends from "../../data/trends.json"
import RecommenderUserList from "./RecommenderUserList"


const SearchMain = () => {
    return (
        <div className="border-b border-gray-700">
            <div className="h-96">
                <img src="https://loremflickr.com/200/200?random=3" className="w-full h-full object-cover object-center" alt="search-ad" />
            </div>

            <div className="pb-3">
                <TrendsList data={trends} limit={3} variant="large" />
            </div>

            <section className="border-y border-gray-700 py-6 px-5">

                <div className="mb-3">
                    <h3 className="dark:text-neutral-300 text-opacity-20 text-xl font-bold mb-1">Videos for You</h3>
                    <p className="text-xs dark:text-gray-500 text-opacity-20">Check out these popular and trending videos for you</p>
                </div>

                <div className="pt-2">
                    <EmblaVideoCarousel videos={videos.videos} />
                </div>

            </section>

            <section className="pt-3">
                <TrendsList data={trends} limit={6} variant="large" />
            </section>

            <div className="rounded-md border-b border-gray-700 pt-2 pb-5 flex flex-col items-start justify-start gap-3 px-3">
                <h3 className="dark:text-neutral-300 text-xl font-bold px-3">Who to follow</h3>
                <RecommenderUserList limit={3} />
            </div>
        </div>
    )
}

export default SearchMain
