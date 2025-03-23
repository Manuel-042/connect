import Button, { buttonStyles } from "../../../components/UI/Button";
import { twMerge } from "tailwind-merge";
import {
  LuBoomBox,
  LuCalendarClock,
  LuFileImage,
  LuListChecks,
  LuMapPin,
  LuSmile,
} from "react-icons/lu";
import TiptapEditor from "../../../components/general/TiptapEditor";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGifContext } from "../../../context/gif-context";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import { useThemeContext } from "../../../context/theme-context";
import StarterKit from "@tiptap/starter-kit";
import { CustomMention } from "../../../components/general/CustomMention";
import Placeholder from "@tiptap/extension-placeholder";
import useApiPrivate from "../../../hooks/useApiPrivate";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import MentionList from "../../../components/general/MentionList";
import {
  MentionUser,
  MediaItem,
  PollChoice,
  PollLength,
  CreatePostData,
} from "../../../types";
import debounce from "lodash/debounce";
import { useEditor } from "@tiptap/react";
import MediaCarousel from "./MediaCarousel";
import PollCreator from "./PollCreator";
import { v4 as uuidv4 } from "uuid";
import { useCreatePost } from "../../../hooks/useCreatePost";
import { Oval } from "react-loader-spinner";
import { toast } from "sonner";

interface SuggestionKeydownProps {
  event: KeyboardEvent;
}

