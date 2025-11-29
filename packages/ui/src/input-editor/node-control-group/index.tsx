'use client';

import { Editor } from '@tiptap/core';
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
  QuoteIcon,
  ListBulletIcon,
  ImageIcon,
  Link2Icon,
  DividerHorizontalIcon,
  TableIcon,
  PlusIcon,
} from '@radix-ui/react-icons';
import styles from './node-control-group.module.scss';

interface NodeControlGroupProps {
  editor: Editor | null;
}

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface ToolbarItem {
  name: string;
  command: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  options?: { level?: HeadingLevel };
}

const HeadingLevelIcon = ({
  level,
  ...props
}: { level: number } & React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.5 3.5V11.5H3.5V8.5H7.5V11.5H9.5V3.5H7.5V6.5H3.5V3.5H1.5Z"
      fill="currentColor"
      transform="translate(-1, 0)"
    />
    <text
      x="10"
      y="11.5"
      fontSize="9"
      fontWeight="bold"
      fill="currentColor"
      style={{ fontFamily: 'sans-serif' }}
    >
      {level}
    </text>
  </svg>
);

const TOOLBAR_GROUPS: { label: string; items: ToolbarItem[] }[] = [
  {
    label: 'Text Formatting',
    items: [
      {
        name: 'Heading 1',
        command: 'toggleHeading',
        options: { level: 1 },
        icon: (props) => <HeadingLevelIcon level={1} {...props} />,
      },
      {
        name: 'Heading 2',
        command: 'toggleHeading',
        options: { level: 2 },
        icon: (props) => <HeadingLevelIcon level={2} {...props} />,
      },
      {
        name: 'Heading 3',
        command: 'toggleHeading',
        options: { level: 3 },
        icon: (props) => <HeadingLevelIcon level={3} {...props} />,
      },
      {
        name: 'Heading 4',
        command: 'toggleHeading',
        options: { level: 4 },
        icon: (props) => <HeadingLevelIcon level={4} {...props} />,
      },
      {
        name: 'Heading 5',
        command: 'toggleHeading',
        options: { level: 5 },
        icon: (props) => <HeadingLevelIcon level={5} {...props} />,
      },
      {
        name: 'Heading 6',
        command: 'toggleHeading',
        options: { level: 6 },
        icon: (props) => <HeadingLevelIcon level={6} {...props} />,
      },
      { name: 'Bold', command: 'toggleBold', icon: FontBoldIcon },
      { name: 'Italic', command: 'toggleItalic', icon: FontItalicIcon },
      { name: 'Underline', command: 'toggleUnderline', icon: UnderlineIcon },
      {
        name: 'Strikethrough',
        command: 'toggleStrike',
        icon: StrikethroughIcon,
      },
    ],
  },
  {
    label: 'Lists & Structure',
    items: [
      {
        name: 'Bullet list',
        command: 'toggleBulletList',
        icon: ListBulletIcon,
      },
      {
        name: 'Ordered list',
        command: 'toggleOrderedList',
        icon: ListBulletIcon,
      },
      { name: 'Blockquote', command: 'toggleBlockquote', icon: QuoteIcon },
      { name: 'Code block', command: 'toggleCodeBlock', icon: CodeIcon },
    ],
  },
  {
    label: 'Media & Links',
    items: [
      { name: 'Link', command: 'setLink', icon: Link2Icon },
      { name: 'Image', command: 'setImage', icon: ImageIcon },
    ],
  },
  {
    label: 'Structure',
    items: [
      {
        name: 'Horizontal rule',
        command: 'setHorizontalRule',
        icon: DividerHorizontalIcon,
      },
      { name: 'Table', command: 'insertTable', icon: TableIcon },
    ],
  },
  {
    label: 'Add',
    items: [{ name: 'Add content', command: 'addContent', icon: PlusIcon }],
  },
] as const;

const NodeControlGroup = ({ editor }: NodeControlGroupProps) => {
  if (!editor) {
    return null;
  }

  const handleNodeClick = (item: ToolbarItem) => {
    if (!item.command) {
      return;
    }

    const { command, options } = item;

    switch (command) {
      case 'toggleBold':
        editor.chain().focus().toggleBold().run();
        break;
      case 'toggleItalic':
        editor.chain().focus().toggleItalic().run();
        break;
      case 'toggleUnderline':
        editor.chain().focus().toggleUnderline().run();
        break;
      case 'toggleStrike':
        editor.chain().focus().toggleStrike().run();
        break;
      case 'toggleBlockquote':
        editor.chain().focus().toggleBlockquote().run();
        break;
      case 'toggleBulletList':
        editor.chain().focus().toggleBulletList().run();
        break;
      case 'toggleCodeBlock':
        editor.chain().focus().toggleCodeBlock().run();
        break;
      case 'toggleHeading':
        editor
          .chain()
          .focus()
          .toggleHeading({ level: options?.level || 1 })
          .run();
        break;
      case 'setHorizontalRule':
        editor.chain().focus().setHorizontalRule().run();
        break;
      case 'setImage': {
        const url = window.prompt('Enter image URL:');
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
        break;
      }
      case 'setLink': {
        const url = window.prompt('Enter URL:');
        if (url) {
          editor.chain().focus().setLink({ href: url }).run();
        }
        break;
      }
      case 'toggleOrderedList':
        editor.chain().focus().toggleOrderedList().run();
        break;
      case 'insertTable':
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run();
        break;
      case 'addContent':
        break;
      default:
        break;
    }
  };

  const isActive = (item: ToolbarItem) => {
    const { command, options } = item;

    switch (command) {
      case 'toggleBold':
        return editor.isActive('bold');
      case 'toggleItalic':
        return editor.isActive('italic');
      case 'toggleUnderline':
        return editor.isActive('underline');
      case 'toggleStrike':
        return editor.isActive('strike');
      case 'toggleBlockquote':
        return editor.isActive('blockquote');
      case 'toggleBulletList':
        return editor.isActive('bulletList');
      case 'toggleCodeBlock':
        return editor.isActive('codeBlock');
      case 'toggleHeading':
        return editor.isActive('heading', { level: options?.level });
      case 'toggleOrderedList':
        return editor.isActive('orderedList');
      case 'setLink':
        return editor.isActive('link');
      default:
        return false;
    }
  };

  return (
    <div className={styles['toolbar']}>
      {TOOLBAR_GROUPS.map((group, groupIndex) => (
        <div key={group.label} className={styles['toolbar-group-wrapper']}>
          <div className={styles['toolbar-group']}>
            {group.items.map((item) => {
              const active = isActive(item);
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  type="button"
                  className={`${styles['toolbar-button']} ${active ? styles['toolbar-button--active'] : ''}`}
                  onClick={() => handleNodeClick(item)}
                  title={item.name}
                  aria-label={item.name}
                >
                  <IconComponent className={styles['toolbar-button-icon']} />
                </button>
              );
            })}
          </div>
          {groupIndex < TOOLBAR_GROUPS.length - 1 && (
            <div className={styles['toolbar-divider']} />
          )}
        </div>
      ))}
    </div>
  );
};

export default NodeControlGroup;
