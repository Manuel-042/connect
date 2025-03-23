import { Posts } from "../../post/index";
import { usePosts } from "../../../hooks/useFetchPosts";
import { useToast } from "../../../hooks/useToast";
import { Oval } from "react-loader-spinner";
import type { Posts as PostType } from "../../../types";

const ForYou = () => {
  const { data: postData, error, isLoading, isError } = usePosts();
  const { toast } = useToast();

  console.log({"POSTDATA": postData});

  if (isError) {
    toast.error(error.message);
  }

  return (
    <section className="posts">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Oval
            visible={true}
            height={60}
            width={60}
            color="#ffffff"
            ariaLabel="oval-loading"
          />
        </div>
      ) : postData?.length > 0 ? (
        postData.map((post: PostType, index: number) => (
          <Posts
            key={index}
            id={post.id}
            user={post.user}
            content={post.content}
            created_at={post.created_at}
            has_media={post.has_media}
            media={post.media}
            metrics={post.metrics}
          />
        ))
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-dark-text text-lg">No posts available. Check back later!</p>
        </div>
      )}
    </section>
  );
};

export default ForYou;
