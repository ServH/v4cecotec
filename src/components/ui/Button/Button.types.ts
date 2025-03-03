// src/components/ui/Button/Button.types.ts
import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button label content */
  children: ReactNode;
  /** Button visual style */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Make button take full width of container */
  fullWidth?: boolean;
  /** Icon displayed before the children */
  leftIcon?: ReactNode;
  /** Icon displayed after the children */
  rightIcon?: ReactNode;
  /** Show loading indicator */
  isLoading?: boolean;
  /** Disable button */
  disabled?: boolean;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Click handler */
  onClick?: () => void;
}