const CreatePost = () => {
  const [postContent, setPostContent] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [showPoll, setShowPoll] = useState(false);
  const [postType, setPostType] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { gifPreview, setGifPreview } = useGifContext();
  const { theme } = useThemeContext();
  const apiPrivate = useApiPrivate();
  const pickerRef = useRef<HTMLDivElement>(null);
  const { mutate, isPending, error: PostCreationError } = useCreatePost();

  const [choices, setChoices] = useState<PollChoice[]>([
    { text: "", id: uuidv4() },
    { text: "", id: uuidv4() },
  ]);

  const [pollLength, setPollLength] = useState<PollLength>({
    days: 1,
    hours: 0,
    minutes: 0,
  });

  if (PostCreationError) {
    toast.error(PostCreationError.message);
  }

  const fetchMentions = debounce(async (query, resolve, reject) => {
    if (!query.trim()) {
      resolve([]);
      return;
    }

    try {
      const response = await apiPrivate.get<MentionUser[]>(
        `/api/users?query=${query}`
      );
      console.log(response.data);
      resolve(response.data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching mentions:", error);
      reject(error);
    }
  }, 10);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "What's happening...",
      }),
      CustomMention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion: {
          char: "@",
          items: async ({ query }) => {
            return new Promise((resolve, reject) => {
              fetchMentions(query, resolve, reject);
            });
          },
          command: ({ editor, range, props }) => {
            editor
              .chain()
              .focus()
              .insertContentAt(range, [
                {
                  type: "mention",
                  attrs: {
                    id: props.id
                  },
                },
                { type: "text", text: " " },
              ])
              .run();
          },
          render: () => {
            let component: ReactRenderer;
            let popup: any;

            return {
              onStart: (props) => {
                component = new ReactRenderer(MentionList, {
                  props,
                  editor: props.editor,
                });

                if (!props.clientRect) return;

                const tippyInstance = tippy(document.body as HTMLElement, {
                  getReferenceClientRect: () => {
                    return props.clientRect?.() || new DOMRect();
                  },
                  appendTo: () => document.body,
                  content: component.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: "manual",
                  placement: "bottom-start",
                });

                popup = [tippyInstance];
              },
              onUpdate: (props) => {
                const query = props.query || "";
                if (query.trim() === "") return;
                if (!props.clientRect) return;
                component?.updateProps(props);
                popup[0]?.setProps({
                  getReferenceClientRect: props.clientRect,
                });
              },
              onKeyDown: (props: SuggestionKeydownProps) => {
                if (props.event.key === "Escape") {
                  popup[0].hide();
                  return true;
                }

                const ref = component.ref as {
                  onKeyDown: (props: SuggestionKeydownProps) => boolean;
                };
                if (!ref) return false;
                return ref.onKeyDown(props);
              },
              onExit: () => {
                popup[0].destroy();
                component.destroy();
              },
            };
          },
        },
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      const isEmpty = editor.isEmpty;
      setPostType("text");
      setPostContent(!isEmpty);
    },
  });

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("File input changed");
    setPostType("media");

    const files = e.target.files;

    if (files) {
      const fileArray = Array.from(files);

      const newMediaItems = fileArray.map((file) => {
        const fileType = file.type.startsWith("image/")
          ? "image"
          : file.type.startsWith("video/")
            ? "video"
            : "unknown";

        return {
          url: URL.createObjectURL(file),
          file: file,
          width: 0,
          height: 0,
          type: fileType as "image" | "video",
        };
      });

      setMediaItems((prev) => {
        const combined = [...prev, ...newMediaItems];
        return combined.slice(0, 4);
      });
    }
  };

  // useEffect(() => {
  //     return () => {
  //         mediaItems.forEach(item => URL.revokeObjectURL(item.url));
  //     };
  // }, [mediaItems]);

  const handleShowGIFs = () => {
    navigate("/i/foundMedia/search", {
      state: { previousLocation: location.pathname },
    });
  };

  useEffect(() => {
    if (gifPreview) {
      setPostType("media");
      setMediaItems((prev) => {
        if (prev.length >= 4) return prev;
        return [...prev, { ...gifPreview, type: "gif" }];
      });
    }
  }, [gifPreview]);

  const onRemoveMedia = (index: number) => {
    setPostType("text");
    setMediaItems((prev) => prev.filter((_, i) => i !== index));
    setGifPreview(null);
  };

  const onEmojiClick = ({ emoji }: EmojiClickData) => {
    console.log(emoji);
    editor?.commands.insertContent(emoji);
  };

  const handleShowEmojis = () => {
    setShowEmojis(!showEmojis);
  };

  const handleShowPoll = () => {
    setPostType("poll");
    setShowPoll(true);
  };

  const handleClosePoll = () => {
    setShowPoll(false);
  };

  const handleSubmitPosts = () => {
    //const contentJSON = editor?.getJSON();
    const contentHTML = editor?.getHTML();

    const postData: CreatePostData = {
      content: contentHTML,
    };

    console.log(postType);

    if (postType === "media") {
      const mediaData = mediaItems.map((media, index) => ({
        url: media.url,
        type: media.type,
        file: media?.file || null,
        position: index + 1,
      }));
      postData["media"] = mediaData;
    } else if (postType === "poll") {
      postData["poll"] = {
        choices: choices.filter((choice) => choice.text.trim()),
        length: {
          days: pollLength.days ?? 0,
          hours: pollLength.hours ?? 0,
          minutes: pollLength.minutes ?? 0,
        },
      };
    }

    const formData = new FormData();

    Object.entries(postData).forEach(([key, value]) => {
      if (key === "media" && Array.isArray(value)) {
        (value as CreatePostData["media"])?.forEach((media, index) => {
          formData.append(`media_file_${index}`, media.file ?? "");
          formData.append(`media_type_${index}`, media.type);
          formData.append(`media_url_${index}`, media.url);
          formData.append(`media_position_${index}`, String(media.position));
        });
      } else if (key === "poll") {
        const pollData = value as CreatePostData["poll"];

        if (pollData?.length) {
          formData.append("poll[length][days]", String(pollData.length.days));
          formData.append("poll[length][hours]", String(pollData.length.hours));
          formData.append(
            "poll[length][minutes]",
            String(pollData.length.minutes)
          );
        }

        if (pollData?.choices) {
          pollData.choices.forEach((choice, index) => {
            formData.append(`poll_choices_${index}`, choice.text);
          });
        }
      } else {
        formData.append(key, String(value));
      }
    });

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    mutate(formData);

    // Clear content
    editor?.commands.clearContent();
    setChoices([
      { text: "", id: uuidv4() },
      { text: "", id: uuidv4() },
    ]);
    setPollLength({
      days: 1,
      hours: 0,
      minutes: 0,
    });
    setShowPoll(false);
    setMediaItems([]);
    setGifPreview(null);
  };

  return (
    <div className="grow max-w-90">
      <div className="max-w-100">
        <TiptapEditor editor={editor} />

        {mediaItems.length > 0 && (
          <MediaCarousel mediaItems={mediaItems} onRemove={onRemoveMedia} />
        )}

        {showPoll && (
          <PollCreator
            onClose={handleClosePoll}
            choices={choices}
            setChoices={setChoices}
            pollLength={pollLength}
            setPollLength={setPollLength}
          />
        )}

        <div className="relative flex items-center justify-between mt-2 border-t pt-2 border-dark-border">
          <div className="flex items-center justify-center text-xl text-blue-700">
            <input
              type="file"
              onChange={handleFileSelected}
              className="hidden"
              id="ImageUpload"
              accept="image/jpg, image/jpeg, image/png, image/webp, video/mp4, video/x-m4v, video/*"
              multiple
            />

            <Button
              className={twMerge(
                buttonStyles({ variant: "blueghost", size: "icon" }),
                "cursor-pointer bg-transparent"
              )}
            >
              {" "}
              <label htmlFor="ImageUpload" className="cursor-pointer">
                <LuFileImage />
              </label>{" "}
            </Button>
            <Button
              className={twMerge(
                buttonStyles({ variant: "blueghost", size: "icon" }),
                "cursor-pointer bg-transparent"
              )}
              onClick={handleShowGIFs}
            >
              <LuBoomBox />
            </Button>
            <Button
              className={twMerge(
                buttonStyles({ variant: "blueghost", size: "icon" }),
                "cursor-pointer bg-transparent hidden mlg:block",
                showPoll && "text-blue-500"
              )}
              onClick={handleShowPoll}
              disabled={showPoll}
            >
              <LuListChecks />
            </Button>
            <Button
              className={twMerge(
                buttonStyles({ variant: "blueghost", size: "icon" }),
                "cursor-pointer bg-transparent"
              )}
              onClick={handleShowEmojis}
            >
              <LuSmile />
            </Button>
            <Button
              className={twMerge(
                buttonStyles({ variant: "blueghost", size: "icon" }),
                "cursor-pointer bg-transparent hidden mlg:block"
              )}
            >
              <LuCalendarClock />
            </Button>
            <Button
              disabled
              className={twMerge(
                buttonStyles({ variant: "blueghost", size: "icon" }),
                "cursor-not-allowed bg-transparent opacity-50"
              )}
            >
              <LuMapPin />
            </Button>
          </div>
          <Button
            className={`py-2 ${postContent ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
            disabled={!postContent && isPending}
            onClick={handleSubmitPosts}
          >
            {isPending ? (
              <Oval
                visible={true}
                height="20"
                width="20"
                color="#ffffff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass="px-4"
              />
            ) : (
              "Post"
            )}
          </Button>

          {showEmojis && (
            <div ref={pickerRef} className={`absolute top-12 left-3 z-30`}>
              <EmojiPicker
                height={400}
                width={300}
                onEmojiClick={onEmojiClick}
                theme={theme as Theme}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
