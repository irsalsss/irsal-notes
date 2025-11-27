'use client';

import { forwardRef } from 'react';
import cx from 'clsx';
import { SharedButtonProps } from './types';
import styles from './shared-button.module.scss';

const SharedButton = forwardRef<HTMLButtonElement, SharedButtonProps>(
  ({ variant = 'primary', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cx(styles['button'], styles[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

SharedButton.displayName = 'SharedButton';

export default SharedButton;
