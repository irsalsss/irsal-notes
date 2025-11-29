export interface HeaderUser {
  id: number;
  email: string;
  name?: string;
}

export interface HeaderProps {
  user?: HeaderUser;
  onSignOut?: () => void;
  editProfileHref?: string;
  themeToggle?: React.ReactNode;
}