import { Posts } from "../../post/index";
import postsData from "../../../data/posts.json"

const ForYou = () => {
  //const { data: postData, isLoading, isError } = useFetchPosts()
  console.log("data gotthen bfrom DB")

  return (
    <section className="posts">
        {postsData.posts.map((post, index) => (
        <Posts
            key={index} 
            postId={post.postId} 
            userId={post.userId}
            postContent={post.postContent}
            datePosted={post.datePosted}
            images={post.images} 
            metrics={post.metrics} 
        />
        ))}
  </section>
  )
}

export default ForYou