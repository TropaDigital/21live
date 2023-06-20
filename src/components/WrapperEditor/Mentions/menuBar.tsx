import { useCallback } from 'react';
import { BiColorFill, BiFontColor, BiStrikethrough } from 'react-icons/bi';

import {
  IconBlockquote,
  IconBold,
  IconBulletCircle,
  IconBulletList,
  IconItalic,
  IconLink,
  IconSubTitle,
  IconTitle
} from '../../../assets/icons';

import { ButtonBar, ContainerButtonsMentions } from './styles';

const MenuBar = ({ editor }: any) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <ContainerButtonsMentions>
      <ButtonBar
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <IconBold />
      </ButtonBar>
      <ButtonBar
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <IconItalic />
      </ButtonBar>
      <ButtonBar
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <BiStrikethrough color="#667085" size={22} />
      </ButtonBar>
      {/* <ButtonBar type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        code
      </ButtonBar>
      <ButtonBar type="button" onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </ButtonBar>
      <ButtonBar type="button" onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </ButtonBar> */}
      {/* <ButtonBar type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        paragraph
      </ButtonBar> */}
      <ButtonBar
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        <IconTitle />
      </ButtonBar>
      <ButtonBar
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        <IconSubTitle />
      </ButtonBar>

      <ButtonBar
        type="button"
        onClick={setLink}
        className={editor.isActive('link') ? 'is-active' : ''}
      >
        <IconLink />
      </ButtonBar>
      {/* <ButtonBar type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        h3
      </ButtonBar>
      <ButtonBar type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        h4
      </ButtonBar>
      <ButtonBar type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        h5
      </ButtonBar>
      <ButtonBar type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        h6
      </ButtonBar>
      <ButtonBar type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </ButtonBar>
      <ButtonBar type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </ButtonBar>
      <ButtonBar type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        code block
      </ButtonBar> */}
      <ButtonBar
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <IconBlockquote />
      </ButtonBar>
      <ButtonBar
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <IconBulletCircle />
      </ButtonBar>
      <ButtonBar
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <IconBulletList />
      </ButtonBar>

      <div className="butonBarColor">
        <BiFontColor color="#667085" size={24} />

        <input
          type="color"
          onInput={(event: any) => editor.chain().focus().setColor(event.target.value).run()}
          value={editor.getAttributes('textStyle').color}
        />
      </div>

      <div className="butonBarColor">
        <BiColorFill color="#667085" size={24} />
        <input
          type="color"
          onInput={(event: any) =>
            editor.chain().focus().setHighlight({ color: event.target.value }).run()
          }
          value={editor.getAttributes('highlight').color}
        />
      </div>

      {/* <ButtonBar onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </ButtonBar>
      <ButtonBar onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </ButtonBar>
      <ButtonBar
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        undo
      </ButtonBar>
      <ButtonBar
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        redo
      </ButtonBar> */}
    </ContainerButtonsMentions>
  );
};

export { MenuBar };
