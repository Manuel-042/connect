import RecommenderUserList from "../../components/general/RecommenderUserList";


const SearchRightContent = () => {
  
  return (
    <div className="w-2/5 px-9">
      
      <div className="rounded-2xl flex sticky top-5 flex-col items-start border border-gray-700 justify-start gap-3 py-3 mt-4">
        <h3 className="dark:text-neutral-300 text-xl font-bold px-3">Who to follow</h3>

        <RecommenderUserList limit={3} />

      </div>
    </div>
  );
}

export default SearchRightContent

