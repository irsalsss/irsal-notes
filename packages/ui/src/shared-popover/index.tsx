'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { PopoverProps } from './types';
import styles from './popover.module.scss';
import cx from 'clsx';

const SharedPopover = ({
  trigger,
  children,
  open,
  onOpenChange,
  side = 'bottom',
  align = 'end',
}: PopoverProps) => {
  return (
    <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger asChild className={styles['popover-trigger']}>
        {trigger}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          align={align}
          sideOffset={8}
          className={styles['popover-content']}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};

export const Avatar = AvatarPrimitive.Root;
export const AvatarImage = AvatarPrimitive.Image;
export const AvatarFallback = AvatarPrimitive.Fallback;

const PopoverItem = ({
  children,
  onClick,
  as: Component = 'button',
  className,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  as?: 'button' | 'a';
  className?: string;
  href?: string;
  [key: string]: unknown;
}) => {
  return (
    <Component
      className={cx(styles['popover-item'], className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
};

export default SharedPopover;
export { PopoverItem };
