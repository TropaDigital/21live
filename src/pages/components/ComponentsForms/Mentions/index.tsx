import Mention from '@tiptap/extension-mention'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'

import suggestion from './suggestion'
import { ContainerButtonsMentions, ContainerMentions } from './styles';
import ButtonDefault from '../../../../components/Buttons/ButtonDefault';
import { MenuBar } from './menuBar'

export { ContainerMentions, ContainerButtonsMentions } from './styles';

const Mentions = ({ setDescription, description }: any) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Mensagem …',
      }),
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        suggestion,
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true })
    ],
    content: description,

    // onUpdate: ({ editor }) => {
    //   const html = editor.getHTML();
    //   setDescription(html);
    // },
  })

  if (!editor) {
    return null
  }

  return (
    <ContainerMentions>
      <MenuBar editor={editor} />

      <EditorContent editor={editor} />
      <ButtonDefault onClick={() => setDescription(editor.getHTML())} style={{ marginTop: '20px' }}>
        Enviar
      </ButtonDefault>

    </ContainerMentions>
  )
}

export default Mentions