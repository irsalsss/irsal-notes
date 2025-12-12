'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import CodeBlock from '@tiptap/extension-code-block';
import HardBreak from '@tiptap/extension-hard-break';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image';
import Mention from '@tiptap/extension-mention';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Link from '@tiptap/extension-link';
import { TableKit } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Emoji from '@tiptap/extension-emoji';
import {
  Details,
  DetailsContent,
  DetailsSummary,
} from '@tiptap/extension-details';
import Mathematics from '@tiptap/extension-mathematics';
import Youtube from '@tiptap/extension-youtube';
import NodeControlGroup from './node-control-group';
import styles from './input-editor.module.scss';
import { useEffect, useState } from 'react';
import cx from 'clsx';

interface InputEditorProps {
  defaultValue?: string;
  onEditorChange: (content: string) => void;
  error?: string;
  containerClassName?: string;
}

const InputEditor = ({
  defaultValue,
  onEditorChange,
  error,
  containerClassName,
}: InputEditorProps) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue || '');

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: styles['editor'] || '',
      },
    },
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading.configure({
        HTMLAttributes: {
          class: styles['custom-heading'] || '',
        },
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Bold,
      Italic,
      Underline,
      Strike,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'link',
        },
      }),
      Blockquote,
      BulletList,
      OrderedList,
      ListItem,
      CodeBlock,
      HardBreak,
      HorizontalRule,
      Image,
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
      }),
      TableKit,
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Emoji,
      Details,
      DetailsSummary,
      DetailsContent,
      Mathematics,
      Youtube.configure({
        controls: true,
        nocookie: true,
      }),
    ],
    content: inputValue,
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();
      // const jsonContent = editor.getJSON();
      setInputValue(htmlContent);
      onEditorChange(htmlContent);
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && defaultValue !== undefined) {
      const currentContent = editor.getHTML();
      if (currentContent !== defaultValue) {
        editor.commands.setContent(defaultValue || '');
        setInputValue(defaultValue || '');
      }
    }
  }, [defaultValue, editor]);

  return (
    <div className={cx(styles['container'], containerClassName)}>
      <div
        className={cx(styles['editor-wrapper'], {
          [styles['has-error'] as string]: !!error,
        })}
      >
        <NodeControlGroup editor={editor} />
        <EditorContent editor={editor} />
      </div>
      {error && <span className={styles['error-message']}>{error}</span>}
    </div>
  );
};

export default InputEditor;
