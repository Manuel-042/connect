import {
  Mention,
  MentionOptions,
} from "@tiptap/extension-mention";

// interface CustomMentionNodeAttrs extends MentionNodeAttrs {
//   username: string;
//   profile_username: string;
//   avatar: string;
//   is_following: boolean;
//   is_follower: boolean;
// }

export const CustomMention = Mention.extend<MentionOptions>({
    addAttributes() {
      return {
        id: {
          default: null,
        }
      };
    },
  
    renderHTML({ node, HTMLAttributes }) {
      console.log("Mention node attributes:", node.attrs); // ✅ Log what is actually saved
  
      return [
        "a",
        {
          ...HTMLAttributes,
          class: "mention",
          href: `/${node.attrs.id || ""}`
        },
        `@${node.attrs.id || ""}`,
      ];
    },
  });
  