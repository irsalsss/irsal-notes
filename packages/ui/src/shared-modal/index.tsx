'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { SharedModalProps } from './types';
import styles from './shared-modal.module.scss';
import SharedButton from '../shared-button';

const SharedModal = ({
  open,
  onOpenChange,
  title,
  description,
  cta,
  onClose,
  children,
}: SharedModalProps) => {
  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange?.(isOpen);
    if (!isOpen && onClose) {
      onClose();
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles['overlay']} />
        <Dialog.Content className={styles['content']}>
          <div className={styles['header']}>
            <Dialog.Title className={styles['title']}>{title}</Dialog.Title>
            {description && (
              <Dialog.Description className={styles['description']}>
                {description}
              </Dialog.Description>
            )}
            <Dialog.Close asChild>
              <SharedButton
                variant="icon"
                className={styles['closeButton']}
                aria-label="Close modal"
                onClick={onClose}
              >
                <Cross2Icon />
              </SharedButton>
            </Dialog.Close>
          </div>

          {children && <div className={styles['body']}>{children}</div>}

          {cta && (
            <div className={styles['footer']}>
              <SharedButton
                variant={cta.variant || 'primary'}
                onClick={cta.onClick}
              >
                {cta.label}
              </SharedButton>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SharedModal;
