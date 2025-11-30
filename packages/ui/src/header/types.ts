import { User } from '@/features/api/model';

export interface HeaderProps {
  user?: User;
  onSignOut?: () => void;
  editProfileHref?: string;
  themeToggle?: React.ReactNode;
}