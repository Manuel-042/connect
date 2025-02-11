import RecommendedUser from "./RecommendedUser";
import users from "../../data/users.json"
import { Link } from "react-router-dom";


type RecommenderUserListProps = {
  limit: number;
  variant?: "default" | "large"; 
  showBio?: boolean;
  show_creator?: boolean;
}

function RecommenderUserList({limit, variant = "default", showBio, show_creator}: RecommenderUserListProps) {
    const filteredUsers = show_creator ? users.filter(user => user.is_creator === true) : users;
    const more = filteredUsers.length > limit;
  
  return (
    <div className="w-full flex flex-col relative">
      {filteredUsers.slice(0, limit).map((user, index) => (
        <RecommendedUser
          key={index}
          avatar={user.avatar}
          user={user.user}
          username={user.username}
          bio={user.bio}
          follower_count={user.follower_count}
          following_count={user.following_count}
          variant={variant}
          showBio={showBio}
          show_creator={show_creator}
          is_verified={user.is_verified}
        />
      ))}
      {more && <div className="px-3 py-3 text-sm font-semibold hover:bg-gray-500 hover:bg-opacity-20 "><p><Link to="/i/connect_people" className="text-secondary-100">Show more</Link></p></div>}
    </div>
  );
}

export default RecommenderUserList;
