import Button, { buttonStyles } from '../../../components/UI/Button'
import { twMerge } from 'tailwind-merge'
import { LuBoomBox, LuCalendarClock, LuFileImage, LuListChecks, LuMapPin, LuSmile } from 'react-icons/lu'
import TiptapEditor from "../../../components/general/TiptapEditor"
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGifContext } from '../../../context/gif-context'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { Theme } from 'emoji-picker-react';
import { useThemeContext } from '../../../context/theme-context'
import StarterKit from '@tiptap/starter-kit';
import Mention from '@tiptap/extension-mention';
import Placeholder from '@tiptap/extension-placeholder';
import useApiPrivate from '../../../hooks/useApiPrivate';
import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'
import MentionList from '../../../components/general/MentionList';
import { MentionUser, MediaItem } from '../../../types';
import debounce from "lodash/debounce"
import { useEditor } from '@tiptap/react';
import MediaCarousel from './MediaCarousel'
import PollCreator from './PollCreator'

interface SuggestionKeydownProps {
    event: KeyboardEvent;
}

const CreatePost = () => {
    const [postContent, setPostContent] = useState(false)
    const [showEmojis, setShowEmojis] = useState(false);
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [showPoll, setShowPoll] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()
    const { gifPreview } = useGifContext();
    const { theme } = useThemeContext();
    const apiPrivate = useApiPrivate();
    const pickerRef = useRef<HTMLDivElement>(null);

    const fetchMentions = debounce(async (query, resolve, reject) => {
        if (!query.trim()) {
            resolve([]);
            return;
        }

        try {
            const response = await apiPrivate.get<MentionUser[]>(`/api/users?query=${query}`);
            console.log({ "Response from mentions": response })
            resolve(response.data.slice(0, 5)); // Limit to 5 results
        } catch (error) {
            console.error('Error fetching mentions:', error);
            reject(error);
        }
    }, 50);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'What\'s happening...',
            }),
            Mention.configure({
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
                                    trigger: 'manual',
                                    placement: 'bottom-start',
                                });

                                popup = [tippyInstance];
                            },
                            onUpdate: (props) => {
                                const query = props.query || '';
                                if (query.trim() === '') return;
                                if (!props.clientRect) return;
                                component?.updateProps(props);
                                popup[0]?.setProps({
                                    getReferenceClientRect: props.clientRect,
                                });
                            },
                            onKeyDown: (props: SuggestionKeydownProps) => {
                                if (props.event.key === 'Escape') {
                                    popup[0].hide();
                                    return true;
                                }

                                const ref = component.ref as { onKeyDown: (props: SuggestionKeydownProps) => boolean };
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
            })
        ],
        content: '',
        onUpdate: ({ editor }) => {
            const isEmpty = editor.isEmpty;
            setPostContent(!isEmpty);
        }
    });

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log("File input changed");

        const files = e.target.files;

        if (files) {
            const fileArray = Array.from(files);
            const newMediaItems = fileArray.map(file => ({
                url: URL.createObjectURL(file),
                width: 0,
                height: 0,
                type: "image" as const
            }));

            setMediaItems(prev => {
                const combined = [...prev, ...newMediaItems];
                return combined.slice(0, 4);
            });
        }
    }

    const handleShowGIFs = () => {
        navigate('/i/foundMedia/search', {
            state: { previousLocation: location.pathname }
        });
    }

    useEffect(() => {
        if (gifPreview) {
            setMediaItems(prev => {
                if (prev.length >= 4) return prev;
                return [...prev, { ...gifPreview, type: "gif" }];
            });
        }
    }, [gifPreview]);

    const onRemoveMedia = (index: number) => {
        setMediaItems(prev => prev.filter((_, i) => i !== index));
    };

    const onEmojiClick = ({ emoji }: EmojiClickData) => {
        console.log(emoji)
        editor?.commands.insertContent(emoji)
    };

    const handleShowEmojis = () => {
        setShowEmojis(!showEmojis)
    }

    const handleShowPoll = () => {
        setShowPoll(true);
    };

    const handleClosePoll = () => {
        setShowPoll(false);
    };



    return (
        <div className="grow max-w-90">
            <div className="max-w-100">
                <TiptapEditor editor={editor} />

                {mediaItems.length > 0 && (
                    <MediaCarousel
                        mediaItems={mediaItems}
                        onRemove={onRemoveMedia}
                    />
                )}

                {showPoll && <PollCreator onClose={handleClosePoll} />}

                <div className="relative flex items-center justify-between mt-2 border-t pt-2 border-dark-border">
                    <div className="flex items-center justify-center text-xl text-blue-700">
                        <input type="file" onChange={handleFileSelected} className="hidden" id="ImageUpload" accept="image/jpg, image/jpeg, image/png, image/webp" multiple />
                        <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent")}> <label htmlFor="ImageUpload" className="cursor-pointer"><LuFileImage /></label> </Button>
                        <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent")} onClick={handleShowGIFs}><LuBoomBox /></Button>
                        <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent hidden mlg:block", showPoll && "text-blue-500")} onClick={handleShowPoll} disabled={showPoll}><LuListChecks /></Button>
                        <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent")} onClick={handleShowEmojis}><LuSmile /></Button>
                        <Button className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-pointer bg-transparent hidden mlg:block")}><LuCalendarClock /></Button>
                        <Button disabled className={twMerge(buttonStyles({ variant: "blueghost", size: "icon" }), "cursor-not-allowed bg-transparent opacity-50")}><LuMapPin /></Button>
                    </div>
                    <Button className={`py-2 ${postContent ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`} disabled={!postContent}>Post</Button>

                    {showEmojis && <div ref={pickerRef} className={`absolute top-12 left-3 z-30`}>
                        <EmojiPicker height={400} width={300} onEmojiClick={onEmojiClick} theme={theme as Theme} />
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default CreatePost