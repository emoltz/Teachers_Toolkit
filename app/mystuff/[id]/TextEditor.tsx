import {Editor, EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'


interface Props {
    text: string;
}

export default function TextEditor({text}: Props) {
    const editor: Editor | null = useEditor({
        extensions: [
            StarterKit,
        ],
        content: text
    })

    return (
        <>
            {/*<Menubar>*/}
            {/*    <MenubarMenu>*/}
            {/*        <MenubarTrigger>File</MenubarTrigger>*/}
            {/*        <MenubarContent>*/}
            {/*            <MenubarItem>*/}
            {/*                New Tab <MenubarShortcut>⌘T</MenubarShortcut>*/}
            {/*            </MenubarItem>*/}
            {/*            <MenubarItem>New Window</MenubarItem>*/}
            {/*            <MenubarSeparator/>*/}
            {/*            <MenubarItem>Share</MenubarItem>*/}
            {/*            <MenubarSeparator/>*/}
            {/*            <MenubarItem>Print</MenubarItem>*/}
            {/*        </MenubarContent>*/}
            {/*    </MenubarMenu>*/}
            {/*</Menubar>*/}

            <EditorContent editor={editor}/>
        </>
    )
}