import { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card content */
  children: ReactNode;
  /** Card visual style */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  /** Card elevation (shadow) */
  elevation?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Show border */
  bordered?: boolean;
}