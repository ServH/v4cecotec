import React, { forwardRef } from 'react';
import {
  InputContainer,
  StyledInput,
  InputLabel,
  InputLeftElement,
  InputRightElement,
  InputError,
  InputHelperText,
  InputWrapper
} from './Input.styles';
import { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  id,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  disabled = false,
  readOnly = false,
  error,
  helperText,
  required = false,
  leftElement,
  rightElement,
  type = 'text',
  variant = 'outline',
  size = 'md',
  fullWidth = false,
  className,
  ...rest
}, ref) => {
  // Generate a random ID if none is provided
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <InputContainer 
      className={className} 
      fullWidth={fullWidth}
    >
      {label && (
        <InputLabel 
          htmlFor={inputId}
          required={required}
          disabled={disabled}
        >
          {label}
        </InputLabel>
      )}
      
      <InputWrapper 
        hasError={!!error}
        disabled={disabled}
        readOnly={readOnly}
        variant={variant}
        size={size}
      >
        {leftElement && (
          <InputLeftElement>{leftElement}</InputLeftElement>
        )}
        
        <StyledInput
          id={inputId}
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          hasLeftElement={!!leftElement}
          hasRightElement={!!rightElement}
          aria-invalid={!!error}
          {...rest}
        />
        
        {rightElement && (
          <InputRightElement>{rightElement}</InputRightElement>
        )}
      </InputWrapper>
      
      {error && <InputError>{error}</InputError>}
      {helperText && !error && <InputHelperText>{helperText}</InputHelperText>}
    </InputContainer>
  );
});

Input.displayName = 'Input';

export default Input;