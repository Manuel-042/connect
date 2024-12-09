

type Props = {
  query: string;
}

const ListsTab = ({ query }: Props) => {
  return (
    <div className="w-80 flex items-center transform translate-x-1/2 translate-y-1/2">
        <div>
            <h1 className="dark:text-white font-bold text-3xl mb-1">No results for "{query}"</h1>
            <p className="dark:text-dark-text text-sm">Try searching for something else, or check your Search settings to see if they’re protecting you from potentially sensitive content.</p>
        </div>
    </div>
  )
}

export default ListsTab