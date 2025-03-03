// src/components/ui/Button/Button.tsx
import React from 'react';
import { StyledButton, StyledIcon } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  isLoading = false,
  disabled = false,
  type = 'button',
  onClick,
  ...rest
}) => {
  return (
    <StyledButton
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...rest}
    >
      {isLoading && (
        <StyledIcon className="loader" aria-hidden="true">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="none" strokeWidth="4" />
          </svg>
        </StyledIcon>
      )}
      
      {leftIcon && !isLoading && (
        <StyledIcon left>{leftIcon}</StyledIcon>
      )}
      
      <span>{children}</span>
      
      {rightIcon && !isLoading && (
        <StyledIcon right>{rightIcon}</StyledIcon>
      )}
    </StyledButton>
  );
};

export default Button;





