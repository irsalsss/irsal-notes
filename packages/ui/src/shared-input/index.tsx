'use client';

import { forwardRef } from 'react';
import cx from 'clsx';
import { SharedInputProps } from './types';
import styles from './shared-input.module.scss';

const SharedInput = forwardRef<HTMLInputElement, SharedInputProps>(
  ({ label, error, register, id, className, autoComplete, ...props }, ref) => {
    return (
      <div className={cx(styles['container'], error && styles['has-error'])}>
        <label htmlFor={id} className={styles['label']}>
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          {...register}
          {...props}
          autoComplete={autoComplete}
          className={cx(styles['input'], className)}
        />
        {error && <span className={styles['error']}>{error}</span>}
      </div>
    );
  }
);

SharedInput.displayName = 'SharedInput';

export default SharedInput;
