import { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input label */
  label?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Element to display on the left side of the input */
  leftElement?: ReactNode;
  /** Element to display on the right side of the input */
  rightElement?: ReactNode;
  /** Input style variant */
  variant?: 'outline' | 'filled' | 'flushed';
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
  /** Make input take full width of container */
  fullWidth?: boolean;
}

export interface InputWrapperProps {
  hasError: boolean;
  disabled: boolean;
  readOnly: boolean;
  variant?: 'outline' | 'filled' | 'flushed';
  size?: 'sm' | 'md' | 'lg';
}