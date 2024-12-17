import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Mention from '@tiptap/extension-mention';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect, useState } from 'react';

const TiptapEditor = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/users`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'What\'s happening...', 
      }),
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        suggestion: {
          char: '@', 
          items: ({ query }) => {
            return users.filter((user) =>
              user.username.toLowerCase().startsWith(query.toLowerCase())
            );
          },
          render: () => {
            let component;

            return {
              onStart: (props) => {
                component = document.createElement('div');
                component.classList.add('suggestion-container');
                document.body.appendChild(component);
              },
              onUpdate: (props) => {
                component.innerHTML = props.items
                  .map(
                    (item) =>
                      `<div class="suggestion-item" data-username="${item.username}">
                        ${item.username}
                      </div>`
                  )
                  .join('');
              },
              onKeyDown: (props) => {
                if (props.event.key === 'Enter') {
                  props.command(props.items[0]);
                  return true;
                }
                return false;
              },
              onExit: () => {
                component && component.remove();
              },
            };
          },
        },
      }),
      Mention.configure({
        HTMLAttributes: {
          class: 'hashtag',
        },
        suggestion: {
          char: '#', 
          items: ({ query }) => {
            return users.filter((user) =>
              user.username.toLowerCase().startsWith(query.toLowerCase())
            );
          },
          render: () => {
            let component;

            return {
              onStart: (props) => {
                component = document.createElement('div');
                component.classList.add('suggestion-container');
                document.body.appendChild(component);
              },
              onUpdate: (props) => {
                component.innerHTML = props.items
                  .map(
                    (item) =>
                      `<div class="suggestion-item" data-username="${item.username}">
                        ${item.username}
                      </div>`
                  )
                  .join('');
              },
              onKeyDown: (props) => {
                if (props.event.key === 'Enter') {
                  props.command(props.items[0]);
                  return true;
                }
                return false;
              },
              onExit: () => {
                component && component.remove();
              },
            };
          },
        },
      }),
    ],
    content: '',
  });

  return (
    <div className='ms-3'>
      {editor ? (
        <EditorContent editor={editor} className="dark:text-white text-lg" />
      ) : (
        <p>Loading editor...</p>
      )}
    </div>
  );
};

export default TiptapEditor;
