'use client';

import styles from './example-button.module.scss';
import * as Dialog from '@radix-ui/react-dialog';

export function ExampleButton() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className={`${styles.button} ${styles.primary}`}>
          Open Dialog (Radix + SCSS Module)
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        />
        <Dialog.Content
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Dialog.Title
            style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '0.5rem',
            }}
          >
            Example Dialog
          </Dialog.Title>
          <Dialog.Description
            style={{ color: '#4b5563', marginBottom: '1rem' }}
          >
            This dialog uses Radix UI primitives and the button uses SCSS
            modules!
          </Dialog.Description>
          <Dialog.Close asChild>
            <button className={`${styles.button} ${styles.secondary}`}>
              Close
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
