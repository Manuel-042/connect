import Button from "../../components/UI/Button";


const SearchRightContent = () => {
  
  return (
    <div className="w-2/5 px-9">
      <div className="rounded-md flex flex-col items-start border border-gray-700 justify-start gap-3 p-3 mt-4">
        <h3 className="dark:text-neutral-300 text-xl font-bold">Subscribe to Premium</h3>
        <p className="dark:text-neutral-300 text-sm">Subscribe to unlock new features and if <br/> eligible, receive a share of revenue.</p>
        <Button className="cursor-pointer font-bold text-sm">Subscribe</Button>
      </div>
    </div>
  );
}

export default SearchRightContent

