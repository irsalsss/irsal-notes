import { ReactNode } from 'react';

export interface SharedModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  cta?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'destructive';
  };
  onClose?: () => void;
  children?: ReactNode;
}

