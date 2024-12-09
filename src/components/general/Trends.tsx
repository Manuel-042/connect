import TrendsList from "../../features/trends/components/TrendsList";
import trends from "../../data/trends.json"

const Trends = () => {
  return (
    <div className="rounded-2xl flex flex-col items-start border border-dark-border justify-start gap-3 py-3 mt-4">
        <h3 className="dark:text-white text-xl font-bold px-3">What's happening</h3>

        <div className="flex px-3 py-2 gap-2 cursor-pointer dark:hover:bg-black dark:hover:bg-opacity-10">
            <div className="rounded-2xl w-24 h-20">
                <img src="https://loremflickr.com/200/200?random=7" alt="" className="object-contain rounded-2xl w-full h-full"/>
            </div>
            <div>
                <p className="font-bold uppercase text-sm dark:text-white">WARFARE STREAMER SHOWDOWN</p>
                <p className="text-xs dark:text-dark-text">December 5, 2024</p>
            </div>
        </div>

        <TrendsList data={trends} limit={4} />

    </div>
  )
}

export default Trends