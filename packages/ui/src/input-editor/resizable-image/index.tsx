'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import styles from './resizable-image.module.scss';

const ResizableImageView = ({
  node,
  updateAttributes,
  selected,
  deleteNode,
}: NodeViewProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const startPos = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const { src, alt, title, width, height } = node.attrs;

  const handleResizeStart = useCallback(
    (e: React.MouseEvent, direction: string) => {
      e.preventDefault();
      e.stopPropagation();

      const img = imgRef.current;
      if (!img) return;

      setIsResizing(true);
      setResizeDirection(direction);
      startPos.current = {
        x: e.clientX,
        y: e.clientY,
        width: img.offsetWidth,
        height: img.offsetHeight,
      };
    },
    [],
  );

  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !resizeDirection) return;

      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;

      let newWidth = startPos.current.width;
      let newHeight = startPos.current.height;
      const aspectRatio = startPos.current.width / startPos.current.height;

      switch (resizeDirection) {
        case 'se':
          newWidth = Math.max(100, startPos.current.width + dx);
          newHeight = newWidth / aspectRatio;
          break;
        case 'sw':
          newWidth = Math.max(100, startPos.current.width - dx);
          newHeight = newWidth / aspectRatio;
          break;
        case 'ne':
          newWidth = Math.max(100, startPos.current.width + dx);
          newHeight = newWidth / aspectRatio;
          break;
        case 'nw':
          newWidth = Math.max(100, startPos.current.width - dx);
          newHeight = newWidth / aspectRatio;
          break;
        case 'e':
          newWidth = Math.max(100, startPos.current.width + dx);
          newHeight = newWidth / aspectRatio;
          break;
        case 'w':
          newWidth = Math.max(100, startPos.current.width - dx);
          newHeight = newWidth / aspectRatio;
          break;
        case 's':
          newHeight = Math.max(50, startPos.current.height + dy);
          newWidth = newHeight * aspectRatio;
          break;
        case 'n':
          newHeight = Math.max(50, startPos.current.height - dy);
          newWidth = newHeight * aspectRatio;
          break;
      }

      updateAttributes({
        width: Math.round(newWidth),
        height: Math.round(newHeight),
      });
    },
    [isResizing, resizeDirection, updateAttributes],
  );

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
    setResizeDirection(null);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      return () => {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      deleteNode();
    },
    [deleteNode],
  );

  const imgStyle: React.CSSProperties = {};
  if (width) imgStyle.width = `${width}px`;
  if (height) imgStyle.height = `${height}px`;

  return (
    <NodeViewWrapper className={styles['image-wrapper']}>
      <div
        className={`${styles['image-container']} ${selected ? styles['image-container--selected'] : ''} ${isResizing ? styles['image-container--resizing'] : ''}`}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt || ''}
          title={title || ''}
          style={imgStyle}
          className={styles['image']}
          draggable={false}
        />

        {/* Resize handles - visible on selection */}
        {selected && (
          <>
            <div
              className={`${styles['resize-handle']} ${styles['resize-handle--nw']}`}
              onMouseDown={(e) => handleResizeStart(e, 'nw')}
            />
            <div
              className={`${styles['resize-handle']} ${styles['resize-handle--ne']}`}
              onMouseDown={(e) => handleResizeStart(e, 'ne')}
            />
            <div
              className={`${styles['resize-handle']} ${styles['resize-handle--sw']}`}
              onMouseDown={(e) => handleResizeStart(e, 'sw')}
            />
            <div
              className={`${styles['resize-handle']} ${styles['resize-handle--se']}`}
              onMouseDown={(e) => handleResizeStart(e, 'se')}
            />
            <div
              className={`${styles['resize-handle']} ${styles['resize-handle--n']}`}
              onMouseDown={(e) => handleResizeStart(e, 'n')}
            />
            <div
              className={`${styles['resize-handle']} ${styles['resize-handle--s']}`}
              onMouseDown={(e) => handleResizeStart(e, 's')}
            />
            <div
              className={`${styles['resize-handle']} ${styles['resize-handle--e']}`}
              onMouseDown={(e) => handleResizeStart(e, 'e')}
            />
            <div
              className={`${styles['resize-handle']} ${styles['resize-handle--w']}`}
              onMouseDown={(e) => handleResizeStart(e, 'w')}
            />

            {/* Delete button */}
            <button
              type="button"
              className={styles['delete-button']}
              onClick={handleDelete}
              title="Delete image"
              aria-label="Delete image"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4H3.5C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Size indicator */}
            {width && height && (
              <div className={styles['size-indicator']}>
                {Math.round(width)} × {Math.round(height)}
              </div>
            )}
          </>
        )}
      </div>
    </NodeViewWrapper>
  );
};

export default ResizableImageView;
