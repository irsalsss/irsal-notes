'use client';

import Link from 'next/link';
import { PersonIcon } from '@radix-ui/react-icons';
import SharedPopover, {
  Avatar,
  AvatarImage,
  AvatarFallback,
  PopoverItem,
} from '../shared-popover';
import styles from './header.module.scss';
import popoverStyles from '../shared-popover/popover.module.scss';
import buttonStyles from '../shared-button/shared-button.module.scss';
import cx from 'clsx';
import { HeaderProps } from './types';
import { getInitials } from '@repo/utils';
import ThemeToggle from '../theme-toggle';

const Header = ({
  user,
  onSignOut,
  editProfileHref = '/profile/edit',
}: HeaderProps) => {
  const initials = user ? getInitials(user.name) : null;
  const avatarAlt = user ? user.name : 'user';
  const showPersonIcon = !initials;

  return (
    <header className={styles['header']}>
      <nav className={styles['nav']}>
        <Link
          href="/"
          className={cx(buttonStyles['button'], buttonStyles['link'])}
        >
          Home
        </Link>
        <div className={styles['nav-links']}>
          <Link
            href="/articles"
            className={cx(buttonStyles['button'], buttonStyles['link'])}
          >
            Articles
          </Link>
          <Link
            href="/about"
            className={cx(buttonStyles['button'], buttonStyles['link'])}
          >
            About
          </Link>
          <div className={styles['theme-toggle-container']}>
            <ThemeToggle />
          </div>
          <SharedPopover
            trigger={
              <button
                type="button"
                className={popoverStyles['popover-trigger']}
                aria-label="User menu"
              >
                <Avatar className={popoverStyles['avatar-root']}>
                  <AvatarImage
                    src={undefined}
                    alt={avatarAlt}
                    className={popoverStyles['avatar-image']}
                  />
                  <AvatarFallback className={popoverStyles['avatar-fallback']}>
                    {showPersonIcon ? (
                      <PersonIcon width={20} height={20} />
                    ) : (
                      initials
                    )}
                  </AvatarFallback>
                </Avatar>
              </button>
            }
          >
            <PopoverItem as="a" href={editProfileHref}>
              Edit Profile
            </PopoverItem>
            <PopoverItem onClick={onSignOut}>Sign Out</PopoverItem>
          </SharedPopover>
        </div>
      </nav>
    </header>
  );
};

export default Header;
