'use client';

import { toast, ToastContainer, ToastContainerProps } from 'react-toastify';
import { Cross2Icon } from '@radix-ui/react-icons';
import cx from 'clsx';
import { NotificationVariant } from './types';
import SharedButton from '../shared-button';
import styles from './notification-bar.module.scss';
import 'react-toastify/dist/ReactToastify.css';

export interface NotificationBarShowOptions {
  variant?: NotificationVariant;
  message: string;
  duration?: number;
}

const getToastType = (variant: NotificationVariant) => {
  switch (variant) {
    case 'success':
      return toast.success;
    case 'error':
      return toast.error;
    case 'warning':
      return toast.warn;
    default:
      return toast;
  }
};

export const showNotification = ({
  variant = 'success',
  message,
  duration = 5000,
}: NotificationBarShowOptions) => {
  const toastType = getToastType(variant);

  toastType(
    ({ closeToast }) => (
      <div className={cx(styles['notification'], styles[variant])}>
        <div className={styles['content']}>
          <span className={styles['message']}>{message}</span>
        </div>
        <SharedButton
          type="button"
          variant="icon"
          onClick={closeToast}
          className={styles['closeButton']}
          aria-label="Close notification"
        >
          <Cross2Icon />
        </SharedButton>
      </div>
    ),
    {
      autoClose: duration,
      hideProgressBar: false,
      closeButton: false,
      className: styles['toastContainer'],
    }
  );
};

const NotificationBar = ({ ...props }: ToastContainerProps) => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      {...props}
    />
  );
};

export default NotificationBar;

// Helper functions for showing notifications
export const showSuccess = (message: string, duration?: number) =>
  showNotification({ variant: 'success', message, duration });

export const showError = (message: string, duration?: number) =>
  showNotification({ variant: 'error', message, duration });

export const showWarning = (message: string, duration?: number) =>
  showNotification({ variant: 'warning', message, duration });
