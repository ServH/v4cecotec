import React from 'react';
import { StyledButton, StyledIcon } from './Button.styles';
import { ButtonProps } from './Button.types';

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps<any>>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      isLoading = false,
      disabled = false,
      type = 'button',
      as,
      onClick,
      ...rest
    },
    ref
  ) => {
    // Determinar el tipo de elemento
    const Component = as || 'button';

    // Si es un enlace, no necesita el atributo type
    const typeAttribute = Component === 'a' ? undefined : type;

    return (
      <StyledButton
        as={Component}
        type={typeAttribute}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        disabled={disabled || isLoading}
        onClick={onClick}
        ref={ref}
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
  }
);

Button.displayName = 'Button';

export default Button;