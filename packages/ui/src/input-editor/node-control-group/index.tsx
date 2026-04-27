'use client';

import { useState } from 'react';
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
  TrashIcon,
  RowsIcon,
  ColumnsIcon,
  ResetIcon,
  ReloadIcon,
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
      { name: 'Undo', command: 'undo', icon: ResetIcon },
      { name: 'Redo', command: 'redo', icon: ReloadIcon },
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

interface TableAction {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  action: (editor: Editor) => void;
  variant?: 'danger';
}

const TABLE_ACTIONS: TableAction[] = [
  {
    name: 'Add row before',
    icon: RowsIcon,
    action: (editor) => editor.chain().focus().addRowBefore().run(),
  },
  {
    name: 'Add row after',
    icon: RowsIcon,
    action: (editor) => editor.chain().focus().addRowAfter().run(),
  },
  {
    name: 'Delete row',
    icon: RowsIcon,
    action: (editor) => editor.chain().focus().deleteRow().run(),
    variant: 'danger',
  },
  {
    name: 'Add column before',
    icon: ColumnsIcon,
    action: (editor) => editor.chain().focus().addColumnBefore().run(),
  },
  {
    name: 'Add column after',
    icon: ColumnsIcon,
    action: (editor) => editor.chain().focus().addColumnAfter().run(),
  },
  {
    name: 'Delete column',
    icon: ColumnsIcon,
    action: (editor) => editor.chain().focus().deleteColumn().run(),
    variant: 'danger',
  },
  {
    name: 'Toggle header row',
    icon: RowsIcon,
    action: (editor) => editor.chain().focus().toggleHeaderRow().run(),
  },
  {
    name: 'Toggle header column',
    icon: ColumnsIcon,
    action: (editor) => editor.chain().focus().toggleHeaderColumn().run(),
  },
  {
    name: 'Delete table',
    icon: TrashIcon,
    action: (editor) => editor.chain().focus().deleteTable().run(),
    variant: 'danger',
  },
];

// Preset cell background colors
const CELL_BG_COLORS = [
  { name: 'None', value: '' },
  { name: 'Light Gray', value: '#f3f4f6' },
  { name: 'Light Red', value: '#fee2e2' },
  { name: 'Light Orange', value: '#ffedd5' },
  { name: 'Light Yellow', value: '#fef9c3' },
  { name: 'Light Green', value: '#dcfce7' },
  { name: 'Light Blue', value: '#dbeafe' },
  { name: 'Light Purple', value: '#f3e8ff' },
  { name: 'Light Pink', value: '#fce7f3' },
];

const PaintBucketIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.5 2C1.22386 2 1 2.22386 1 2.5V12.5C1 12.7761 1.22386 13 1.5 13H11.5C11.7761 13 12 12.7761 12 12.5V2.5C12 2.22386 11.7761 2 11.5 2H1.5ZM2 12V7.5H11V12H2ZM2 6.5V3H11V6.5H2Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

const NodeControlGroup = ({ editor }: NodeControlGroupProps) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  if (!editor) {
    return null;
  }

  const isInsideTable = editor.isActive('table');

  const handleCellBgColor = (color: string) => {
    if (color === '') {
      editor.chain().focus().setCellAttribute('backgroundColor', null).run();
    } else {
      editor.chain().focus().setCellAttribute('backgroundColor', color).run();
    }
    setShowColorPicker(false);
  };

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
        // If cursor is already inside a link, unlink it
        if (editor.isActive('link')) {
          editor.chain().focus().unsetLink().run();
          break;
        }

        const { from, to } = editor.state.selection;
        const hasSelection = from !== to;

        const url = window.prompt('Enter URL:');
        if (!url) break;

        if (hasSelection) {
          // Apply link to selected text, then move cursor past the link
          editor
            .chain()
            .focus()
            .setLink({ href: url })
            .setTextSelection(to)
            .unsetLink()
            .run();
        } else {
          // No selection: prompt for display text and insert a complete link node
          const text = window.prompt('Enter link text:', url);
          if (!text) break;

          editor
            .chain()
            .focus()
            .insertContent({
              type: 'text',
              text,
              marks: [{ type: 'link', attrs: { href: url } }],
            })
            .unsetLink()
            .run();
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
      case 'undo':
        editor.chain().focus().undo().run();
        break;
      case 'redo':
        editor.chain().focus().redo().run();
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
      <div className={styles['toolbar-row']}>
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

      {isInsideTable && (
        <div className={styles['table-controls']}>
          <span className={styles['table-controls-label']}>Table:</span>
          <div className={styles['toolbar-group']}>
            {TABLE_ACTIONS.map((tableAction) => {
              const IconComponent = tableAction.icon;
              return (
                <button
                  key={tableAction.name}
                  type="button"
                  className={`${styles['toolbar-button']} ${
                    tableAction.variant === 'danger'
                      ? styles['toolbar-button--danger']
                      : ''
                  }`}
                  onClick={() => tableAction.action(editor)}
                  title={tableAction.name}
                  aria-label={tableAction.name}
                >
                  <IconComponent className={styles['toolbar-button-icon']} />
                  <span className={styles['toolbar-button-label']}>
                    {tableAction.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className={styles['toolbar-divider']} />

          {/* Cell background color picker */}
          <div className={styles['color-picker-wrapper']}>
            <button
              type="button"
              className={`${styles['toolbar-button']} ${showColorPicker ? styles['toolbar-button--active'] : ''}`}
              onClick={() => setShowColorPicker(!showColorPicker)}
              title="Cell background color"
              aria-label="Cell background color"
            >
              <PaintBucketIcon className={styles['toolbar-button-icon']} />
              <span className={styles['toolbar-button-label']}>
                Cell color
              </span>
            </button>

            {showColorPicker && (
              <div className={styles['color-picker-popover']}>
                <div className={styles['color-picker-grid']}>
                  {CELL_BG_COLORS.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      className={styles['color-swatch']}
                      style={{
                        backgroundColor: color.value || 'transparent',
                      }}
                      onClick={() => handleCellBgColor(color.value)}
                      title={color.name}
                      aria-label={`Set cell background to ${color.name}`}
                    >
                      {color.value === '' && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.25 7.5L7.5 2.25L12.75 7.5L7.5 12.75L2.25 7.5Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <line
                            x1="2"
                            y1="13"
                            x2="13"
                            y2="2"
                            stroke="var(--color-error)"
                            strokeWidth="1.5"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NodeControlGroup;
