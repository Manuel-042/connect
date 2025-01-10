import { Editor, EditorContent } from '@tiptap/react';

interface TiptapEditorProps {
  editor: Editor | null;
}

const TiptapEditor = ({ editor }: TiptapEditorProps) => {
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
