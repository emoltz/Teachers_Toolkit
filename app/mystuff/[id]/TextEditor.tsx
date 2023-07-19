import {Editor, EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// TODO add menu bar?
// TODO ai autocomplete?

interface Props {
    text: string;
    onTextChange: (newText: string) => void;
}

export default function TextEditor({text, onTextChange}: Props) {
    const editor: Editor | null = useEditor({
        extensions: [
            StarterKit,
        ],
        content: text,
        onUpdate: () => {
            if (editor) {
                const newText = editor.getText();
                onTextChange(newText);
            }
        }
    })

    return (
        <>


            <EditorContent editor={editor}/>
        </>
    )
}