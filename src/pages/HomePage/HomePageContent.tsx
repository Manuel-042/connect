import { LuFileImage, LuBoomBox, LuSmile, LuCalendarClock, LuMapPin, LuListChecks } from "react-icons/lu";
import Button, { buttonStyles } from "../../components/UI/Button";
import { twMerge } from "tailwind-merge";
import { useRef, useState } from "react";
import Posts from "../../components/general/Posts";
import postsData from "../../data/posts.json"
import useAutosizeTextArea from "../../hooks/useAutoSizeTextArea";

const HomePageContent = () => {
  const [postContent, setPostContent] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, postContent);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;
    setPostContent(val);
  };


  return (
    <div className="w-4/5 border-r border-gray-700">
      <div className="flex border-b bg-black z-20 items-center justify-between border-gray-700 [&>div]:w-3/6 h-12 [&>div]:cursor-pointer [&>div]:dark:text-neutral-300 [&>div]:h-full [&>div:hover]:bg-dark-hover sticky top-0">
        <div className="flex items-center justify-center">For you</div>
        <div className="flex items-center justify-center">Following</div>
      </div>

      <div className="post flex self-start w-full px-3 py-5 gap-2 border-b border-gray-700">
        <div className="rounded-full w-10 h-10 bg-neutral-300 flex items-center justify-center cursor-pointer w-30">
          <img src="https://loremflickr.com/200/200?random=5" className="rounded-full w-full h-full object-contain object-center" alt="profile image" />
        </div>
        <div className="grow w-90">
          <form className="w-100">
            <textarea
              name="postContent"
              value={postContent}
              placeholder="What is happening?!"
              className="noscrollbar px-2 pt-1 pb-4 overflow-auto bg-transparent text-xl w-full border-0 outline-0 resize-none dark:text-neutral-300"
              onChange={handleChange}
              ref={textAreaRef}
              rows={1}
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center justify-center text-xl text-blue-700">
                <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent")}><LuFileImage  /></Button>
                <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent")}><LuBoomBox /></Button>
                <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent")}><LuListChecks /></Button>
                <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent")}><LuSmile  /></Button>
                <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent")}><LuCalendarClock /></Button>
                <Button disabled className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-not-allowed bg-transparent")}><LuMapPin /></Button>
              </div>
              <Button className={postContent ? "cursor-pointer" : "cursor-not-allowed opacity-50"} disabled={!postContent}>Post</Button>
            </div>
          </form>
        </div>
      </div>

      <div className="border-b border-gray-700 flex items-center justify-center h-14 cursor-pointer hover:bg-gray-500 hover:bg-opacity-10">
        <p className="text-primary">Show <span className="post-counter">490</span> posts</p>
      </div>

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
    </div>
  );
}

export default HomePageContent
