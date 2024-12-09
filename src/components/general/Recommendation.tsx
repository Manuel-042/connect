import RecommenderUserList from "../../components/general/RecommenderUserList";

const Recommendation = () => {
  return (
    <div className="rounded-2xl flex flex-col items-start border border-dark-border justify-start gap-3 py-3 mt-4">
        <h3 className="dark:text-white text-xl font-bold px-3">Who to follow</h3>
        <RecommenderUserList limit={3} />
    </div>
  )
}

export default Recommendation