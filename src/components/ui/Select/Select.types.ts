import { SelectHTMLAttributes, ChangeEvent } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Select label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Options to display in the select */
  options: SelectOption[];
  /** Helper text displayed below the select */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Select style variant */
  variant?: 'outline' | 'filled' | 'flushed';
  /** Select size */
  size?: 'sm' | 'md' | 'lg';
  /** Make select take full width of container */
  fullWidth?: boolean;
  /** Change handler */
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export interface SelectWrapperProps {
  hasError: boolean;
  disabled: boolean;
  variant?: 'outline' | 'filled' | 'flushed';
  size?: 'sm' | 'md' | 'lg';
}