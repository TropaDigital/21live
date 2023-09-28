import React, { useEffect } from 'react';
import Mention from '@tiptap/extension-mention';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import { ReactRenderer } from '@tiptap/react';
import Link from '@tiptap/extension-link';
// import MentionList from './mentionList'
import tippy from 'tippy.js';
import MentionList from './Mentions/mentionList';
import { ContainerMentions } from './Mentions/styles';
import { MenuBar } from './Mentions/menuBar';

// import { MenuBar } from './menuBar'
// import { ContainerMentions } from './styles'

interface Props {
  handleOnDescription: (value: any) => any;
  value: any;
  mentionData: any;
}

const WrapperEditor = ({ handleOnDescription, value, mentionData }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Mensagem …'
      }),
      Mention.configure({
        HTMLAttributes: {
          class: 'mention'
        },
        suggestion: {
          items: ({ query }: any) => {
            return mentionData
              .filter((item: any) => item.label.toLowerCase().startsWith(query.toLowerCase()))
              .slice(0, 10);
          },
          render: () => {
            let component: any;
            let popup: any;

            return {
              onStart: (props: any) => {
                component = new ReactRenderer(MentionList, {
                  props,
                  editor: props.editor
                });

                if (!props.clientRect) {
                  return;
                }

                popup = tippy('body', {
                  getReferenceClientRect: props.clientRect,
                  appendTo: () => document.body,
                  content: component.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: 'manual',
                  placement: 'bottom-start'
                });
              },

              onUpdate(props: any) {
                component.updateProps(props);

                if (!props.clientRect) {
                  return;
                }

                popup[0].setProps({
                  getReferenceClientRect: props.clientRect
                });
              },

              onKeyDown(props: any) {
                if (props.event.key === 'Escape') {
                  popup[0].hide();

                  return true;
                }

                return component.ref?.onKeyDown(props);
              },

              onExit() {
                popup[0].destroy();
                component.destroy();
              }
            };
          }
        }
      }),
      Link.configure({
        openOnClick: false
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true })
    ],
    content: value,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      handleOnDescription(html);
    }
  });

  useEffect(() => {
    if (!editor) return;

    function handleContent(): void {
      if (editor?.isEmpty) {
        editor.commands.setContent(value);
      }
    }

    handleContent();
  }, [value]);

  // if (!editor) {
  //   return null;
  // }

  return (
    <ContainerMentions>
      <MenuBar editor={editor} />

      <EditorContent editor={editor} />
      {/* <ButtonDefault onClick={() => setDescription(editor.getHTML())} style={{ marginTop: '20px' }}>
        Enviar
      </ButtonDefault> */}
    </ContainerMentions>
  );
};

export default WrapperEditor;
