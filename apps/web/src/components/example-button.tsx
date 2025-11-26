'use client';

import styles from './example-button.module.scss';

export function ExampleButton() {
  return (
    <button className={`${styles.button} ${styles.primary}`}>
      Open Dialog (Radix + SCSS Module)
    </button>
  );
}
