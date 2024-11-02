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
    const filteredUsers = show_creator ? users.filter(user => user.isCreator === true) : users;
    const more = filteredUsers.length > limit;
  
  return (
    <div className="w-full flex flex-col gap-3 relative">
      {filteredUsers.slice(0, limit).map((user, index) => (
        <RecommendedUser
          key={index}
          image={user.image}
          displayname={user.displayname}
          username={user.username}
          bio={user.bio}
          followerCount={user.followerCount}
          followingCount={user.followingCount}
          variant={variant}
          showBio={showBio}
          show_creator={show_creator}
          isVerified={user.isVerified}
        />
      ))}
      {more && <div className="px-3"><p><Link to="/i/connect_people" className="text-secondary-100">Show more</Link></p></div>}
    </div>
  );
}

export default RecommenderUserList;
